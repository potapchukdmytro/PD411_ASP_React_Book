using Microsoft.AspNetCore.Mvc;
using PD411_Books.API.Extensions;
using PD411_Books.BLL.Dtos.Auth;
using PD411_Books.BLL.Services;

namespace PD411_Books.API.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterDto dto)
        {
            var response = await _authService.RegisterAsync(dto);
            return this.GetAction(response);
        }
    }
}
