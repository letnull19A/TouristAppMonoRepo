using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestSharp;
using TouristCompany.Interfaces;
using TouristCompany.Models.DTOs.Lite;
using TouristCompany.Models.Entities;

namespace TouristCompany.Controllers;

public class Ticket
{
    public int Id { get; set; }
    public int AirportId { get; set; }
    public int CountryDistanation { get; set; }
}

public class CountryFromApi
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
}

public class Airport
{
    public int Id { get; set; }
    public int CountryId { get; set; }
    public string City { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
}

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
    public async Task<IActionResult> Search(string? search, int airportId, string dateOfDeparture, string dateOfArrival)
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
        }).ToList();

        if (string.IsNullOrEmpty(search))
        {
            return Ok(result);
        }

        var tickets = GetTicketsByAirportId(airportId);
        var countriesApi = GetAllCounties().Result;
        var airportsApi = GetAllAirports().Result;

        if (tickets.Count == 0)
        {
            return NotFound();
        }

        var c = tickets.Join(countriesApi, u => u.CountryDistanation, v => v.Id, (u, v) => new
        {
            TicketId = u.Id,
            AirportId = u.AirportId,
            CountryName = v.Name,
        }).Join(airportsApi, t => t.AirportId, q => q.Id, (t, q) => new
        {
            City = q.City,
            AirportName = q.Name,
            t.AirportId,
            t.CountryName,
            t.TicketId
        }).ToList();

        var searchResult = result.Where(o =>
            o.Description.Contains(search) || o.Name.Contains(search));

        var readyResult = searchResult
            .Join(c,
                u => u.Country.Name,
                t => t.CountryName,
                (u, t) => new
                {
                    u.Country,
                    u.Description,
                    u.Name,
                    u.Category,
                    u.City,
                    u.Id,
                    t.AirportId,
                    t.CountryName,
                    AirportCity = t.City
                });

        return Ok(readyResult);
    }

    private async Task<List<Ticket>> GetAllTickets()
    {
        var touristApiUrl = configuration["TicketsAPI"];

        var client = new RestClient(touristApiUrl + $"/tickets");
        var request = new RestRequest
        {
            Method = Method.Get
        };

        return (await client.ExecuteAsync<List<Ticket>>(request)).Data;
    }

    private async Task<List<CountryFromApi>> GetAllCounties()
    {
        var touristApiUrl = configuration["TicketsAPI"];

        var client = new RestClient(touristApiUrl + $"/countries");
        var request = new RestRequest
        {
            Method = Method.Get
        };

        return (await client.ExecuteAsync<List<CountryFromApi>>(request)).Data;
    }

    private List<Ticket> GetTicketsByAirportId(int id)
    {
        var tickets = GetAllTickets().Result;

        return tickets.Where(i => i.AirportId == id).ToList();
    }

    private async Task<List<Airport>> GetAllAirports()
    {
        var touristApiUrl = configuration["TicketsAPI"];

        var client = new RestClient(touristApiUrl + $"/airports");
        var request = new RestRequest
        {
            Method = Method.Get
        };

        return (await client.ExecuteAsync<List<Airport>>(request)).Data;
    }
}