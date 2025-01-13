<<<<<<< HEAD
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
            var configuration = builder.Configuration;

            builder.Services.AddAuthorization();

            builder.Services.AddIdentityApiEndpoints<AppUser>()
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>();
            
            builder.Services.AddAuthentication().AddGoogle(googleOptions =>
            {
                googleOptions.ClientId = configuration["ClientId"];
                googleOptions.ClientSecret = configuration["ClientSecret"];
            });
            
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

            app.UseAuthentication();
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
=======
using Calendify.Server.Data;
using Calendify.Server.Models;
using Calendify.Server.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Calendify.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("https://localhost:5173") // Your React app's URL
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
            var configuration = builder.Configuration;
            builder.Services.AddAuthorization();

            builder.Services.AddIdentityApiEndpoints<AppUser>()
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>();

            builder.Services.AddAuthentication().AddGoogle(googleOptions =>
            {
                googleOptions.ClientId = configuration["ClientId"];
                googleOptions.ClientSecret = configuration["ClientSecret"];
            });

            // builder.Services.AddIdentity<AppUser, IdentityRole>()
            //     .AddEntityFrameworkStores<ApplicationDbContext>();

            var ConnectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found."); ;
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

            app.UseAuthentication();
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
>>>>>>> origin/Mark
