using Calendify.Server.Models;
using Calendify.Server.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Calendify.Services
{
    public class RecommendationService
    {
        private readonly ApplicationDbContext _context;

        public RecommendationService(ApplicationDbContext context)
        {
            _context = context;
        }

        // Method to recommend new events to a user based on their previously attended events
        public async Task<List<Event>> GetRecommendations(string userId)
        {
            // Step 1: Fetch all event IDs that the user has attended
            var attendedEventIds = await _context.EventAttendances
                .Where(ea => ea.User.Id == userId)  // Find all attendances where the user matches
                .Select(ea => ea.Event.Id)          // Only grab the EventId for each attendance
                .ToListAsync();                         

            // Step 2: Find the unique categories of events the user attended
            var attendedCategories = await _context.Events
                .Where(e => attendedEventIds.Contains(e.Id) && e.Category != null) // Only events with categories
                .Select(e => e.Category)           // Grab the category of each attended event
                .Distinct()                        // Remove duplicate categories
                .ToListAsync();                   

            // Step 3: Find new events in the same categories that the user hasn’t attended yet
            var recommendations = await _context.Events
                .Where(e => !attendedEventIds.Contains(e.Id) // Exclude events they already attended
                            && attendedCategories.Contains(e.Category) // Match categories they’ve shown interest in
                            && e.Category != null) // Only include events with a defined category
                .ToListAsync();

            // Step 4: Randomly pick up to three events from the recommendations list
            var randomRecommendations = recommendations
                .OrderBy(_ => Guid.NewGuid()) // Shuffle the order randomly
                .Take(3)                      // Pick the first 3 from the shuffled list
                .ToList();                    

            // Return the randomly selected recommendations
            return randomRecommendations;
        }
    }
}