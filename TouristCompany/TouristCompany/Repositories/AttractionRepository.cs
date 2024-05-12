using Microsoft.EntityFrameworkCore;
using TouristCompany.Models.Entities;

namespace TouristCompany.Repositories;

public class AttractionRepository : BaseRepository<Attraction>
{
    public AttractionRepository(DbContext context, DbSet<Attraction> dbSet) : base(context, dbSet)
    {
    }

    public override void Insert(Attraction entity)
    {
        var city = _context.Set<City>().Find(entity.CityId);
        if (city == null)
            throw new ArgumentException("City does not exist.");

        base.Insert(entity);
    }
}