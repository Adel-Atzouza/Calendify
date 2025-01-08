using Microsoft.AspNetCore.Identity;

namespace Calendify.Server.Models
{
    public class Attendance
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
    }
}


