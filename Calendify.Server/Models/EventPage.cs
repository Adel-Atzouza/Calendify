namespace Calendify.Server.Models
{


    public class EventPage
    {
        public List<Event> Events { get; set; }
        public bool IsLastPage { get; set; }

        public EventPage(List<Event> events, bool isLastPage)
        {
            Events = events;
            IsLastPage = isLastPage;
        }
    }
}