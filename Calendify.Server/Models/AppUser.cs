using Microsoft.AspNetCore.Identity;

namespace Calendify.Server.Models
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string? ImgUrl { get; set; } = null;

        public List<Attendance> listAttendances { get; set; } = [];
    }
}