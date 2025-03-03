using edify_backend.Models.Core;

namespace edify_backend.DAL.Repositories;
public interface ICourseRepository
{
    Task<List<Course>> GetOngoingCoursesAsync(int userId);
    Task<List<Session>> GetUpcomingSessionsAsync(int userId, DateTime fromDate);
}