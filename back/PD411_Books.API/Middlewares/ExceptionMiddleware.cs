using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PD411_Books.BLL.Services;
using System.Text;

namespace PD411_Books.API.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                // Request

                await _next(context);

                // Response
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);

                ServiceResponse response = new ServiceResponse
                {
                    IsSuccess = false,
                    Message = ex.Message
                }; 

                context.Response.StatusCode = 500;
                await context.Response.WriteAsJsonAsync(response);
            }
        }
    }
}