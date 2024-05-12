using Microsoft.EntityFrameworkCore;
using TouristCompany.Models.Entities;

namespace TouristCompany.Repositories;

public class HotelRepository : BaseRepository<Hotel>
{
    public HotelRepository(DbContext context, DbSet<Hotel> dbSet) : base(context, dbSet)
    {
    }

    public override void Insert(Hotel entity)
    {
        var city = _context.Set<City>().Find(entity.CityId);
        if (city == null)
            throw new ArgumentException("City does not exist.");

        base.Insert(entity);
    }
}