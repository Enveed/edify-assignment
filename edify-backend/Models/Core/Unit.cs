namespace edify_backend.Models.Core
{
    public class Unit
    {
        public int Id { get; set; }
        public int CourseId { get; set; }
        public int UnitNumber { get; set; }
        public string Title { get; set; }
        public float CompletionPercentage { get; set; }
        public Course Course { get; set; }
    }
}