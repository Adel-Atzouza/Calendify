
using System.ComponentModel.DataAnnotations;

namespace Calendify.Server.Dtos
{
    public class AssignRoleToUserDto
    {
        [EmailAddress]
        [Required]
        public string Email {get; set;} = String.Empty;
        [Required]
        public string RoleName {get; set;} = String.Empty;
    }
}