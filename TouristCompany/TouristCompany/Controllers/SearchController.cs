using Microsoft.AspNetCore.Mvc;
using TouristCompany.Interfaces;
using TouristCompany.Models.Entities;

namespace TouristCompany.Controllers;

[ApiController]
[Route("/api/search")]
public class SearchController(IRepository<Tour> tourRepository) : ControllerBase
{
    [HttpGet]
    public IActionResult Search(string search)
    {
        var result = tourRepository.GetAll().Where(i => i.Name.Contains(search)).ToList();
        
        return Ok(result);
    }
}