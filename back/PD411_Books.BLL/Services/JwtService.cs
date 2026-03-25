using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Npgsql.Internal;
using PD411_Books.BLL.Dtos.Auth;
using PD411_Books.BLL.Settings;
using PD411_Books.DAL;
using PD411_Books.DAL.Entities;
using PD411_Books.DAL.Entities.Identity;
using PD411_Books.DAL.Repositories;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace PD411_Books.BLL.Services
{
    public class JwtService
    {
        private readonly JwtSettings _jwtSettings;
        private readonly UserManager<AppUserEntity> _userManager;
        private readonly RefreshTokenRepository _refreshTokenRepository;

        public JwtService(IOptions<JwtSettings> jwtOptions, UserManager<AppUserEntity> userManager, RefreshTokenRepository refreshTokenRepository)
        {
            _jwtSettings = jwtOptions.Value;
            _userManager = userManager;
            _refreshTokenRepository = refreshTokenRepository;
        }

        private RefreshTokenEntity GenerateRefreshToken()
        {
            var bytes = new byte[64];
            var rng = RandomNumberGenerator.Create();
            rng.GetBytes(bytes);

            string token = Convert.ToBase64String(bytes);
            return new RefreshTokenEntity
            {
                Token = token,
                Expires = DateTime.UtcNow.AddDays(7),
            };
        }

        public async Task<JwtDto> GenerateTokensAsync(AppUserEntity user)
        {
            var accessToken = await GenerateAccessTokenAsync(user);
            var refreshToken = GenerateRefreshToken();
            refreshToken.UserId = user.Id;
            await _refreshTokenRepository.CreateAsync(refreshToken);

            return new JwtDto 
            { 
                AccessToken = accessToken,
                RefreshToken = refreshToken.Token
            };
        }

        public async Task<ServiceResponse> RefreshAsync(string refreshToken)
        {
            var oldToken = await _refreshTokenRepository.GetByTokenAsync(refreshToken);

            if(oldToken == null || oldToken.IsExpired || oldToken.IsUsed)
            {
                return ServiceResponse.Error("Refresh token не дійсний");
            }

            var user = await _userManager.FindByIdAsync(oldToken.UserId);

            if(user == null)
            {
                return ServiceResponse.Error("Refresh token не дійсний");
            }

            oldToken.IsUsed = true;
            await _refreshTokenRepository.UpdateAsync(oldToken);

            var tokens = await GenerateTokensAsync(user);
            return ServiceResponse.Success("Токени успішно згенеровані", tokens);
        }

        private async Task<string> GenerateAccessTokenAsync(AppUserEntity user)
        {
            if (string.IsNullOrEmpty(_jwtSettings.SecretKey))
            {
                throw new ArgumentNullException("Jwt secret key is null");
            }

            var roles = await _userManager.GetRolesAsync(user);

            var claims = new List<Claim>
            {
                new Claim("userName", user.UserName ?? string.Empty),
                new Claim("email", user.Email ?? string.Empty),
                new Claim("firstName", user.FirstName ?? string.Empty),
                new Claim("lastName", user.LastName ?? string.Empty),
                new Claim("image", user.Image ?? string.Empty)
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim("role", role));
            }

            var secretKeyBytes = Encoding.UTF8.GetBytes(_jwtSettings.SecretKey);
            var signInKey = new SymmetricSecurityKey(secretKeyBytes);

            var credentials = new SigningCredentials(signInKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: claims,
                signingCredentials: credentials,
                expires: DateTime.UtcNow.AddHours(_jwtSettings.ExpHours)
                );

            string jwtToken = new JwtSecurityTokenHandler().WriteToken(token);
            return jwtToken;
        }
    }
}
