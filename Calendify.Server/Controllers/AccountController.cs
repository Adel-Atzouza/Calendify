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
        SignInManager<AppUser> signInManager, UserService userService) : Controller
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
        public IActionResult PingAuth()
        {
            ClaimsPrincipal user = new();
            var email = user.FindFirstValue(ClaimTypes.Email);
            return Json(new { Email = email }); ;
        }

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