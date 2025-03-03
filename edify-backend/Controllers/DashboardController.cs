using edify_backend.Models.DTOs;
using edify_backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace edify_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;

        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        [HttpGet]
        public async Task<ActionResult<DashboardDto>> GetDashboard()
        {
            // In a real app, we'd get the user ID from the auth token
            int userId = 1; // Placeholder

            var dashboard = await _dashboardService.GetDashboardDataAsync(userId);
            return Ok(dashboard);
        }
    }
}