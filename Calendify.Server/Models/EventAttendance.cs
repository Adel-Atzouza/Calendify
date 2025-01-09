using System;
using System.ComponentModel.DataAnnotations;
using Calendify.Server.Models;

namespace Calendify.Server.Models
{
    public class EventAttendanceModel
    {
        [Required]
        public string UserId { get; set; }
        [Required]
        public int EventId { get; set; }
        [Required]
        public DateTime AttendedAt { get; set; }
        [Range(1, 5, ErrorMessage = "Rating must be between 1 and 5.")]
        public int Rating { get; set; }
        [MaxLength(250, ErrorMessage = "Feedback cannot exceed 250 characters.")]
        public string? Feedback { get; set; }

        public AppUser? User {get;set; } = null!;

        public Event Event { get; set; }
    }

    public class AttendEventRequest
    {
        public string UserId { get; set; }
        public int EventId { get; set; }
    }

    public class AttendeeDtogetattendees
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }

    public class EventReviewRequest
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        public int EventId { get; set; }

        [Range(1, 5, ErrorMessage = "Rating must be between 1 and 5.")]
        public int Rating { get; set; }

        [MaxLength(250, ErrorMessage = "Feedback cannot exceed 250 characters.")]
        public string? Feedback { get; set; }
    }


}
