using HotelWebApi.Models;
using HotelWebApi.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace HotelWebApi.Controllers
{
    [Route("api/[controller]")]
    public class RoomsController : Controller
    {
        private Models.AppContext db;

        public RoomsController(Models.AppContext db)
        {
            this.db = db;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("get")]
        public IEnumerable<HotelRoomsView> Get()
        {
            return db.HotelRoomsView;
        }
    }
}
