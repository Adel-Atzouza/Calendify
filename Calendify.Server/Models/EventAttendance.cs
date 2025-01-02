using System;
using Calendify.Server.Models;

namespace Calendify.Server.Models
{
    public class EventAttendanceModel
    {
        public int Id { get; set; } // Unique identifier for each attendance record

        public int UserId { get; set; } // ID of the user attending the event

        public int EventId { get; set; } // ID of the event being attended

        public DateTime AttendedAt { get; set; } = DateTime.UtcNow; // Date and time of attendance registration

        public int Rating { get; set; }
        public string? Feedback { get; set; }

        public User User { get; set; } // Reference to the User who attends

        public Event Event { get; set; } // Reference to the attended Event
    }
}
