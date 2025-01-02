using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Calendify.Server.Services;
using Calendify.Server.Models;

namespace Calendify.Controllers
{
    [Route("Events/")]
    public class EventController : Controller
    {
        private readonly IEventService _eventService;
        public EventController(IEventService eventService)
        {
            _eventService = eventService;
        }
        [HttpGet()]
        public async Task<IActionResult> GetEvent([FromQuery] int id)
        {
            Event _event = await _eventService.GetEvent(id);
            return _event == null ? NotFound($"Cannot find event with id: {id}") : Ok(_event);
        }

        [HttpPost()]
        public async Task<IActionResult> AddEvent([FromBody] Event _event)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            bool result = await _eventService.PostEvent(_event);
            return result ? Ok("Event added succesfully") : BadRequest();
        }

        [HttpPut()]
        public async Task<IActionResult> PutEvent([FromQuery] int id, [FromBody] Event _event)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            bool result = await _eventService.PutEvent(id, _event);
            return result ? Ok("Event changed succesfully") : BadRequest();
        }

        [HttpDelete()]
        public async Task<IActionResult> DeleteEvent([FromQuery] int id)
        {
            bool result = await _eventService.DeleteEvent(id);
            return result ? Ok("Event Deleted succesfully") : NotFound("Cannot find event");
        }
    }
}