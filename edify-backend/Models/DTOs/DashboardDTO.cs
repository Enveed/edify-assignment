namespace edify_backend.Models.DTOs;

public class DashboardDto
{
    public List<OngoingCourseDto> OngoingCourses { get; set; } = [];
    public List<UpcomingSessionDto> UpcomingSessions { get; set; } = [];
}