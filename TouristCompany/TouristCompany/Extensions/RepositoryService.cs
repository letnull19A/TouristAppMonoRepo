using TouristCompany.Contexts;
using TouristCompany.Interfaces;

namespace TouristCompany.Extensions;

public static class RepositoryService
{
    public static IServiceCollection AddRepository<TU, TV>(this IServiceCollection services) 
        where TU : class 
        where TV : class, IRepository<TU>
    {
        services.AddScoped<IRepository<TU>, TV>(options =>
        {
            var dbContext = options.GetRequiredService<TouristDbContext>();
            var args = new object[] { dbContext, dbContext.Set<TU>() };
            return (TV)Activator.CreateInstance(typeof(TV), args)! 
                   ?? throw new InvalidOperationException();
        });
        
        return services;
    }
}