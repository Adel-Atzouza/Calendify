using Microsoft.AspNetCore.Mvc;
using Calendify.Server.Models;
using System.Collections.Generic;
using System.Linq;
using Calendify.Server.Data;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace Calendify.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserEventsController : ControllerBase
    {
        public async Task<string> GetUserID()
        {
            var user = await _userManager.FindByIdAsync(User.FindFirstValue(ClaimTypes.NameIdentifier));
            return user.Id;
        }

        private readonly ApplicationDbContext _context;
        private readonly UserManager<AppUser> _userManager;

        public UserEventsController(ApplicationDbContext context, UserManager<AppUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/UserEvents/{userId}
        [HttpGet("{userId}")]
        public ActionResult<IEnumerable<UserEvents>> GetUserEvents(string userId)
        {
            var userEvents = _context.UserEvents.Where(ue => ue.UserId == userId).ToList();
            if (userEvents == null || !userEvents.Any())
                return NotFound();
            return Ok(userEvents);
        }

        // POST: api/UserEvents
        [HttpPost]
        public ActionResult<UserEvents> CreateUserEvent([FromBody] UserEvents userEvent)
        {
            if (userEvent == null)
                return BadRequest("Invalid event data.");

            _context.UserEvents.Add(userEvent);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetUserEvents), new { userId = userEvent.UserId }, userEvent);
        }

        // DELETE: api/UserEvents/{userId}/{eventId}
        [HttpDelete("{userId}/{eventId}")]
        public ActionResult DeleteUserEvent(string userId, int eventId)
        {
            var userEvent = _context.UserEvents.FirstOrDefault(ue => ue.UserId == userId && ue.EventId == eventId);
            if (userEvent == null)
                return NotFound("Event not found.");

            _context.UserEvents.Remove(userEvent);
            _context.SaveChanges();
            return NoContent(); // 204 No Content
        }
    }
}
