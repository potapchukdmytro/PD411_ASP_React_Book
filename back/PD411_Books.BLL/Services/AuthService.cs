using Microsoft.AspNetCore.Identity;
using PD411_Books.BLL.Dtos.Auth;
using PD411_Books.DAL.Entities.Identity;
using System.Text;

namespace PD411_Books.BLL.Services
{
    public class AuthService
    {
        private readonly UserManager<AppUserEntity> _userManager;
        private readonly EmailService _emailService;
        private readonly JwtService _jwtService;

        public AuthService(UserManager<AppUserEntity> userManager, JwtService jwtService, EmailService emailService)
        {
            _userManager = userManager;
            _jwtService = jwtService;
            _emailService = emailService;
        }

        public async Task<ServiceResponse> ConfirmEmailAsync(string userId, string base64token)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if(user == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = $"Користувач з id '{userId}' не знайдений"
                };
            }

            byte[] bytes = Convert.FromBase64String(base64token);
            string token = Encoding.UTF8.GetString(bytes);

            var result = await _userManager.ConfirmEmailAsync(user, token);

            if(!result.Succeeded)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = result.Errors.First().Description
                };
            }

            return new ServiceResponse
            {
                Message = "Пошта успішно підтверджена"
            };
        }

        public async Task<ServiceResponse> RegisterAsync(RegisterDto dto)
        {
            if(await EmailExistAsync(dto.Email))
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = $"Пошта '{dto.Email}' вже використовується"
                };
            }

            if (await UserNameExistAsync(dto.UserName))
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = $"Ім'я користувача '{dto.UserName}' зайняте"
                };
            }

            var user = new AppUserEntity
            {
                UserName = dto.UserName,
                Email = dto.Email,
                FirstName = dto.FirstName,
                LastName = dto.LastName
            };

            var createResult = await _userManager.CreateAsync(user, dto.Password);

            if (!createResult.Succeeded)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = createResult.Errors.First().Description
                };
            }

            await _userManager.AddToRoleAsync(user, "user");

            // Send email confirmation message
            string token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            byte[] bytes = Encoding.UTF8.GetBytes(token);
            string base64Token = Convert.ToBase64String(bytes);

            string root = Directory.GetCurrentDirectory();
            string templatePath = Path.Combine(root, "Storage", "Templates", "ConfrimEmail.html");
            if(File.Exists(templatePath))
            {
                string html = await File.ReadAllTextAsync(templatePath);
                html = html.Replace("{id}", user.Id);
                html = html.Replace("{token}", base64Token);
                await _emailService.SendEmailAsync(user.Email, "Підтвердження пошти", html, true);
            }

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
                    IsSuccess = false,
                    Message = $"Користувач з поштою '{dto.Email}' не існує"
                };
            }

            bool res = await _userManager.CheckPasswordAsync(entity, dto.Password);

            if(!res)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = $"Пароль вказано невірно"
                };
            }

            var tokens = await _jwtService.GenerateTokensAsync(entity);

            return new ServiceResponse
            {
                Message = "Успішний вхід",
                Payload = tokens
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
