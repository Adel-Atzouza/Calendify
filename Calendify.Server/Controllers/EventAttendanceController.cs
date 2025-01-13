using Microsoft.AspNetCore.Mvc;
using Calendify.Server.Services;
using Calendify.Server.Models;

namespace Calendify.Controllers
{
    [Route("EventAttendance/")]
    public class EventAttendanceController : ControllerBase
    {
        private readonly EventattendanceService _eventattendanceService;

        public EventAttendanceController(EventattendanceService eventattendanceService)
        {
            _eventattendanceService = eventattendanceService;
        }

        // POST: Attend Event
        [HttpPost("Attend")]
        public async Task<IActionResult> AttendEvent([FromBody] AttendEventRequest request)
        {
            if (request == null || request.UserId == null || request.EventId <= 0)
                return BadRequest("Invalid request data.");

            var result = await _eventattendanceService.AttendEvent(request.UserId, request.EventId);

            return result switch
            {
                "Event not found." => NotFound(result),
                "Event has already started." => BadRequest(result),
                "Event is full." => BadRequest(result),
                _ => Ok(result)
            };
        }


        // GET: View Attendees
        [HttpGet("{eventId}/Attendees")]
        public async Task<IActionResult> GetEventAttendees(int eventId)
        {
            var attendees = await _eventattendanceService.GetEventAttendees(eventId);
            if (attendees == null)
                return NotFound("No attendees found for this event.");

            return Ok(attendees);
        }

        [HttpGet("{userId}/attendances")]
        public async Task<IActionResult> GetAttendedEventsUserid(string userId)
        {
            Console.WriteLine($"Received UserId: {userId}");

            var attendance = await _eventattendanceService.GetEventsForUser(userId);

            if (attendance == null || !attendance.Any())
                return NotFound("No attendances found.");

            return Ok(attendance);
        }

        [HttpPost("SubmitReview")]
        public async Task<IActionResult> SubmitReview([FromBody] EventReviewRequest request)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _eventattendanceService.SubmitReview(request.UserId, request.EventId, request.Rating, request.Feedback);

            // If the user didn't attend, return a 404
            if (result == "Attendance not found. User did not attend this event.")
                return NotFound(result);

            // Otherwise, confirm the review was submitted
            return Ok(result); // "Review submitted successfully."
        }


        // DELETE: Cancel Attendance
        [HttpDelete("Cancel")]
        public async Task<IActionResult> CancelAttendance([FromBody] string userId, [FromBody] int eventId)
        {
            if (string.IsNullOrWhiteSpace(userId) || eventId <= 0)
                return BadRequest("Invalid user or event ID.");

            var result = await _eventattendanceService.CancelAttendance(userId, eventId);

            if (result == "Attendance not found.")
                return NotFound(result);

            return Ok(result);
        }

    }
}
