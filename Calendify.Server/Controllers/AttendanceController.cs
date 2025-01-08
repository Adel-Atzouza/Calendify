using Calendify.Server.Models;
using Calendify.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims; // Add this line to resolve the error

namespace Calendify.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AttendanceController : ControllerBase
    {
        private readonly AttendanceService _attendanceService;

        public AttendanceController(AttendanceService attendanceService)
        {
            _attendanceService = attendanceService;
        }

        // [Authorize]
        // [HttpPost]
        // public async Task<IActionResult> PostAttendance([FromBody] Attendance attendance)
        // {
        //     if (attendance == null)
        //     {
        //         return BadRequest("Invalid attendance data.");
        //     }

        //     // Simuleer een user ID (hardcoded voor test)
        //     attendance.UserId = "test-user-guid"; // Later haal je dit dynamisch uit de JWT-token

        //     var createdAttendance = await _attendanceService.AddAttendanceAsync(attendance);
        //     return CreatedAtAction(nameof(GetAttendance), new { id = createdAttendance.Id }, createdAttendance);
        // }

        // [Authorize] // Ensure only authenticated users can create attendance
        [HttpPost]
        public async Task<IActionResult> PostAttendance([FromBody] Attendance attendance)
        {
            if (attendance == null || attendance.UserId <= 0)
            {
                return BadRequest("Invalid attendance data.");
            }

            var createdAttendance = await _attendanceService.AddAttendanceAsync(attendance);
            return CreatedAtAction(nameof(GetAttendance), new { id = createdAttendance.Id }, createdAttendance);
        }

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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAttendance(int id)
        {
            var attendance = await _attendanceService.GetAttendanceByIdAsync(id);
            if (attendance == null)
            {
                return NotFound($"Attendance with ID {id} not found.");
            }

            return Ok(attendance);
        }
    }
}
