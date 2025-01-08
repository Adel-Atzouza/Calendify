using Calendify.Server.Dtos;
using Calendify.Server.Models;
using Calendify.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;


namespace Calendify.Server.Controllers
{
    [ApiController]
    [Route("")]
    public class AccountController(
        SignInManager<AppUser> signInManager, UserManager<AppUser> userManager, UserService userService) : ControllerBase
    {
        [Authorize()]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            return Ok();
        }

        [Authorize()]
        [HttpGet("pingauth")]
        public async Task<IActionResult> PingAuth()
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            var user = await userManager.FindByIdAsync(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var roles = await userManager.GetRolesAsync(user);
            var name = user.FirstName + " " + user.LastName;
            var image = user.ImgUrl;

            return Ok(new { Email = email, Roles = roles, Name = name, Image = image });
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("AssignRoleToUser")]
        public async Task<IActionResult> AssignRoleToUser([FromBody] AssignRoleToUserDto assignRoleToUserDto)
        {
            if (assignRoleToUserDto is not null)
            {
                var success = await userService.AssignRoleToUser(assignRoleToUserDto.Email, assignRoleToUserDto.RoleName);
                return Ok(success ? "Role assigned successfully" : "Role not assigned");
            }
            return BadRequest("Provide valid fields 'Email' and 'RoleName'");
        }
    }
}