using System.Net;

namespace PD411_Books.API.Middlewares
{
    public class LogMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<LogMiddleware> _logger;

        public LogMiddleware(RequestDelegate next, ILogger<LogMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Request
            var headers = new List<string>();
            foreach (var header in context.Request.Headers)
            {
                headers.Add($"{header.Key} - {header.Value}");
            }

            _logger.LogInformation("REQUEST");
            _logger.LogInformation($"Method: {context.Request.Method}\n" +
                $"Path: {context.Request.Path}\n" +
                $"Query: {context.Request.QueryString}\n" +
                $"{string.Join('\n', headers)}");

            //var query = context.Request.Query;
            //var apiKey = query.FirstOrDefault(q => q.Key == "apiKey");

            //if(apiKey.Key != "apiKey" || apiKey.Value != "0000")
            //{
            //    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            //    return;
            //}

            await _next(context);

            // Response
            headers = new List<string>();
            foreach (var header in context.Response.Headers)
            {
                headers.Add($"{header.Key} - {header.Value}");
            }

            _logger.LogInformation("RESPONSE");
            _logger.LogInformation($"Status code: {context.Response.StatusCode}\n" +
                $"{string.Join('\n', headers)}");
        }
    }
}
