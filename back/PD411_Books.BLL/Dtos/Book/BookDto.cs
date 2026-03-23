using PD411_Books.BLL.Dtos.Author;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PD411_Books.BLL.Dtos.Book
{
    public class BookDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Image { get; set; }
        public float Rating { get; set; } = 0f;
        public int Pages { get; set; } = 0;
        public int PublishYear { get; set; } = DateTime.UtcNow.Year;
        public List<string> Genres { get; set; } = [];
        public AuthorDto? Author { get; set; }
    }
}
