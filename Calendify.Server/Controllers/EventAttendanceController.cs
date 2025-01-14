using Microsoft.AspNetCore.Mvc;
using Calendify.Server.Services;
using Calendify.Server.Models;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace Calendify.Controllers
{
    [Route("EventAttendance/")]
    public class EventAttendanceController : ControllerBase
    {
        private readonly EventattendanceService _eventattendanceService;
        private readonly UserManager<AppUser> _userManager;

        public EventAttendanceController(EventattendanceService eventattendanceService, UserManager<AppUser> userManager)
        {
            _eventattendanceService = eventattendanceService;
            _userManager = userManager;
        }

        // ✅ POST: Attend Event
        [HttpPost("Attend")]
        public async Task<IActionResult> AttendEvent([FromBody] AttendEventRequest request)
        {
            if (request == null || request.UserId == null || request.EventId <= 0)
                return BadRequest(new { message = "Invalid request data." });

            var result = await _eventattendanceService.AttendEvent(request.UserId, request.EventId);

            return result switch
            {
                "Event not found." => NotFound(new { message = result }),
                "Event has already started." => BadRequest(new { message = result }),
                "Event is full." => BadRequest(new { message = result }),
                _ => Ok(new { message = result })
            };
        }

        // ✅ GET: View Attendees
        [HttpGet("{eventId}/Attendees")]
        public async Task<IActionResult> GetEventAttendees(int eventId)
        {
            var attendees = await _eventattendanceService.GetEventAttendees(eventId);
            if (attendees == null)
                return NotFound(new { message = "No attendees found for this event." });

            return Ok(attendees);
        }

        // ✅ GET: Get Attended Events by current User ID
        [HttpGet("attendances")]
        public async Task<IActionResult> GetAttendedEventsUserid()
        {
            var user = await _userManager.FindByIdAsync(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var userId = user.Id;

            Console.WriteLine($"Received UserId: {userId}");

            var attendance = await _eventattendanceService.GetEventsForUser(userId);

            if (attendance == null || !attendance.Any())
                return NotFound(new { message = "No attendances found." });

            return Ok(attendance);
        }

        // ✅ POST: Submit Review
        [HttpPost("SubmitReview")]
        public async Task<IActionResult> SubmitReview([FromBody] EventReviewRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = "Invalid input data." });
            }

            var result = await _eventattendanceService.SubmitReview(request.UserId, request.EventId, request.Rating, request.Feedback);

            if (result == "Attendance not found. User did not attend this event.")
                return NotFound(new { message = result });

            return Ok(new { message = result });
        }

        // ✅ DELETE: Cancel Attendance
        [HttpDelete("Cancel")]
        public async Task<IActionResult> CancelAttendance([FromBody] CancelRequest cancelRequest)
        {
            var userId = cancelRequest.UserId;
            var eventId = cancelRequest.EventId;

            if (string.IsNullOrWhiteSpace(userId) || eventId <= 0)
                return BadRequest(new { message = "Invalid user or event ID." });

            var result = await _eventattendanceService.CancelAttendance(userId, eventId);

            if (result == "Attendance not found.")
                return BadRequest(new { message = result });

            return Ok(new { message = result });
        }
    }
}