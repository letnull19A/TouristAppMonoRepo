namespace TouristCompany.Models.DTOs;

public sealed class AuthDto
{
    public string Login { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}