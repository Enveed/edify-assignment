namespace edify_backend.Models.Core
{
    public class Course
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Instructor { get; set; }
        public string Icon { get; set; }
        public bool IsActive { get; set; }
        public List<Unit> Units { get; set; } = [];
        public List<Session> Sessions { get; set; } = [];
    }
}