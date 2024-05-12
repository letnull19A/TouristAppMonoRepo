using System.ComponentModel.DataAnnotations.Schema;
using TouristCompany.Models.Abstract;

namespace TouristCompany.Models.Entities;

[Table("cities")]
public sealed class City : BaseEntity
{
    [Column("country_id")]
    public Guid CountryId { get; set; }
    
    public Country Country { get; set; }
}