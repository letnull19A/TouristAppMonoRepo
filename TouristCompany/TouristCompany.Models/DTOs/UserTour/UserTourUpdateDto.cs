namespace TouristCompany.Models.DTOs.UserTour;

public sealed class UserTourUpdateDto
{
    public Guid UserId { get; set; }
    public Guid TourId { get; set; }
    public DateOnly BookingDate { get; set; }
}