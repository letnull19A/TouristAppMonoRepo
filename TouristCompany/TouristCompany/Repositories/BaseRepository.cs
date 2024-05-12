using Microsoft.EntityFrameworkCore;
using TouristCompany.Interfaces;

namespace TouristCompany.Repositories;

public class BaseRepository<T> : IRepository<T> where T : class
{
    protected readonly DbContext _context;
    protected readonly DbSet<T> _dbSet;

    public BaseRepository(DbContext context, DbSet<T> dbSet)
    {
        (_context, _dbSet) = (context, dbSet);
    }

    public virtual IEnumerable<T> GetAll()
    {
        return _dbSet.ToList();
    }

    public virtual T GetById(Guid id)
    {
        return _dbSet.Find(id);
    }

    public virtual void Insert(T entity)
    {
        _dbSet.Add(entity);
        _context.SaveChanges();
    }

    public virtual void Update(T entity)
    {
        _dbSet.Attach(entity);
        _context.Entry(entity).State = EntityState.Modified;
        _context.SaveChanges();
    }

    public virtual void Delete(Guid id)
    {
        var entity = _dbSet.Find(id);
        if (entity == null)
            return;

        _dbSet.Remove(entity);
        _context.SaveChanges();
    }
}