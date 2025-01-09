using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Calendify.Server.Services;
using Calendify.Server.Models;

namespace Calendify.Controllers
{
    [Route("Recommendations/")]
    [ApiController]
    public class RecommendationsController : ControllerBase
    {
        private readonly RecommendationService _recommendationsService;

        public RecommendationsController(RecommendationService recommendationService)
        {
            _recommendationsService = recommendationService;
        }

        // Endpoint to get recommendations based on categories of attended events
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetRecommendations(int userId)
        {
            // Fetch recommendations for the user
            var recommendations = await _recommendationsService.GetRecommendations(userId);

            // Check if any recommendations were found
            if (recommendations == null || recommendations.Count == 0)
            {
                return NotFound("No recommendations available for this user.");
            }

            // Return the list of recommended events
            return Ok(recommendations);
        }
    }
}