namespace TouristCompany.Models.DTOs;

public sealed class CityCreationDto : BaseDto
{
    public Guid CountryId { get; set; }
}