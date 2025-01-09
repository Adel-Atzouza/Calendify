using Calendify.Server.Models;
using Calendify.Server.Data;
namespace Calendify.Server.Services
{
    using Microsoft.EntityFrameworkCore;

    public class EventService : IEventService
    {

        readonly ApplicationDbContext _context;
        public EventService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Event?> GetEvent(int id)
        {
            try
            {
                Event? _event = await _context.Events.FindAsync(id);
                return _event;

            }
            catch (Exception)
            {
                return null;
            }
        }
        public async Task<bool> PostEvent(Event _event)
        {
            await _context.Events.AddAsync(_event);
            int AffectedRows = await _context.SaveChangesAsync();
            return AffectedRows > 0;
        }
        public async Task<bool> PutEvent(int id, Event _event)
        {
            Event? FoundEvent = await _context.Events.FindAsync(id);
            if (FoundEvent == null)
            {
                return false;
            }

            try
            {
                _context.Entry(FoundEvent).CurrentValues.SetValues(_event);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }

        }
        public async Task<bool> DeleteEvent(int id)
        {
            Event? _event = await _context.Events.FindAsync(id);
            if (_event == null) return false;
            _context.Events.Remove(_event);
            int AffectedRows = await _context.SaveChangesAsync();
            return AffectedRows == 1;
        }

        public async Task<List<string>> GetReviews(int EventId)
        {
            var review = await _context.EventAttendances
                .Where(o => o.EventId == EventId)
                .Select(o => o.Feedback)
                .ToListAsync();

            return review;
        }

        public async Task<double> avgRatingEvent(int EventId)
        {
            var ratings = await _context.EventAttendances
                .Where(o => o.EventId == EventId)
                .Select(o => o.Rating)
                .ToListAsync();

            if (ratings.Count == 0)
            {
                return 0;
            }

            return ratings.Average();
        }

    }
}