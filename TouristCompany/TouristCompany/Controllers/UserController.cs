using Microsoft.AspNetCore.Mvc;
using TouristCompany.Interfaces;
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
        public IActionResult UpdateUser(Guid id, User user)
        {
            if (id != user.Id)
                return BadRequest();

            userRepository.Update(user);
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