using Microsoft.AspNetCore.Mvc;
using Mapster;
using TouristCompany.Interfaces;
using TouristCompany.Models.DTOs;
using TouristCompany.Models.DTOs.Country;
using TouristCompany.Models.Entities;

namespace TouristCompany.Controllers
{
    [ApiController]
    [Route("api/country")]
    public class CountryController(IRepository<Country> countryRepository) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAllCountries()
        {
            var countries = countryRepository.GetAll();
            return Ok(countries);
        }

        [HttpGet("{id:guid}")]
        public IActionResult GetCountryById(Guid id)
        {
            var country = countryRepository.GetById(id);
            return Ok(country);
        }

        [HttpPost]
        public IActionResult AddCountry([FromBody] CountryCreationDto countryDto)
        {
            var country = countryDto.Adapt<Country>();
            
            countryRepository.Insert(country);
            return CreatedAtAction(nameof(GetCountryById), new { id = country.Id }, country);
        }

        [HttpPut("{id:guid}")]
        public IActionResult UpdateCountry(Guid id, [FromBody] CountryUpdateDto countryUpdateDto)
        {
            var country = countryRepository.GetById(id);

            country.Description = countryUpdateDto.Description;
            country.Name = countryUpdateDto.Name;
            
            countryRepository.Update(country);
            return NoContent();
        }

        [HttpDelete("{id:guid}")]
        public IActionResult DeleteCountry(Guid id)
        {
            countryRepository.Delete(id);
            return NoContent();
        }
    }
}