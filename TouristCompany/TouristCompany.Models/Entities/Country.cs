using System.ComponentModel.DataAnnotations.Schema;
using TouristCompany.Models.Abstract;

namespace TouristCompany.Models.Entities;

[Table("countries")]
public sealed class Country : BaseEntity { }