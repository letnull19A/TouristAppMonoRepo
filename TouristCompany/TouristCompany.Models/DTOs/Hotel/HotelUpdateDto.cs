namespace TouristCompany.Models.DTOs.Hotel;

public sealed class HotelUpdateDto
{
    public Guid CityId { get; set; }
    public Guid CountryId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public float Rating { get; set; }
}