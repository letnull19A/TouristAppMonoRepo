using System.ComponentModel.DataAnnotations.Schema;
using TouristCompany.Models.Abstract;

namespace TouristCompany.Models.Entities;

[Table("attractions")]
public sealed class Attraction : BaseEntity
{
    [Column("city_id")]
    public Guid CityId { get; set; }
    public City? City { get; set; }
}