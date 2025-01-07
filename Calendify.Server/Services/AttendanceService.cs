using Calendify.Server.Data;
using Calendify.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Calendify.Server.Services
{
    public class AttendanceService
    {
        private readonly ApplicationDbContext _context;

        public AttendanceService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Attendance> AddAttendanceAsync(Attendance attendance)
        {
            attendance.Date = DateTime.UtcNow;
            _context.Attendances.Add(attendance);
            await _context.SaveChangesAsync();
            return attendance;
        }

        public async Task<bool> DeleteAttendanceAsync(int id)
        {
            var attendance = await _context.Attendances.FindAsync(id);
            if (attendance == null)
            {
                return false;
            }

            _context.Attendances.Remove(attendance);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Attendance?> GetAttendanceByIdAsync(int id)
        {
            return await _context.Attendances.FindAsync(id);
        }
    }
}
