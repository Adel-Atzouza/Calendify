using Calender.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Calender.Services
{
    public class AttendanceService
    {
        private readonly AppDbContext _appDbContext;

        public AttendanceService(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<bool> CheckAttendanceExistsAsync(int userId, DateTime date)
        {
            return await _appDbContext.Attendances.AnyAsync(a => a.UserId == userId && a.Date == date);
        }

        public async Task<Attendance> AddAttendanceAsync(Attendance attendance)
        {
            _appDbContext.Attendances.Add(attendance);
            await _appDbContext.SaveChangesAsync();
            return attendance;
        }
    }
}
