using System.ComponentModel.DataAnnotations.Schema;

namespace TouristCompany.Models.Entities;

[Table("roles")]
public sealed class Role
{
    [Column("id")]
    public Guid Id { get; set; }
    
    [Column("name")]
    public string Name { get; set; } = string.Empty;
}