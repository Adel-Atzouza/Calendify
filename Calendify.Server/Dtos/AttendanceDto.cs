using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace Calendify.Server.Models
{
    public class AttendanceDTO
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan StartTime { get; set; }  // Gebruik TimeSpan voor tijd
        public TimeSpan EndTime { get; set; }    // Gebruik TimeSpan voor tijd
    }
}
