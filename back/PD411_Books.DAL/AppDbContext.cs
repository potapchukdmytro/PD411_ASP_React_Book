using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PD411_Books.DAL.Entities;
using PD411_Books.DAL.Entities.Identity;

namespace PD411_Books.DAL
{
    public class AppDbContext : IdentityDbContext<
        AppUserEntity, AppRoleEntity, string,
        AppUserClaimEntity, AppUserRoleEntity, AppUserLoginEntity,
        AppRoleClaimEntity, AppUserTokenEntity>
    {
        public AppDbContext(DbContextOptions options)
            : base(options)
        {
            
        }

        public DbSet<BookEntity> Books { get; set; }
        public DbSet<AuthorEntity> Authors { get; set; }
        public DbSet<GenreEntity> Genres { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Books
            builder.Entity<BookEntity>(e =>
            {
                e.HasKey(b => b.Id);

                e.Property(b => b.Title)
                .IsRequired()
                .HasMaxLength(200);

                e.Property(b => b.Description)
                .HasColumnType("text");

                e.Property(b => b.Image)
                .HasMaxLength(100);

                e.Property(b => b.Pages)
                .HasDefaultValue(0);

                e.Property(b => b.Rating)
                .HasDefaultValue(0f);
            });

            // Authors
            builder.Entity<AuthorEntity>(e =>
            {
                e.HasKey(a => a.Id);

                e.Property(a => a.Name)
                .IsRequired()
                .HasMaxLength(255);

                e.Property(a => a.Image)
                .HasMaxLength(100);

                e.Property(a => a.Country)
                .HasMaxLength(50);
            });

            // Genres
            builder.Entity<GenreEntity>(e =>
            {
                e.HasKey(g => g.Id);

                e.HasIndex(g => g.Name)
                .IsUnique();

                e.Property(g => g.Name)
                .HasMaxLength(50)
                .IsRequired();
            });

            // User
            builder.Entity<AppUserEntity>(e =>
            {
                e.Property(p => p.FirstName)
                .HasMaxLength(100);

                e.Property(p => p.LastName)
                .HasMaxLength(100);

                e.Property(p => p.Image)
                .HasMaxLength(100);
            });

            // Relationships
            builder.Entity<BookEntity>()
                .HasOne(b => b.Author)
                .WithMany(a => a.Books)
                .HasForeignKey(b => b.AuthorId)
                .OnDelete(DeleteBehavior.SetNull);

            builder.Entity<BookEntity>()
                .HasMany(b => b.Genres)
                .WithMany(g => g.Books)
                .UsingEntity("BookGenres");

            // Identity
            builder.Entity<AppUserEntity>(b =>
            {
                // Each User can have many UserClaims
                b.HasMany(e => e.Claims)
                    .WithOne(e => e.User)
                    .HasForeignKey(uc => uc.UserId)
                    .IsRequired();

                // Each User can have many UserLogins
                b.HasMany(e => e.Logins)
                    .WithOne(e => e.User)
                    .HasForeignKey(ul => ul.UserId)
                    .IsRequired();

                // Each User can have many UserTokens
                b.HasMany(e => e.Tokens)
                    .WithOne(e => e.User)
                    .HasForeignKey(ut => ut.UserId)
                    .IsRequired();

                // Each User can have many entries in the UserRole join table
                b.HasMany(e => e.UserRoles)
                    .WithOne(e => e.User)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
            });

            builder.Entity<AppRoleEntity>(b =>
            {
                // Each Role can have many entries in the UserRole join table
                b.HasMany(e => e.UserRoles)
                    .WithOne(e => e.Role)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();

                // Each Role can have many associated RoleClaims
                b.HasMany(e => e.RoleClaims)
                    .WithOne(e => e.Role)
                    .HasForeignKey(rc => rc.RoleId)
                    .IsRequired();
            });
        }
    }
}
