using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TouristCompany.Models.Entities;

[Table("orders")]
public class Order
{
    [Key]
    [Required]
    [Column("id")]
    public Guid Id { get; set; } = Guid.NewGuid();
    
    [Required]
    [Column("user_id")]
    public Guid UserId { get; set; }
    public User User { get; set; }
    
    [Required]
    [Column("tour_id")]
    public Guid TourId { get; set; }
    public Tour Tour { get; set; }
    
    [Required]
    [Column("date")]
    public long Date { get; set; }

    [Required]
    [Column("status")]
    public string Status { get; set; } = "AWAIT";
}