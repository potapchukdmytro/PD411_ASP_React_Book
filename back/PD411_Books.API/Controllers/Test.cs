using Microsoft.AspNetCore.Mvc;

namespace PD411_Books.API.Controllers
{
    [ApiController]
    [Route("api/test")]
    public class Test : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Test controller");
        }
    }
}
