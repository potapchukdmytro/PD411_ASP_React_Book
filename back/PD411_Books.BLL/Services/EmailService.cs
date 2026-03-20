using Microsoft.Extensions.Options;
using PD411_Books.BLL.Settings;
using System.Net;
using System.Net.Mail;

namespace PD411_Books.BLL.Services
{
    public class EmailService
    {
        private readonly SmtpClient _smtpClient;
        private readonly SmtpSettings _settings;

        public EmailService(IOptions<SmtpSettings> options)
        {
            _settings = options.Value;

            _smtpClient = new SmtpClient(_settings.Host, _settings.Port)
            {
                EnableSsl = true,
                Credentials = new NetworkCredential(_settings.Email, _settings.Password)
            };
        }

        public async Task SendEmailAsync(string to, string subject, string body, bool isHtml = false)
        {
            var message = new MailMessage
            {
                From = new MailAddress(_settings.Email)
            };
            message.To.Add(to);
            message.Subject = subject;
            message.Body = body;
            message.IsBodyHtml = isHtml;

            await _smtpClient.SendMailAsync(message);
        }
    }
}
