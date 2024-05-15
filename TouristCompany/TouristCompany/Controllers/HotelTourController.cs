using Microsoft.AspNetCore.Mvc;
using TouristCompany.Interfaces;
using TouristCompany.Models.DTOs.HotelTour;
using TouristCompany.Models.Entities;

namespace TouristCompany.Controllers
{
    [Route("api/tour/{tourId:guid}/hotel")]
    [ApiController]
    public class HotelTourController(IRepository<HotelTour> hotelTourRepository) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll(Guid tourId)
        {
            var result = hotelTourRepository.GetAll()
                .Where(u => u.TourId == tourId);

            return Ok(result);
        }

        [HttpGet("{hotelId:guid}")]
        public IActionResult GetById(Guid tourId, Guid hotelId)
        {
            var result = hotelTourRepository.GetAll()
                .FirstOrDefault(u => u.TourId == tourId && u.HotelId == hotelId);

            return Ok(result);
        }

        [HttpPost("{hotelId:guid}")]
        public IActionResult Create(Guid tourId, Guid hotelId)
        {
            var hotelTour = new HotelTour()
            {
                HotelId = hotelId,
                TourId = tourId
            };

            hotelTourRepository.Insert(hotelTour);

            return CreatedAtAction(nameof(Create), new { id = hotelTour.Id }, hotelTour);
        }

        [HttpPut("{hotelId:guid}")]
        public IActionResult Edit(Guid hotelId, Guid tourId, [FromBody] HotelTourUpdateDto newHotelId)
        {
            var result = hotelTourRepository.GetAll()
                .FirstOrDefault(u => u.TourId == tourId && u.HotelId == hotelId);

            if (result == null) return NotFound("hotel and tour record not found");

            result.HotelId = newHotelId.NewHotelId;

            hotelTourRepository.Update(result);

            return NoContent();
        }

        [HttpDelete("{hotelId:guid}")]
        public IActionResult Delete(Guid hotelId, Guid tourId)
        {
            var result = hotelTourRepository.GetAll()
                .FirstOrDefault(u => u.TourId == tourId && u.HotelId == hotelId);

            if (result == null) return NotFound();

            hotelTourRepository.Delete(result.Id);

            return NoContent();
        }
    }
}