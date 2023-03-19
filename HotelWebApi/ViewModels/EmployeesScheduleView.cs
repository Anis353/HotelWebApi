using System.ComponentModel.DataAnnotations;

namespace HotelWebApi.ViewModels
{
    public class EmployeesScheduleView
    {
        [Key]
        public int Id { get; set; }
        public string Surname { get; set; }
        public string Name { get; set; }
        public string Patronymic { get; set; }
        public int FloorNumber { get; set; }
        public string DayOfWeek { get; set; }

    }
}
