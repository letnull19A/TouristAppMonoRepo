using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TouristCompany.Models.Entities;

[Table("categories")]
public sealed class Category
{
    [Key] 
    [Column("id")]
    [Required(ErrorMessage = "id не определён")]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    [MaxLength(50)]
    [Column("name")]
    public string Name { get; set; } = string.Empty;

    [MaxLength(200)]
    [Column("description")]
    public string Description { get; set; } = string.Empty;
}