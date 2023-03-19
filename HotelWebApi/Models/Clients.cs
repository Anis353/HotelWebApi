using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HotelWebApi.Models
{
    public class Clients
    {
        [Key]
        public int Id { get; set; }
        public int IdPerson { get; set; }
        public string Passport { get; set; }

        [ForeignKey("Id")]
        public List<HistoryHotelAccommodation> HistoryHotelAccommodations { get; set; } = new();
  
    }
}
