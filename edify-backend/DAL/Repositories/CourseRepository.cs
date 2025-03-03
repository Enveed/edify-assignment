using edify_backend.Models.Core;
using Microsoft.EntityFrameworkCore;

namespace edify_backend.DAL.Repositories
{
    public class CourseRepository : ICourseRepository
    {
        private readonly ApplicationDbContext _context;

        public CourseRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Course>> GetOngoingCoursesAsync(int userId)
        {
            // In a real app, we'd filter by userId through a UserCourses table
            return await _context.Courses
                .Where(c => c.IsActive)
                .Include(c => c.Units)
                .ToListAsync();
        }

        public async Task<List<Session>> GetUpcomingSessionsAsync(int userId, DateTime fromDate)
        {
            // In a real app, we'd filter by userId through a UserCourses table
            var sessions = await _context.Sessions
                .Where(s => s.Date >= fromDate)
                .Include(s => s.Course)
                .Take(10) // Limit to next 10 sessions
                .ToListAsync();

            // Then sort in memory (which works for SQLite)
            return sessions
                .OrderBy(s => s.Date)
                .ThenBy(s => s.StartTime.TotalMinutes)
                .ToList();
        }
    }
}