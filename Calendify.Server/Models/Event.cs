using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Calendify.Server.Models
{
    public class Event
    {
        public int Id { get; set; } // Unique identifier for each event

        public string Title { get; set; } // Title of the event

        public string Description { get; set; } // Detailed description of the event

        public DateTime Date { get; set; } // Date of the event

        public TimeSpan StartTime { get; set; } // Start time of the event

        public TimeSpan? EndTime { get; set; } //end time of the event

        public string Location { get; set; } // Location where the event will be held
        public int MaxAttendees { get; set; } // Maximum number of attendees allowed
        public string Category { get; set; } //"ART", "TECH"
        public bool AdminApproval { get; set; }

        public List<EventAttendanceModel> Attendances { get; set; } = new List<EventAttendanceModel>();
    }
}
