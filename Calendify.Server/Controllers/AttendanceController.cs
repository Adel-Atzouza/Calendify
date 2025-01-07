using Microsoft.AspNetCore.Mvc;
using Calender.Models;
using Calender.Services;
using System.Threading.Tasks;

namespace Calender.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AttendanceController : ControllerBase
    {
        private readonly AttendanceService _attendanceService;

        public AttendanceController(AttendanceService attendanceService)
        {
            _attendanceService = attendanceService;
        }

        [HttpPost]
        public async Task<IActionResult> AttendancePost([FromBody] Attendance attendance)
        {
            // Check if attendance already exists for this user and date
            bool attendanceExists = await _attendanceService.CheckAttendanceExistsAsync(attendance.UserId, attendance.Date);

            if (attendanceExists)
            {
                return BadRequest("You already attended this event.");
            }

            var createdAttendance = await _attendanceService.AddAttendanceAsync(attendance);
            return Created(string.Empty, createdAttendance);
        }

    }
}
