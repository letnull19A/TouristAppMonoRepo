using Mapster;
using Microsoft.AspNetCore.Mvc;
using TouristCompany.Interfaces;
using TouristCompany.Models.DTOs;
using TouristCompany.Models.DTOs.Lite;
using TouristCompany.Models.DTOs.UserTour;
using TouristCompany.Models.Entities;

namespace TouristCompany.Controllers
{
    [ApiController]
    [Route("api/user/tour")]
    public class UserTourController(
        IRepository<UserTour> userTourRepository,
        IRepository<User> userRepository,
        IRepository<Country> countryRepository,
        IRepository<City> cityRepository,
        IRepository<Tour> tourRepository) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAllUserTours()
        {
            var userTours = userTourRepository.GetAll();
            var tours = tourRepository.GetAll();
            
            var result = userTours
                .Join(tours, u => u.TourId, v => v.Id, (u, v) => new
                {
                    Id = u.Id,
                    BookingDate = u.BookingDate,
                    Tour = v.Adapt<TourLiteDto>(),
                    User = userRepository.GetById(u.UserId).Adapt<UserLiteDto>(),
                    Country = countryRepository.GetById(v.CountryId).Adapt<CountryLiteDto>(),
                    City = cityRepository.GetById(v.CityId).Adapt<CityLiteDto>()
                });

            return Ok(result);
        }

        [HttpGet("{id:guid}")]
        public IActionResult GetUserTourById(Guid id)
        {
            var userTour = userTourRepository.GetById(id);
            return Ok(userTour);
        }

        [HttpPost]
        public IActionResult AddUserTour([FromBody] AddUserTourDto userTourDto)
        {
            var userTour = userTourDto.Adapt<UserTour>();

            userTourRepository.Insert(userTour);
            return CreatedAtAction(nameof(GetUserTourById), new { id = userTour.Id }, userTour);
        }

        [HttpPut("{id:guid}")]
        public IActionResult UpdateUserTour(Guid id, UserTourUpdateDto userTour)
        {

            var userAndTour = userTourRepository.GetById(id);
            userAndTour.UserId = userTour.UserId;
            userAndTour.TourId = userTour.TourId;
            userAndTour.BookingDate = userTour.BookingDate;
            
            userTourRepository.Update(userAndTour);
            return NoContent();
        }

        [HttpDelete("{id:guid}")]
        public IActionResult DeleteUserTour(Guid id)
        {
            userTourRepository.Delete(id);
            return NoContent();
        }
    }
}