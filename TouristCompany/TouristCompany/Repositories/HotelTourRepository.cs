using Microsoft.EntityFrameworkCore;
using TouristCompany.Models.Entities;

namespace TouristCompany.Repositories;

public class HotelTourRepository(DbContext context, DbSet<HotelTour> dbSet) : BaseRepository<HotelTour>(context, dbSet);