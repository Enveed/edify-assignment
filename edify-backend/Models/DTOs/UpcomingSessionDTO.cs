namespace edify_backend.Models.DTOs;

public class UpcomingSessionDto : CourseDto
{
    public DateTime Date { get; set; }
    public string Time { get; set; }
}