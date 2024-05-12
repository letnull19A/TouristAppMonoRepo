using Microsoft.AspNetCore.Mvc;
using TouristCompany.Interfaces;
using Mapster;
using TouristCompany.Models.DTOs;
using TouristCompany.Models.Entities;

namespace TouristCompany.Controllers
{
    [ApiController]
    [Route("api/registration")]
    public class RegistrationController(IRepository<User> userRepository) : ControllerBase
    {
        [HttpPost]
        public IActionResult RegisterUser([FromBody] RegistrationDto registrationDto)
        {
            var newUser = registrationDto.Adapt<User>();
            userRepository.Insert(newUser);

            return Ok(new
            {
                newUser.Id,
                newUser.FirstName,
                newUser.LastName,
                newUser.Patronymic,
                newUser.Email
            });
        }
    }
}