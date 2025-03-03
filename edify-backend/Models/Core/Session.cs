namespace edify_backend.Models.Core
{
    public class Session
    {
        public int Id { get; set; }
        public int CourseId { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public Course Course { get; set; }
    }
}