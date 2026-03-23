using Microsoft.EntityFrameworkCore;
using PD411_Books.DAL.Entities;

namespace PD411_Books.DAL.Repositories
{
    public class BookRepository : GenericRepository<BookEntity>
    {
        public readonly AppDbContext _context;
        public BookRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }
        public IQueryable<BookEntity> Books => GetAll();

        public async Task<BookEntity?> GetByNameAsync(string title)
        {
            return await Books
                .FirstOrDefaultAsync(a => a.Title.ToLower() == title.ToLower());
        }

        public async Task<BookEntity?> GetByYearAsync(int year)
        {
            return await Books
                .FirstOrDefaultAsync(a => a.PublishYear == year);
        }

        public async Task<BookEntity?> GetByRatingAsync(float rating)
        {
            return await Books
                .FirstOrDefaultAsync(a => a.Rating == rating);
        }

        public async Task<List<BookEntity>> GetByGenreAsync(string genre)
        {
            return await Books
                .Include(b => b.Genres)
                .Where(b => b.Genres.Select(g => g.Name.ToLower()).Contains(genre.ToLower()))
                .ToListAsync();
        }

        public async Task<List<BookEntity>> GetByAuthorAsync(AuthorEntity entity)
        {
            return await _context.Books
                .AsNoTracking()
                .Where(b => b.AuthorId == entity.Id)
                .ToListAsync();
        }
    }
}
