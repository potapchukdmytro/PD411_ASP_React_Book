using Microsoft.AspNetCore.Identity;
using PD411_Books.BLL.Dtos.Auth;
using PD411_Books.DAL.Entities.Identity;

namespace PD411_Books.BLL.Services
{
    public class AuthService
    {
        private readonly UserManager<AppUserEntity> _userManager;

        public AuthService(UserManager<AppUserEntity> userManager)
        {
            _userManager = userManager;
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

            var userEntity = new AppUserEntity
            {
                UserName = dto.UserName,
                Email = dto.Email,
                FirstName = dto.FirstName,
                LastName = dto.LastName
            };

            var createResult = await _userManager.CreateAsync(userEntity, dto.Password);

            if (!createResult.Succeeded)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = createResult.Errors.First().Description
                };
            }

            await _userManager.AddToRoleAsync(userEntity, "user");

            return new ServiceResponse
            {
                Message = "Ви успішно зареєструвалися"
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
