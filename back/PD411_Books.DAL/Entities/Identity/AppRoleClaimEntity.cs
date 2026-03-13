using Microsoft.AspNetCore.Identity;

namespace PD411_Books.DAL.Entities.Identity
{
    public class AppRoleClaimEntity : IdentityRoleClaim<string>
    {
        public AppRoleEntity? Role { get; set; }
    }
}
