using edify_backend.DAL.Repositories;
using edify_backend.Models.Core;
using edify_backend.Models.DTOs;

namespace edify_backend.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly ICourseRepository _courseRepository;

        public DashboardService(ICourseRepository courseRepository)
        {
            _courseRepository = courseRepository;
        }

        public async Task<DashboardDto> GetDashboardDataAsync(int userId)
        {
            var dashboard = new DashboardDto();

            // Get ongoing courses
            var ongoingCourses = await _courseRepository.GetOngoingCoursesAsync(userId);
            dashboard.OngoingCourses = ongoingCourses.Select(c => new OngoingCourseDto
            {
                Id = c.Id,
                Name = c.Name,
                Instructor = c.Instructor,
                Icon = c.Icon,
                CurrentUnit = GetCurrentUnit(c),
                Progress = CalculateCourseProgress(c)
            }).ToList();

            // Get upcoming sessions
            var upcomingSessions = await _courseRepository.GetUpcomingSessionsAsync(userId, DateTime.Today);
            dashboard.UpcomingSessions = upcomingSessions.Select(s => new UpcomingSessionDto
            {
                Id = s.CourseId,
                Name = s.Course.Name,
                Instructor = s.Course.Instructor,
                Date = s.Date,
                Icon = s.Course.Icon,
                Time = $"{s.StartTime.ToString(@"hh\:mm")} - {s.EndTime.ToString(@"hh\:mm")}"
            }).ToList();

            return dashboard;
        }

        private static string GetCurrentUnit(Course course)
        {
            var currentUnit = course.Units.OrderBy(u => u.UnitNumber)
                .FirstOrDefault(u => u.CompletionPercentage < 100);

            if (currentUnit == null)
            {
                // If all units are 100% complete, return the last unit
                currentUnit = course.Units.OrderByDescending(u => u.UnitNumber).FirstOrDefault();
            }

            return currentUnit != null
                ? $"Unit {currentUnit.UnitNumber} - {currentUnit.Title}"
                : "No units available";
        }

        private static float CalculateCourseProgress(Course course)
        {
            if (course.Units.Count == 0)
                return 0;

            return course.Units.Average(u => u.CompletionPercentage);
        }
    }
}