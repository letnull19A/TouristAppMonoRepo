using Microsoft.AspNetCore.Mvc;
using TouristCompany.Interfaces;
using TouristCompany.Models.DTOs;
using TouristCompany.Models.DTOs.TourPrice;
using TouristCompany.Models.Entities;

namespace TouristCompany.Controllers
{
    [Route("api/tour/{tourId:guid}/price")]
    [ApiController]
    public class TourPriceController(IRepository<TourPrice> tourPriceRepository)
        : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll(Guid tourId)
        {
            var result = tourPriceRepository.GetAll()
                .Where(u => u.TourId == tourId);
            return Ok(result);
        }

        [HttpGet("{priceId:guid}")]
        public IActionResult GetById(Guid tourId, Guid priceId)
        {
            var result = tourPriceRepository.GetAll()
                .FirstOrDefault(u => u.Id == tourId && u.TourId == priceId);
            return Ok(result);
        }

        [HttpPost()]
        public IActionResult Create(Guid tourId, [FromBody] TourPriceCreationDto tourCreation)
        {
            var tourPrice = new TourPrice
            {
                TourId = tourId,
                Price = tourCreation.Price,
                Days = tourCreation.Days
            };

            tourPriceRepository.Insert(tourPrice);

            return CreatedAtAction(nameof(Create), new { id = tourPrice.Id }, tourPrice);
        }

        [HttpPut("{priceId:guid}")]
        public IActionResult Edit(Guid tourId, Guid priceId, [FromBody] TourPriceUpdateDto tourPriceUpdateDto)
        {
            var result = tourPriceRepository.GetAll()
                .FirstOrDefault(u => u.Id == priceId && u.TourId == tourId);

            if (result == null) return NotFound();

            result.Price = tourPriceUpdateDto.Price;
            result.Days = tourPriceUpdateDto.Days;

            tourPriceRepository.Update(result);

            return NoContent();
        }

        [HttpDelete("{priceId:guid}")]
        public IActionResult Delete(Guid tourId, Guid priceId)
        {
            var result = tourPriceRepository.GetAll()
                .FirstOrDefault(u => u.Id == tourId && u.TourId == priceId);

            if (result == null) return NotFound();

            tourPriceRepository.Delete(priceId);

            return NoContent();
        }
    }
}