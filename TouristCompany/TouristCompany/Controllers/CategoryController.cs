using Mapster;
using Microsoft.AspNetCore.Mvc;
using TouristCompany.Interfaces;
using TouristCompany.Models.DTOs;
using TouristCompany.Models.Entities;

namespace TouristCompany.Controllers
{
    [ApiController]
    [Route("api/category")]
    public class CategoryController(IRepository<Category> categoryRepository) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAllCategories()
        {
            var categories = categoryRepository.GetAll();
            return Ok(categories);
        }

        [HttpGet("{id:guid}")]
        public IActionResult GetCategoryById(Guid id)
        {
            var category = categoryRepository.GetById(id);

            return Ok(category);
        }

        [HttpPost]
        public IActionResult AddCategory([FromBody] CategoryCreationDto categoryDto)
        {
            var category = categoryDto.Adapt<Category>();
            
            categoryRepository.Insert(category);
            return CreatedAtAction(nameof(GetCategoryById), new { id = category.Id }, category);
        }

        [HttpPut("{id:guid}")]
        public IActionResult UpdateCategory(Guid id, [FromBody] CategoryCreationDto categoryDto)
        {

            var category = categoryDto.Adapt<Category>();
            category.Id = id;
            
            categoryRepository.Update(category);
            return NoContent();
        }

        [HttpDelete("{id:guid}")]
        public IActionResult DeleteCategory(Guid id)
        {
            categoryRepository.Delete(id);
            return NoContent();
        }
    }
}