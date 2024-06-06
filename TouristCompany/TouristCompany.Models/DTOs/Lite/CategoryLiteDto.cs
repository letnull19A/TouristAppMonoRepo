namespace TouristCompany.Models.DTOs.Lite;

public class CategoryLiteDto
{
    public Guid Id { get; set;  }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}