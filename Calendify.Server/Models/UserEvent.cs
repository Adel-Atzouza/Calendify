using System.ComponentModel.DataAnnotations;

public class UserEvents
    {
        public int Id { get; set; }
        public string UserId { get; set; } = "";
        public int EventId { get; set; }
    }