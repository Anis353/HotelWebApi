using System.ComponentModel.DataAnnotations;

namespace HotelWebApi.ViewModels
{
    public class HistoryHotelAccommodationView
    {
        [Key]
        public int Id { get; set; }
        public string Client { get; set; }
        public string Passport { get; set; }
        public int Floor { get; set; }
        public int RoomNumber { get; set; }
        public string City { get; set; }
        public DateTime RegistrationDate { get; set; }
        public int Duration { get; set; }
    }
}
