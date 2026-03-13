using Microsoft.AspNetCore.Identity;

namespace PD411_Books.DAL.Entities.Identity
{
    public class AppUserEntity : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Image { get; set; }

        // Navigation properties
        public ICollection<AppUserClaimEntity> Claims { get; set; } = [];
        public ICollection<AppUserLoginEntity> Logins { get; set; } = [];
        public ICollection<AppUserTokenEntity> Tokens { get; set; } = [];
        public ICollection<AppUserRoleEntity> UserRoles { get; set; } = [];
    }
}
