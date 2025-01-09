using Calendify.Server.Models;
namespace Calendify.Server.Services
{
    public interface IEventService
    {
        Task<Event?> GetEvent(int id);
        Task<bool> PostEvent(Event _event);
        Task<bool> PutEvent(int id, Event _event);
        Task<bool> DeleteEvent(int id);
        Task<List<string>> GetReviews(int id);
        Task<double> avgRatingEvent(int EventId);

    }
}
