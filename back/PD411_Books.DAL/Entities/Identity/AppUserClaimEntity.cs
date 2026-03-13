using Microsoft.AspNetCore.Identity;

namespace PD411_Books.DAL.Entities.Identity
{
    public class AppUserClaimEntity : IdentityUserClaim<string>
    {
        public AppUserEntity? User { get; set; } 
    }
}
