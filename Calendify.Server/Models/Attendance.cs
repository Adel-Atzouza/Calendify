using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace Calendify.Server.Models
{
    public class Attendance
    {
        [JsonIgnore]
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan StartTime { get; set; }  // Gebruik TimeSpan voor tijd
        public TimeSpan EndTime { get; set; }    // Gebruik TimeSpan voor tijd
    }
}
