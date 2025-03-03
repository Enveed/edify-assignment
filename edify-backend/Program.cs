using edify_backend.DAL;
using edify_backend.DAL.Repositories;
using edify_backend.Models.Core;
using edify_backend.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// SQLite configuration
var dbPath = Path.Join(builder.Environment.ContentRootPath, "edify-backend.db");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite($"Data Source={dbPath}"));

// Register repositories and services
builder.Services.AddScoped<ICourseRepository, CourseRepository>();
builder.Services.AddScoped<IDashboardService, DashboardService>();

// CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    // Create database and seed development data
    using (var scope = app.Services.CreateScope())
    {
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        context.Database.EnsureCreated(); // Create SQLite database if it doesn't exist
        SeedData(context);
    }
}

app.UseHttpsRedirection();

app.UseCors("AllowLocalFrontend");

app.UseAuthorization();

app.MapControllers();

app.Run();

// Development seed data method
void SeedData(ApplicationDbContext context)
{
    if (!context.Courses.Any())
    {
        var courses = new List<Course>
        {
            new() {
                Icon = "Globe",
                Name = "English Level 1",
                Instructor = "Steven Robinson",
                IsActive = true,
                Units =
                [
                    new() { UnitNumber = 3, Title = "Purposes of a text", CompletionPercentage = 60 }
                ],
                Sessions =
                [
                    new Session {
                        Date = DateTime.Today.AddDays(10),
                        StartTime = new TimeSpan(13, 0, 0),
                        EndTime = new TimeSpan(14, 0, 0)
                    }
                ]
            },
            new() {
                Icon = "Calculator",
                Name = "Maths Level 2",
                Instructor = "Andrew Wilson",
                IsActive = true,
                Units =
                [
                    new Unit { UnitNumber = 7, Title = "FDP", CompletionPercentage = 45 }
                ],
                Sessions =
                [
                    new Session {
                        Date = DateTime.Today.AddDays(11),
                        StartTime = new TimeSpan(11, 0, 0),
                        EndTime = new TimeSpan(12, 0, 0)
                    }
                ]
            }
        };

        context.Courses.AddRange(courses);
        context.SaveChanges();
    }
}