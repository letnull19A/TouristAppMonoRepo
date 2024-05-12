using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TouristCompany.Models.Entities;

[Table("users")]
public sealed class User
{
    [Key] 
    [Column("id")] 
    public Guid Id { get; set; } = Guid.NewGuid();
    
    [Required]
    [Column("role_id")]
    public Guid RoleId { get; set; }
    public Role Role { get; set; }

    [Required]
    [MaxLength(16)]
    [Column("first_name")]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    [MaxLength(16)]
    [Column("last_name")]
    public string LastName { get; set; } = string.Empty;

    [MaxLength(16)]
    [Column("patronymic")]
    public string? Patronymic { get; set; } = string.Empty;

    [Required]
    [MaxLength(32)]
    [EmailAddress]
    [Column("email")]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MaxLength(64)]
    [MinLength(8)]
    [Column("password")]
    public string Password { get; set; } = string.Empty;
}