using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HotelWebApi.ViewModels
{
    public class ClientsView
    {
        [Key]
        public int Id { get; set; }
        public string Surname { get; set; }
        public string Name { get; set; }
        public string Patronymic { get; set; }
        public string Passport { get; set; }

        [NotMapped]
        public int RoomNumber { get; set; }
        [NotMapped]
        public string City { get; set; }
        [NotMapped]
        public int Duration { get; set; }

    }
}
