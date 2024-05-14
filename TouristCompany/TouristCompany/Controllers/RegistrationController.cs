using Microsoft.AspNetCore.Mvc;
using TouristCompany.Interfaces;
using Mapster;
using TouristCompany.Models.DTOs;
using TouristCompany.Models.Entities;

namespace TouristCompany.Controllers
{
    // 0fe41223-993b-4df4-b222-e9aa4b5824b4 - Пользователь
    // a76182e2-7f23-4575-907c-289cbb103ba2 - Администратор
    [ApiController]
    [Route("api/registration")]
    public class RegistrationController(IRepository<User> userRepository) : ControllerBase
    {
        [HttpPost]
        public IActionResult RegisterUser([FromBody] RegistrationDto registrationDto)
        {
            var newUser = registrationDto.Adapt<User>();
            newUser.RoleId = Guid.Parse("0fe41223-993b-4df4-b222-e9aa4b5824b4");
            
            userRepository.Insert(newUser);

            return Ok(new
            {
                newUser.Id,
                newUser.FirstName,
                newUser.LastName,
                newUser.Patronymic,
                newUser.Email,
                newUser.RoleId
            });
        }
    }
}