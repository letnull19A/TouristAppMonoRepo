using System.ComponentModel.DataAnnotations;

namespace TouristCompany.Models.DTOs
{
    public sealed class AddUserTourDto
    {
        [Required]
        public Guid UserId { get; set; }

        [Required]
        public Guid TourId { get; set; }

        [Required]
        public DateOnly BookingDate { get; set; }
    }
}