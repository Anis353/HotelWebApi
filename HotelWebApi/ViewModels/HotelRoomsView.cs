using System.ComponentModel.DataAnnotations;

namespace HotelWebApi.ViewModels
{
    public class HotelRoomsView
    {
        [Key]
        public int Id { get; set; }
        public string RoomType { get; set; }
        public int Price { get; set; }
        public int Floor { get; set; }
        public int Number { get; set; }
        public string State { get; set; }
    }
}
