using Microsoft.EntityFrameworkCore;
using TouristCompany.Models.Entities;

namespace TouristCompany.Repositories;

public class CategoryRepository : BaseRepository<Category>
{
    public CategoryRepository(DbContext context, DbSet<Category> dbSet) : base(context, dbSet)
    {
    }
}