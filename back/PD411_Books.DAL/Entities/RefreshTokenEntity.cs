using PD411_Books.DAL.Entities.Identity;

namespace PD411_Books.DAL.Entities
{
    public class RefreshTokenEntity : BaseEntity
    {
        public string Token { get; set; } = string.Empty;
        public DateTime Expires { get; set; }
        public bool IsExpired => DateTime.UtcNow > Expires;
        public bool IsUsed { get; set; } = false;
        public string UserId { get; set; } = string.Empty;
        public AppUserEntity? User { get; set; }
    }
}
