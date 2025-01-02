using Calendify.Server.Models;
using Calendify.Server.Data;
namespace Calendify.Server.Services
{
    using Microsoft.EntityFrameworkCore;

    public class EventService : IEventService
    {

        readonly ApplicationDbContext _context;
        public EventService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Event?> GetEvent(int id)
        {
            Event? _event = await _context.Events.FindAsync(id);
            return _event;
        }
        public async Task<bool> PostEvent(Event _event)
        {
            if (_event == null || Helper.FieldsAreNull(_event)) return false;
            await _context.Events.AddAsync(_event);
            await _context.SaveChangesAsync();
            return true;

        }
        public async Task<bool> PutEvent(int id, Event _event)
        {
            if (_event == null || Helper.FieldsAreNull(_event)) return false;
            Event? FoundEvent = await _context.Events.Where(e => e.Id == id).FirstOrDefaultAsync();
            if (FoundEvent == null)
            {
                return false;
            }
            FoundEvent.Title = _event.Title;
            FoundEvent.Description = _event.Description;
            FoundEvent.Date = _event.Date;
            FoundEvent.StartTime = _event.StartTime;
            FoundEvent.EndTime = _event.EndTime;
            FoundEvent.Location = _event.Location;
            FoundEvent.AdminApproval = _event.AdminApproval;
            FoundEvent.MaxAttendees = _event.MaxAttendees;
            FoundEvent.Category = _event.Category;



            _context.Events.Update(FoundEvent);
            await _context.SaveChangesAsync();
            return true;


        }
        public async Task<bool> DeleteEvent(int id)
        {
            Event? _event = await _context.Events.FindAsync(id);
            if (_event == null) return false;
            _context.Events.Remove(_event);
            await _context.SaveChangesAsync();
            return true;


        }

    }
}