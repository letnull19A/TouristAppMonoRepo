using Microsoft.CodeAnalysis.Elfie.Extensions;
using Microsoft.EntityFrameworkCore;
using TouristCompany.Models.Entities;

namespace TouristCompany.Repositories;

public class CityRepository : BaseRepository<City>
{
    public CityRepository(DbContext context, DbSet<City> dbSet) : base(context, dbSet)
    {
    }
}