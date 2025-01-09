using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Calendify.Server.Services;
using Calendify.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;

namespace Calendify.Controllers
{
    [Route("Events")]
    public class EventController : ControllerBase
    {
        private readonly IEventService _eventService;
        public EventController(IEventService eventService)
        {
            _eventService = eventService;
        }
        [HttpGet()]
        public async Task<IActionResult> GetEvent([FromQuery] int id)
        {
            Event? _event = await _eventService.GetEvent(id);
            return _event == null ? NotFound($"Cannot find event with id: {id}") : Ok(_event);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost()]
        public async Task<IActionResult> PostEvent([FromBody] Event _event)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            int GeneratedId = await _eventService.PostEvent(_event);
            var response = new
            {
                Message = $"Event with id {GeneratedId} has been made"
            };
            return GeneratedId > 0 ? Created("localhost:3000/Events", response) : BadRequest();
        }
        [Authorize(Roles = "Admin")]
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
        [Authorize(Roles = "Admin")]
        [HttpPut("Approve")]
        public async Task<IActionResult> ApproveEvent([FromQuery] int EventId)
        {
            bool Response = await _eventService.ApproveEvent(EventId);
            return Response ? Ok($"Event with Id {EventId} has been approved") : NotFound();
        }




        [Authorize(Roles = "Admin")]
        [HttpDelete()]
        public async Task<IActionResult> DeleteEvent([FromQuery] int id)
        {
            bool result = await _eventService.DeleteEvent(id);
            return result ? Ok("Event Deleted succesfully") : NotFound("Cannot find event");
        }



    }
}