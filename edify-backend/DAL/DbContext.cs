using edify_backend.Models.Core;
using Microsoft.EntityFrameworkCore;

namespace edify_backend.DAL
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Course> Courses { get; set; }
        public DbSet<Unit> Units { get; set; }
        public DbSet<Session> Sessions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure relationships
            modelBuilder.Entity<Course>()
                .HasMany(c => c.Units)
                .WithOne(u => u.Course)
                .HasForeignKey(u => u.CourseId);

            modelBuilder.Entity<Course>()
                .HasMany(c => c.Sessions)
                .WithOne(s => s.Course)
                .HasForeignKey(s => s.CourseId);
        }
    }
}