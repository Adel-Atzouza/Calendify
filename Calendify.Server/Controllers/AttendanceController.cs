using Calendify.Server.Models;
using Calendify.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Calendify.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AttendanceController : ControllerBase
    {
        private readonly AttendanceService _attendanceService;
        public readonly UserManager<AppUser> _userManager;

        public AttendanceController(AttendanceService attendanceService, UserManager<AppUser> userManager)
        {
            _attendanceService = attendanceService;
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> AddAttendance([FromBody] Attendance attendance)
        {
            try
            {
                // Ensure the UserId is set in the attendance object
                var user = await _userManager.FindByIdAsync(User.FindFirstValue(ClaimTypes.NameIdentifier));
                if (string.IsNullOrEmpty(user.Id))
                {
                    return BadRequest(new { message = "User is not authenticated." });
                }

                attendance.UserId = user.Id;  // Set the UserId in attendance object

                // Now proceed to add attendance
                var createdAttendance = await _attendanceService.AddAttendanceAsync(attendance);
                return Ok(createdAttendance);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


        // Delete Attendance
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAttendance(int id)
        {
            var result = await _attendanceService.DeleteAttendanceAsync(id);
            if (!result)
            {
                return NotFound($"Attendance with ID {id} not found.");
            }

            return NoContent();
        }

        // Get Attendance by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAttendance(int id)
        {
            var attendance = await _attendanceService.GetAttendanceByIdAsync(id);
            if (attendance == null)
            {
                return NotFound($"Attendance with ID {id} not found.");
            }

            // Return the AttendanceDTO (with only UserId and other fields)
            return Ok(attendance);
        }
        // Haal alle attendances op
        [HttpGet]
        public async Task<IActionResult> GetAllAttendances()
        {
            try
            {
                var attendances = await _attendanceService.GetAllAttendancesAsync();
                return Ok(attendances);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while fetching the attendances.", details = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAttendance(int id, [FromBody] Attendance updatedAttendance)
        {
            try
            {
                var result = await _attendanceService.UpdateAttendanceAsync(id, updatedAttendance);
                if (!result)
                {
                    return NotFound($"Attendance with ID {id} not found.");
                }
                return NoContent(); // Succesvolle update
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
