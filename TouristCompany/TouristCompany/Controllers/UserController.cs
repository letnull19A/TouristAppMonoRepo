using Microsoft.AspNetCore.Mvc;
using TouristCompany.Interfaces;
using TouristCompany.Models.DTOs.User;
using TouristCompany.Models.Entities;

namespace TouristCompany.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController(IRepository<User> userRepository) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAllUsers() => Ok(userRepository.GetAll());

        [HttpGet("{id:guid}")]
        public IActionResult GetUserById(Guid id)
        {
            var user = userRepository.GetById(id);

            return Ok(user);
        }

        [HttpPut("{id:guid}")]
        public IActionResult UpdateUser(Guid id, UserUpdateDto user)
        {
            var currentUser = userRepository.GetById(id);

            currentUser.Email = user.Email;
            currentUser.FirstName = user.FirstName;
            currentUser.LastName = user.LastName;
            currentUser.Patronymic = user.Patronymic;
            
            userRepository.Update(currentUser);
            return NoContent();
        }

        [HttpDelete("{id:guid}")]
        public IActionResult DeleteUser(Guid id)
        {
            userRepository.Delete(id);
            return NoContent();
        }
    }
}