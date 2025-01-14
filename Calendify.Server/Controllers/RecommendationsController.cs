using Microsoft.AspNetCore.Mvc;
using Calendify.Server.Models;
using Calendify.Server.Services;
using System.Threading.Tasks;
using System.Collections.Generic;
using Calendify.Services;

namespace Calendify.Server.Controllers
{
    [Route("Recommendations/")]
    public class RecommendationsController : ControllerBase
    {
        private readonly RecommendationService _recommendationsService;

        public RecommendationsController(RecommendationService recommendationsService)
        {
            _recommendationsService = recommendationsService;
        }

        // Endpoint to get recommendations based on categories of attended events
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetRecommendations(string userId)
        {
            var recommendations = await _recommendationsService.GetRecommendations(userId);

            if (recommendations == null || recommendations.Count == 0)
            {
                return NotFound($"No recommendations available for user with ID: {userId}");
            }

            return Ok(recommendations);
        }

    }
}