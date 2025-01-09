using Calendify.Server.Data;
using Calendify.Server.Models;
using Calendify.Server.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Calendify.Server
{
    public class Program
    {
        public static void Main(string[] args) {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddAuthorization();

            builder.Services.AddIdentityApiEndpoints<AppUser>()
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>();
            
            // builder.Services.AddIdentity<AppUser, IdentityRole>()
            //     .AddEntityFrameworkStores<ApplicationDbContext>();

            var ConnectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");;
            builder.Services.AddDbContext<ApplicationDbContext>(
                options => options.UseSqlite(ConnectionString));

            builder.Services.AddScoped<UserService>();
            builder.Services.AddScoped<EventattendanceService>();
            builder.Services.AddScoped<IEventService, EventService>();
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();


            app.UseHttpsRedirection();
            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseAuthorization();
            app.MapIdentityApi<AppUser>();


            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }


            app.MapControllers();
            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
