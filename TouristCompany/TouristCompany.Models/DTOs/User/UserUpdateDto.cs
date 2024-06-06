namespace TouristCompany.Models.DTOs.User;

public sealed class UserUpdateDto
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string? Patronymic { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
}