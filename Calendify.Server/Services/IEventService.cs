using Calendify.Server.Models;
namespace Calendify.Server.Services
{
    public interface IEventService
    {
        Task<EventPage?> GetAllEvents(int PageNumber, int PageSize);
        Task<Event?> GetEvent(int id);
        Task<int> PostEvent(Event _event);
        Task<bool> PutEvent(int id, Event _event);
        Task<bool> DeleteEvent(int id);
        Task<bool> ApproveEvent(int EventId);
        Task<List<string>> GetReviews(int id);
        Task<double> avgRatingEvent(int EventId);

    }
}
