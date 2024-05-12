using Microsoft.EntityFrameworkCore;
using TouristCompany.Models.Entities;

namespace TouristCompany.Repositories;

public class CountryRepository : BaseRepository<Country>
{
    public CountryRepository(DbContext context, DbSet<Country> dbSet) : base(context, dbSet)
    {
    }
}