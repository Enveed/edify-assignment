namespace edify_backend.Models.DTOs;

public class OngoingCourseDto : CourseDto
{
    public string CurrentUnit { get; set; }
    public float Progress { get; set; }
}