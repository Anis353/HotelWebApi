using Microsoft.AspNetCore.Mvc;
using HotelWebApi.ViewModels;

namespace HotelWebApi.Controllers
{
    [Route("api/[controller]")]
    public class HistoryController : Controller
    {
        private Models.AppContext db;

        public HistoryController(Models.AppContext db) 
        {
            this.db = db;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("get")]
        public IEnumerable<HistoryHotelAccommodationView> Get()
        {
            return db.HistoryHotelAccommodationView;
        }

    }
}
