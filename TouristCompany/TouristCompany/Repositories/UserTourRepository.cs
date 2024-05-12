using Microsoft.EntityFrameworkCore;
using TouristCompany.Models.Entities;

namespace TouristCompany.Repositories;

public class UserTourRepository : BaseRepository<UserTour>
{
    public UserTourRepository(DbContext context, DbSet<UserTour> dbSet) : base(context, dbSet)
    {
    }
}