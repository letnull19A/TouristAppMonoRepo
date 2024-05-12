using Microsoft.AspNetCore.Mvc;
using Mapster;
using TouristCompany.Interfaces;
using TouristCompany.Models.DTOs;
using TouristCompany.Models.DTOs.Hotel;
using TouristCompany.Models.DTOs.Lite;
using TouristCompany.Models.Entities;

namespace TouristCompany.Controllers;

[ApiController]
[Route("api/hotel")]
public class HotelController(
    IRepository<Hotel> hotelRepository,
    IRepository<City> cityRepository,
    IRepository<Country> countryRepository) : ControllerBase
{
    [HttpGet]
    public IActionResult GetAllHotels()
    {
        var hotels = hotelRepository.GetAll();
        var cities = cityRepository.GetAll();

        var result = hotels.Join(
            cities,
            u => u.CityId,
            v => v.Id,
            (u, v) => new
            {
                Id = u.Id,
                Name = u.Name,
                Description = u.Description,
                Rating = u.Rating,
                City = new
                {
                    Id = u.CityId,
                    Name = v.Name,
                },
                Country = new
                {
                    Id = v.CountryId,
                    Name = countryRepository.GetById(v.CountryId).Name,
                }
            });

        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    public IActionResult GetHotelById(Guid id)
    {
        var hotel = hotelRepository.GetById(id);
        var city = cityRepository.GetById(hotel.CityId);
        var country = countryRepository.GetById(city.CountryId);

        var result = new
        {
            Id = hotel.Id,
            Description = hotel.Description,
            Name = hotel.Name,
            Rating = hotel.Rating,
            City = city.Adapt<CityLiteDto>(),
            Country = country.Adapt<CountryLiteDto>()
        };

        return Ok(result);
    }

    [HttpPost]
    public IActionResult AddHotel([FromBody] HotelCreatingDto hotelDto)
    {
        var hotel = hotelDto.Adapt<Hotel>();

        hotelRepository.Insert(hotel);
        return CreatedAtAction(nameof(GetHotelById), new { id = hotel.Id }, hotel);
    }

    [HttpPut("{id:guid}")]
    public IActionResult UpdateHotel(Guid id, [FromBody] HotelUpdateDto hotel)
    {
        var currentHotel = hotelRepository.GetById(id);

        currentHotel.Description = hotel.Description;
        currentHotel.Name = hotel.Name;
        currentHotel.CityId = hotel.CityId;
        currentHotel.Rating = hotel.Rating;
        
        hotelRepository.Update(currentHotel);
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    public IActionResult DeleteHotel(Guid id)
    {
        hotelRepository.Delete(id);
        return NoContent();
    }
}