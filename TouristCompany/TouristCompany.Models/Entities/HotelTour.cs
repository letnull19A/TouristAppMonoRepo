using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TouristCompany.Models.Entities;

[Table("tour_hotel")]
public sealed class HotelTour
{
    [Key]
    [Required]
    [Column("id")]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    [Column("tour_id")]
    public Guid TourId { get; set; }
    public Tour Tour { get; set; }
    
    [Required]
    [Column("hotel_id")]
    public Guid HotelId { get; set; }
    public Hotel Hotel { get; set; }
}