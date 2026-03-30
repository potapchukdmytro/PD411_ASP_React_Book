using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PD411_Books.API.Extensions;
using PD411_Books.API.Settings;
using PD411_Books.BLL.Dtos.Book;
using PD411_Books.BLL.Dtos.Query;
using PD411_Books.BLL.Services;

namespace PD411_Books.API.Controllers
{
    [ApiController]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
    [Route("api/book")]
    public class BookController : ControllerBase
    {
        private readonly BookService _bookService;
        private readonly string _booksPath;

        public BookController(BookService bookService, IWebHostEnvironment environment)
        {
            _bookService = bookService;

            string rootPath = environment.ContentRootPath;
            _booksPath = Path.Combine(rootPath, StaticFilesSettings.StorageDir, StaticFilesSettings.BooksDir);
            Directory.CreateDirectory(_booksPath);
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync([FromQuery] PaginationDto pagination, [FromQuery] SortDto sort)
        {
            var response = await _bookService.GetAllAsync(pagination, sort);
            return this.GetAction(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAsync(int id)
        {
            var response = await _bookService.GetByIdAsync(id);
            return this.GetAction(response);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromForm] CreateBookDto dto)
        {
            var response = await _bookService.CreateAsync(dto, _booksPath);
            return this.GetAction(response);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAsync([FromForm] UpdateBookDto dto)
        {
            var response = await _bookService.UpdateAsync(dto, _booksPath);
            return this.GetAction(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var response = await _bookService.DeleteAsync(id, _booksPath);
            return this.GetAction(response);
        }
    }
}
