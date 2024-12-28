using Microsoft.AspNetCore.Identity;

namespace Calendify.Server.Services
{
    public class UserService
    {
        private readonly UserManager<IdentityUser> _userManager;

        public UserService(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<bool> AssignRoleToUser(string userEmail, string roleName)
        {
            var user = await _userManager.FindByEmailAsync(userEmail);
            if (user != null)
            {
                var result = await _userManager.AddToRoleAsync(user, roleName);
                if (result.Succeeded)
                {
                    return true;
                }
            }
            return false;
        }
    }
}