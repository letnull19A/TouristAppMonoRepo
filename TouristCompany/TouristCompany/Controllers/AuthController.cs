﻿using Microsoft.AspNetCore.Mvc;
using TouristCompany.Interfaces;
using Mapster;
using Microsoft.EntityFrameworkCore;
using TouristCompany.Contexts;
using TouristCompany.Models.DTOs;
using TouristCompany.Models.Entities;

namespace TouristCompany.Controllers
{
    // 0fe41223-993b-4df4-b222-e9aa4b5824b4 - Пользователь
    // a76182e2-7f23-4575-907c-289cbb103ba2 - Администратор
    [ApiController]
    [Route("api/auth")]
    public class AuthController(TouristDbContext context, IRepository<Role> roleRepository) : ControllerBase
    {
        [HttpPost]
        public IActionResult Authenticate([FromBody] AuthDto auth)
        {
            var result = context.Users
                .FirstOrDefault(o =>
                    (o.Email == auth.Login || o.Login == auth.Login) &&
                    o.Password == auth.Password);

            if (result == null) return NotFound();

            return Ok(new
            {
                result.Id,
                result.Email,
                result.FirstName,
                result.LastName,
                result.Patronymic,
                Role = roleRepository.GetById(result.RoleId).Name
            });
        }
    }
}