using Microsoft.EntityFrameworkCore;
using TouristCompany.Models.Entities;

namespace TouristCompany.Repositories;

public class RoleRepository(DbContext context, DbSet<Role> dbSet) : BaseRepository<Role>(context, dbSet);