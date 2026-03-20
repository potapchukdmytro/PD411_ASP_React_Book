namespace PD411_Books.BLL.Settings
{
    public class SmtpSettings
    {
        public string Host { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public int Port { get; set; }
    }
}
