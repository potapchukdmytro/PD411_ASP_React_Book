namespace PD411_Books.BLL.Settings
{
    public class JwtSettings
    {
        public string Issuer { get; set; } = string.Empty;
        public string Audience { get; set; } = string.Empty;
        public string? SecretKey { get; set; }
        public int ExpHours { get; set; } = 1;
    }
}
