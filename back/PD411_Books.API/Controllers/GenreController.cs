using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PD411_Books.API.Extensions;
using PD411_Books.BLL.Dtos.Genre;
using PD411_Books.BLL.Services;

namespace PD411_Books.API.Controllers
{
    [ApiController]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/genre")]
    public class GenreController : ControllerBase
    {
        private readonly GenreService _genreService;
        private readonly ILogger<GenreController> _logger;

        public GenreController(GenreService genreService, ILogger<GenreController> logger)
        {
            _genreService = genreService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            throw new NotImplementedException();
            _logger.LogInformation("Get all genres request");
            //_logger.LogCritical("Critical");
            //_logger.LogError("Error");
            //_logger.LogWarning("Warning");
            //_logger.LogTrace("Trace");

            var response = await _genreService.GetAllAsync();
            return this.GetAction(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAsync(int id)
        {
            var response = await _genreService.GetByIdAsync(id);
            return this.GetAction(response);
        }

        [HttpGet("by-name/{name}")]
        public async Task<IActionResult> GetAsync(string name)
        {
            var response = await _genreService.GetByNameAsync(name);

            if (!response.Success)
            {
                _logger.LogWarning(2000, $"{DateTime.Now} - All genres. Response code -> BAD REQUEST(400)");
            }
            return this.GetAction(response);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody]CreateGenreDto dto)
        {
            var response = await _genreService.CreateAsync(dto);
            return this.GetAction(response);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAsync([FromBody] UpdateGenreDto dto)
        {
            var response = await _genreService.UpdateAsync(dto);
            return this.GetAction(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var response = await _genreService.DeleteAsync(id);
            return this.GetAction(response);
        }

        [HttpDelete("by-name/{name}")]
        public async Task<IActionResult> DeleteAsync(string name)
        {
            var response = await _genreService.DeleteAsync(name);
            return this.GetAction(response);
        }
    }
}
