using Calendify.Server.Dtos;
using Calendify.Server.Models;
using Calendify.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Calendify.Server.Controllers
{
    [ApiController]
    [Route("")]
    public class AccountController(SignInManager<AppUser> signInManager, UserService userService) : ControllerBase
    {
        [Authorize()]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout([FromBody] object empty)
        {
            if (empty != null)
            {
                await signInManager.SignOutAsync();
                return Ok();
            }
            return Unauthorized();
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