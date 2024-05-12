namespace TouristCompany.Models.DTOs;

public sealed class HotelCreatingDto : BaseDto
{
    public Guid CityId { get; set; }
    public float Rating { get; set; } = 0;
}