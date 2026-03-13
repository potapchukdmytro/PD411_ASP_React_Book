using Microsoft.AspNetCore.Identity;

namespace PD411_Books.DAL.Entities.Identity
{
    public class AppUserLoginEntity : IdentityUserLogin<string>
    {
        public AppUserEntity? User { get; set; }
    }
}
