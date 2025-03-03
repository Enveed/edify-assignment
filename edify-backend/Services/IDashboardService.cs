using edify_backend.Models.DTOs;

namespace edify_backend.Services
{
    public interface IDashboardService
    {
        Task<DashboardDto> GetDashboardDataAsync(int userId);
    }
}