using Microsoft.AspNetCore.Identity;

namespace PD411_Books.DAL.Entities.Identity
{
    public class AppRoleEntity : IdentityRole
    {
        public ICollection<AppUserRoleEntity> UserRoles { get; set; } = [];
        public ICollection<AppRoleClaimEntity> RoleClaims { get; set; } = [];
    }
}
