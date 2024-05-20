using Mapster;
using Microsoft.AspNetCore.Mvc;
using RestSharp;
using TouristCompany.Interfaces;
using TouristCompany.Models.DTOs.Lite;
using TouristCompany.Models.Entities;

namespace TouristCompany.Controllers;

[ApiController]
[Route("/api/search")]
public class SearchController(
    IConfiguration configuration,
    IRepository<Tour> tourRepository,
    IRepository<Country> countryRepository,
    IRepository<City> cityRepository,
    IRepository<Category> categoryRepository) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Search(string? search)
    {
        var tours = tourRepository.GetAll();
        var countries = countryRepository.GetAll();
        var cities = cityRepository.GetAll();
        var categories = categoryRepository.GetAll();

        var result = tours.Join(countries, u => u.CountryId, v => v.Id, (u, v) => new
        {
            Id = u.Id,
            Name = u.Name,
            Description = u.Description,
            CategoryId = u.CategoryId,
            CityId = u.CityId,
            Country = v.Adapt<CountryLiteDto>()
        }).Join(cities, t => t.CityId, p => p.Id, (t, p) => new
        {
            Id = t.Id,
            Name = t.Name,
            Description = t.Description,
            Country = t.Country,
            CategoryId = t.CategoryId,
            City = p.Adapt<CityLiteDto>()
        }).Join(categories, w => w.CategoryId, q => q.Id, (w, q) => new
        {
            w.Id,
            w.Description,
            w.Name,
            w.Country,
            w.City,
            Category = categoryRepository.GetById(w.CategoryId).Adapt<CategoryLiteDto>()
        });

        if (string.IsNullOrEmpty(search))
        {
            return Ok(result);
        }

        // var touristApiUrl = configuration["TicketsAPI"];
        //
        // var client = new RestClient(touristApiUrl);
        // var request = new RestRequest();
        // request.Method = Method.Get;
        //
        // var response = await client.ExecuteAsync(request);

        var searchResult = result.Where(o =>
            o.Description.Contains(search) || o.Name.Contains(search) || o.Category.Name.Contains(search) ||
            o.Country.Name.Contains(search) || o.City.Name.Contains(search));

        return Ok(searchResult);
    }
}