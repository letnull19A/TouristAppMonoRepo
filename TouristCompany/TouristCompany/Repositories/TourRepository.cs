using Microsoft.EntityFrameworkCore;
using TouristCompany.Models.Entities;

namespace TouristCompany.Repositories;

public sealed class TourRepository(DbContext context, DbSet<Tour> dbSet) : BaseRepository<Tour>(context, dbSet)
{
    public override void Insert(Tour entity)
    {
        var country = _context.Set<Country>().Find(entity.CountryId);
        if (country == null)
            throw new ArgumentException("Country does not exist.");
        
        var city = _context.Set<City>().Find(entity.CityId);
        if (city == null)
            throw new ArgumentException("City does not exist.");

        var category = _context.Set<Category>().Find(entity.CategoryId);
        if (category == null)
            throw new ArgumentException("Category does not exist.");

        base.Insert(entity);
    }
}