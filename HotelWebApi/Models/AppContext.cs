using HotelWebApi.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace HotelWebApi.Models
{
    public class AppContext : DbContext
    {
        public DbSet<Clients> Clients { get; set; }
        public DbSet<Employees> Employees { get; set; }
        public DbSet<CleaningSchedule> CleaningSchedule { get; set; }
        public DbSet<HistoryHotelAccommodation> HistoryHotelAccommodation { get; set; }
        public DbSet<HotelRooms> HotelRooms { get; set; }
        public DbSet<Persons> Persons { get; set; }
        public DbSet<Cities> Cities { get; set; }

        // Views
        public DbSet<ClientsView> ClientsView { get; set; }
        public DbSet<HistoryHotelAccommodationView> HistoryHotelAccommodationView { get; set; }
        public DbSet<HotelRoomsView> HotelRoomsView { get; set; }
        public DbSet<EmployeesScheduleView> EmployeesScheduleView { get; set; }
       

        public AppContext(DbContextOptions<AppContext> options)
            : base(options)
        {
            Database.EnsureCreated();   
        }
    }
}
