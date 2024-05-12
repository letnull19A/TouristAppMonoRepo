using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TouristCompany.Models.Entities;

[Table("tour_prices")]
public sealed class TourPrice
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
    [Column("price")]
    public decimal Price { get; set; }
    
    [Required]
    [Column("days")]
    public int Days { get; set; }
}