using System.ComponentModel.DataAnnotations;

namespace Calendify.Server.Dtos
{
    public class SettingsDto
    {
        [Required]
        public string? ImgUrl {get; set;} = string.Empty;

    }
}