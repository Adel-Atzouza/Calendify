using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Calendify.Server.Models;


namespace Calendify.Server.Data
{

    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options){ }

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
        }   
    }
}