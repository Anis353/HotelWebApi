using Azure.Core.Pipeline;
using System.ComponentModel.DataAnnotations;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using System.ComponentModel.DataAnnotations.Schema;

namespace HotelWebApi.Models
{
    public class HistoryHotelAccommodation
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int IdClient { get; set; }
        public int IdHotelRoom { get; set; }
        public int IdCity { get; set; }
        public DateTime RegistrationDate { get; set; }
        public int Duration { get; set; }

        [ForeignKey("IdClient")]
        public Clients? Clients { get; set; } 

    }
}
