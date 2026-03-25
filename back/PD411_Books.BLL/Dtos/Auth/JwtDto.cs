namespace PD411_Books.BLL.Dtos.Auth
{
    public class JwtDto
    {
        public string AccessToken { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
    }
}
