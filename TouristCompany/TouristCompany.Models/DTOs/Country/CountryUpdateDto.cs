namespace TouristCompany.Models.DTOs.Country;

public sealed class CountryUpdateDto
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}