using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Calendify.Server.Models
{
    public class User
    {
        public int Id { get; set; } // Unique identifier for each user

        public string FirstName { get; set; } // First name of the user

        public string LastName { get; set; } // Last name of the user

        public string Email { get; set; } // Email address of the user
        public string Role { get; set; }

        public List<EventAttendanceModel> Attendances { get; set; } = new List<EventAttendanceModel>();
    }
}
