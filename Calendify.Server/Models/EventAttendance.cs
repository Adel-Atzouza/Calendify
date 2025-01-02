using System;
using System.ComponentModel.DataAnnotations;
using Calendify.Server.Models;

namespace Calendify.Server.Models
{
    public class EventAttendanceModel
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }
        [Required]
        public int EventId { get; set; }
        [Required]
        public DateTime AttendedAt { get; set; }

        public int Rating { get; set; }
        public string? Feedback { get; set; }

        public User User { get; set; }

        public Event Event { get; set; }
    }
}
