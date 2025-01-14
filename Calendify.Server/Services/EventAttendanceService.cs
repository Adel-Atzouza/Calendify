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
                return "Event has already started/Event is already finished.";

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
                AttendedAt = DateTime.UtcNow,
                Rating = 0
            };

            _context.EventAttendances.Add(attendance);
            await _context.SaveChangesAsync();

            return "Attendance confirmed.";
        }
        public async Task<List<AttendeeDtogetattendees>> GetEventAttendees(int eventId)
        {
            return await _context.EventAttendances
                .Where(ea => ea.Event.Id == eventId)
                .Select(ea => new AttendeeDtogetattendees
                {
                    UserId = ea.User.Id,  // ✅ Voeg de UserId toe
                    FirstName = ea.User.FirstName,
                    LastName = ea.User.LastName
                })
                .ToListAsync();
        }


        public async Task<List<Event>> GetEventsForUser(string userId)
        {
            var attendances = await _context.EventAttendances
                .Where(ea => ea.UserId == userId)
                .Include(ea => ea.Event)
                .ToListAsync();

            // Log wat er gevonden wordt
            Console.WriteLine($"Found {attendances.Count} attendances for UserId: {userId}");

            return attendances.Select(ea => ea.Event).ToList();
        }

        public async Task<string> SubmitReview(string userId, int eventId, int rating, string feedback)
        {
            // Check if the user attended the event
            var attendance = await _context.EventAttendances.FirstOrDefaultAsync(ea => ea.User.Id == userId && ea.Event.Id == eventId);

            if (attendance == null)
            {
                return "Attendance not found. User did not attend this event."; // Can't review without attending
            }

            // Update rating and feedback
            attendance.Rating = rating;
            attendance.Feedback = feedback;

            await _context.SaveChangesAsync(); // Save the review
            return "Review has been submitted"; // Success message
        }


        public async Task<string> CancelAttendance(string userId, int eventId)
        {
            // Locate the attendance record based on user and event IDs
            var attendance = await _context.EventAttendances
                .FirstOrDefaultAsync(ea => ea.User.Id == userId && ea.Event.Id == eventId);

            // Check if the attendance record exists
            if (attendance == null)
            {
                return "Attendance not found."; // No attendance found to cancel
            }

            // Remove the attendance record
            _context.EventAttendances.Remove(attendance);
            await _context.SaveChangesAsync(); // Save changes

            return "Attendance canceled."; // Confirmation message
        }


    }
}
