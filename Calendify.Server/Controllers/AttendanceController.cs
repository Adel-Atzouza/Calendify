using Calendify.Server.Models;
using Calendify.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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

        // Create Attendance
        // [HttpPost]
        // public async Task<IActionResult> PostAttendance([FromBody] Attendance attendance)
        // {
        //     if (attendance == null || string.IsNullOrEmpty(attendance.UserId) || attendance.Date == default)
        //     {
        //         return BadRequest("Invalid attendance data.");
        //     }
        //     var createdAttendance = await _attendanceService.AddAttendanceAsync(attendance);
        //     return CreatedAtAction(nameof(GetAttendance), new { id = createdAttendance.Id }, createdAttendance);
        // }

        [HttpPost]
        public async Task<IActionResult> AddAttendance([FromBody] Attendance attendance)
        {
            try
            {
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
    }
}
