using System.ComponentModel.DataAnnotations.Schema;
using TouristCompany.Models.Abstract;

namespace TouristCompany.Models.Entities;

[Table("tours")]
public sealed class Tour : BaseEntity
{
    [Column("category_id")]
    public Guid CategoryId { get; set; }
    public Category Category { get; set; }

    [Column("city_id")]
    public Guid CityId { get; set; }
    public City City { get; set; }

    [Column("country_id")] 
    public Guid CountryId { get; set; }
    public Country CountryApi { get; set; }
}