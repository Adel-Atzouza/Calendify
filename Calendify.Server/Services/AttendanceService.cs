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

        // Voeg een Attendance toe (dit blijft ongewijzigd)
        // public async Task<Attendance> AddAttendanceAsync(Attendance attendance)
        // {
        //     attendance.Date = DateTime.UtcNow;

        //     // Ensure UserId is valid before saving
        //     if (string.IsNullOrEmpty(attendance.UserId))
        //     {
        //         throw new Exception("UserId must be provided.");
        //     }

        //     _context.Attendances.Add(attendance);
        //     await _context.SaveChangesAsync();
        //     return attendance;
        // }

        public async Task<Attendance> AddAttendanceAsync(Attendance attendance)
        {
            // Validatie: controleer of EndTime na StartTime ligt
            if (attendance.EndTime <= attendance.StartTime)
            {
                throw new Exception("End time must be after start time.");
            }

            // Validatie: controleer of de UserId geldig is
            if (string.IsNullOrEmpty(attendance.UserId))
            {
                throw new Exception("UserId must be provided.");
            }

            // attendance.Date = DateTime.UtcNow;  // Datum wordt automatisch op de huidige tijd gezet

            _context.Attendances.Add(attendance);
            await _context.SaveChangesAsync();
            return attendance;
        }

        // Verwijder een Attendance (dit blijft ongewijzigd)
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

        // Haal een Attendance op, maar retourneer alleen de relevante velden in de AttendanceDTO
        public async Task<Attendance?> GetAttendanceByIdAsync(int id)
        {
            // Gebruik Select om alleen de nodige velden op te halen en de AttendanceDTO te vullen
            return await _context.Attendances
                .Where(a => a.Id == id)
                .Select(a => new Attendance
                {
                    Id = a.Id,
                    UserId = a.UserId,  // Alleen de UserId, niet het volledige User object
                    Title = a.Title,
                    Description = a.Description,
                    Date = a.Date,
                    StartTime = a.StartTime,
                    EndTime = a.EndTime,
                })
                .FirstOrDefaultAsync();  // Retourneer null als geen Attendance gevonden is
        }
    }
}
