using Calendify.Server.Models;
using Calendify.Server.Data;
using Microsoft.EntityFrameworkCore;

namespace Calendify.Server.Services
{
    public class EventattendanceService
    {
        private readonly ApplicationDbContext _context;

        public EventattendanceService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<string> AttendEvent(string userId, int eventId)
        {
            var eventToAttend = await _context.Events.FirstOrDefaultAsync(e => e.Id == eventId);
            if (eventToAttend == null) return "Event not found.";

            var user = await _context.Users.FirstOrDefaultAsync(o => o.Id == userId);
            if (user == null) return "User not found.";

            var currentDate = DateTime.UtcNow;
            if (eventToAttend.Date < currentDate.Date || 
                (eventToAttend.Date == currentDate.Date && eventToAttend.StartTime < currentDate.TimeOfDay))
                return "Event has already started.";

            int currentAttendees = await _context.EventAttendances.CountAsync(ea => ea.Event.Id == eventId);
            if (currentAttendees >= eventToAttend.MaxAttendees) return "Event is full.";

            var existingAttendance = await _context.EventAttendances
                .FirstOrDefaultAsync(ea => ea.Event.Id == eventId && ea.User.Id == userId);
            if (existingAttendance != null) return "You are already attending this event.";

            var attendance = new EventAttendanceModel
            {
                User = user,
                Event = eventToAttend,
                Feedback = "",
                Rating = 0
            };

            _context.EventAttendances.Add(attendance);
            await _context.SaveChangesAsync();

            return "Attendance confirmed.";
        }

        
    }
}
