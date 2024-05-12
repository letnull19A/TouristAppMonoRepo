using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TouristCompany.Models.Entities;

[Table("user_tours")]
public sealed class UserTour
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Column("user_id")]
    public Guid UserId { get; set; }
    public User User { get; set; }

    [Column("tour_id")]
    public Guid TourId { get; set; }
    public Tour Tour { get; set; }

    [Column("booking_date")]
    public DateOnly BookingDate { get; set; }
}