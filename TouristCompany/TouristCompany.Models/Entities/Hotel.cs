using System.ComponentModel.DataAnnotations.Schema;
using TouristCompany.Models.Abstract;

namespace TouristCompany.Models.Entities;

[Table("hotels")]
public sealed class Hotel : BaseEntity
{
    [Column("rating")] 
    public float Rating { get; set; } = 0;

    [Column("city_id")] 
    public Guid CityId { get; set; }
    public City City { get; set; }
}