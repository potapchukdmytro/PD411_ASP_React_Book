using Microsoft.AspNetCore.Identity;
using PD411_Books.BLL.Dtos.Auth;
using PD411_Books.DAL.Entities.Identity;

namespace PD411_Books.BLL.Services
{
    public class AuthService
    {
        private readonly UserManager<AppUserEntity> _userManager;
        private readonly JwtService _jwtService;

        public AuthService(UserManager<AppUserEntity> userManager, JwtService jwtService)
        {
            _userManager = userManager;
            _jwtService = jwtService;
        }

        public async Task<ServiceResponse> RegisterAsync(RegisterDto dto)
        {
            if(await EmailExistAsync(dto.Email))
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = $"Пошта '{dto.Email}' вже використовується"
                };
            }

            if (await UserNameExistAsync(dto.UserName))
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = $"Ім'я користувача '{dto.UserName}' зайняте"
                };
            }

            var entity = new AppUserEntity
            {
                UserName = dto.UserName,
                Email = dto.Email,
                FirstName = dto.FirstName,
                LastName = dto.LastName
            };

            var createResult = await _userManager.CreateAsync(entity, dto.Password);

            if (!createResult.Succeeded)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = createResult.Errors.First().Description
                };
            }

            await _userManager.AddToRoleAsync(entity, "user");

            return new ServiceResponse
            {
                Message = "Ви успішно зареєструвалися"
            };
        }

        public async Task<ServiceResponse> LoginAsync(LoginDto dto)
        {
            var entity = await _userManager.FindByEmailAsync(dto.Email);

            if(entity == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = $"Користувач з поштою '{dto.Email}' не існує"
                };
            }

            bool res = await _userManager.CheckPasswordAsync(entity, dto.Password);

            if(!res)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = $"Пароль вказано невірно"
                };
            }

            string jwtToken = await _jwtService.GenerateAccessTokenAsync(entity);

            return new ServiceResponse
            {
                Message = "Успішний вхід",
                Payload = jwtToken
            };
        }

        private async Task<bool> EmailExistAsync(string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }

        private async Task<bool> UserNameExistAsync(string userName)
        {
            return await _userManager.FindByNameAsync(userName) != null;
        }
    }
}
