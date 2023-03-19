namespace HotelWebApi.Models
{
    public class CleaningSchedule
    {
        public int Id { get; set; }
        public string DayOfWeek { get; set; }
        public int IdEmployee { get; set; }
        public int IdFloor { get; set; }
    }
}
