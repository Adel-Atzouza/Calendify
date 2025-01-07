using Microsoft.AspNetCore.Identity;

namespace Calendify.Server.Models
{
    public class Attendance
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime Date { get; set; }
    }
}
