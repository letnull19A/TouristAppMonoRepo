using Microsoft.EntityFrameworkCore;
using TouristCompany.Models.Entities;

namespace TouristCompany.Repositories;

public class UserRepository : BaseRepository<User>
{
    public UserRepository(DbContext context, DbSet<User> dbSet) : base(context, dbSet)
    {
    }
}