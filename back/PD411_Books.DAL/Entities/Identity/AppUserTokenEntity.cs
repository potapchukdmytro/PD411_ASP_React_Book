using Microsoft.AspNetCore.Identity;

namespace PD411_Books.DAL.Entities.Identity
{
    public class AppUserTokenEntity : IdentityUserToken<string>
    {
        public AppUserEntity? User { get; set; }
    }
}
