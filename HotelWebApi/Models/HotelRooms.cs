using System.ComponentModel.DataAnnotations;

namespace HotelWebApi.Models
{
    public class HotelRooms
    {
        [Key]
        public int Id { get; set; }
        public int IdTypeHotelRoom { get; set; }
        public int CountRooms { get; set; }
        public int IdFloor { get; set; }
        public int Number { get; set; }
        public int Price { get; set; }
        public string State { get; set; }
    }
}
