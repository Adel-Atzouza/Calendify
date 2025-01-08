using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Calendify.Server.Models;


namespace Calendify.Server.Data
{

    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public DbSet<Event> Events { get; set; }
        public DbSet<EventAttendanceModel> EventAttendances { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Id = "4d5a7d6c-6df4-4d72-9373-91fdb8a541e0",
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                }
            };
            builder.Entity<IdentityRole>().HasData(roles);


            builder.Entity<EventAttendanceModel>()
                .HasOne(ea => ea.User)
                .WithMany()
                .HasForeignKey(ea => ea.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<EventAttendanceModel>()
                .HasOne(ea => ea.Event)
                .WithMany()
                .HasForeignKey(ea => ea.EventId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<EventAttendanceModel>().HasKey(ea => new { ea.UserId, ea.EventId });
        }
    }
}