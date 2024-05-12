using Microsoft.EntityFrameworkCore;
using TouristCompany.Models.Entities;

namespace TouristCompany.Repositories;

public sealed class TourPriceRepository(DbContext context, DbSet<TourPrice> dbSet)
    : BaseRepository<TourPrice>(context, dbSet)
{
    public override void Insert(TourPrice entity)
    {
        var tour = _context.Set<Tour>().Find(entity.TourId);
        if (tour == null)
            throw new ArgumentException("TourPrice does not exist.");

        base.Insert(entity);
    }
}