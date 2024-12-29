// using Calendify.Server;
// using Calendify.Server.Models;
// using Calendify.Server.Services;
// using Microsoft.AspNetCore.Identity;
// using Microsoft.EntityFrameworkCore;

// var builder = WebApplication.CreateBuilder(args);


// // Add services to the container.
// builder.Services.AddAuthorization();

// builder.Services.AddIdentityApiEndpoints<AppUser>()
//     .AddRoles<IdentityRole>()
//     .AddEntityFrameworkStores<ApplicationDbContext>();

// builder.Services.AddDbContext<ApplicationDbContext>(
//     options => options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// // builder.Services.AddDefaultIdentity<AppUser>(options => options.SignIn.RequireConfirmedAccount = true).AddEntityFrameworkStores<ApplicationDbContext>();

// builder.Services.AddCors(options =>
// {
//     options.AddDefaultPolicy(
//         policy =>
//         {
//             policy.WithOrigins("https://localhost:5173")
//                           .AllowAnyHeader()
//                           .AllowAnyMethod()
//                           .AllowCredentials();
                                
//         });
// });

// builder.Services.AddScoped<UserService>();

// builder.Services.AddControllers();
// // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

// // builder.Services.Configure<IdentityOptions>(options =>
// // {
// //     options.SignIn.RequireConfirmedEmail = true;
// // });

// // builder.Services.AddTransient<IEmailSender, EmailSender>(); // There is no EmailSender class made yet by us


// var app = builder.Build();

// app.UseCors();

// app.UseDefaultFiles();
// app.UseStaticFiles();

// app.UseAuthorization();
// app.MapIdentityApi<AppUser>();


// // Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

// // app.MapSwagger().RequireAuthorization();

// app.UseHttpsRedirection();

// app.MapControllers();

// app.MapFallbackToFile("/index.html");


// app.Run();


using Calendify.Server;
using Calendify.Server.Models;
using Calendify.Server.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddAuthorization();

builder.Services.AddIdentityApiEndpoints<AppUser>()
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddDbContext<ApplicationDbContext>(
    options => options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("https://localhost:5173") // Your frontend URL
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
});

builder.Services.AddScoped<UserService>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Ensure CORS is used before any other middleware that might handle requests
app.UseCors(); // This applies the default CORS policy

app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseAuthorization();
app.MapIdentityApi<AppUser>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();
app.MapFallbackToFile("/index.html");

app.Run();
