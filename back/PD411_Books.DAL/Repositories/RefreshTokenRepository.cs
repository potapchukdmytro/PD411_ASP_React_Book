using Microsoft.EntityFrameworkCore;
using PD411_Books.DAL.Entities;

namespace PD411_Books.DAL.Repositories
{
    public class RefreshTokenRepository : GenericRepository<RefreshTokenEntity>
    {
        public RefreshTokenRepository(AppDbContext context)
            : base(context)
        {
            
        }

        public IQueryable<RefreshTokenEntity> RefreshTokens => GetAll();

        public async Task<RefreshTokenEntity?> GetByTokenAsync(string token)
        {
            return await RefreshTokens.FirstOrDefaultAsync(t => t.Token == token);
        }
    }
}
