namespace TouristCompany.Models.DTOs.City;

public sealed class CityUpdateDto
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public Guid CountryId { get; set; }
}