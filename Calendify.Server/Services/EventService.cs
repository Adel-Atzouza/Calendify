using Calendify.Server.Models;
using Calendify.Server.Data;
namespace Calendify.Server.Services
{
    using System.Collections.Generic;
    using Microsoft.AspNetCore.Mvc;
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
            try
            {
                Event? _event = await _context.Events.FindAsync(id);
                return _event;

            }
            catch (Exception)
            {
                return null;
            }
        }
        public async Task<int> PostEvent(Event _event)
        {
            await _context.Events.AddAsync(_event);
            int AffectedRows = await _context.SaveChangesAsync();
            return AffectedRows > 0 ? _event.Id : 0;
        }
        public async Task<bool> PutEvent(int id, Event _event)
        {
            Event? FoundEvent = await _context.Events.FindAsync(id);
            if (FoundEvent == null)
            {
                return false;
            }

            try
            {
                _context.Entry(FoundEvent).CurrentValues.SetValues(_event);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }

        }
        public async Task<bool> ApproveEvent(int EventId)
        {
            Event EventFound = await _context.Events.FindAsync(EventId);
            if (EventFound == null)
            {
                return false;
            }
            EventFound.AdminApproval = true;
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<bool> DeleteEvent(int id)
        {
            Event? _event = await _context.Events.FindAsync(id);
            if (_event == null) return false;
            _context.Events.Remove(_event);
            int AffectedRows = await _context.SaveChangesAsync();
            return AffectedRows == 1;
        }

        public async Task<EventPage?> GetAllEvents(int PageNumber, int PageSize)
        {
            List<Event> Events = await _context.Events.ToListAsync();
            List<Event> CurrentPage = Events.Skip((PageNumber - 1) * PageSize).Take(PageSize).ToList();
            bool isLastPage = false;
            if (Events.Last().Id == CurrentPage.Last().Id)
            {
                isLastPage = true;
            }
            return new EventPage(CurrentPage, isLastPage);
        }
    }
}