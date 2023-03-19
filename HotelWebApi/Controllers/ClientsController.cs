using HotelWebApi.Models;
using HotelWebApi.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.ClearScript.JavaScript;
using Microsoft.EntityFrameworkCore.Query.Internal;
using System.Reflection.Metadata.Ecma335;

namespace HotelWebApi.Controllers
{
    [Route("api/[controller]")]
    public class ClientsController : Controller
    {
        private Models.AppContext db;
        public ClientsController(Models.AppContext db)
        {
            this.db = db;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("get")]
        public IEnumerable<ClientsView> Get()
        {
            return db.ClientsView;
        }

        [HttpPost]
        public IActionResult Post(ClientsView clientView)
        {
            Clients client = new Clients();
            Persons person = new Persons();

            var room = GetRoom(clientView.RoomNumber);

            if (room == null)
            {
                return NotFound();
            }

            person.Surname = clientView.Surname;
            person.Name = clientView.Name;
            person.Patronymic = clientView.Patronymic;
            db.Persons.Add(person);
            // Генерация Id для Foreign key
            db.SaveChanges();

            client.Passport = clientView.Passport;
            client.IdPerson = person.Id;

            db.Clients.Add(client);
            db.SaveChanges();

            HistoryAdd(clientView, client, room);
            return Ok(client);
        }

        [HttpGet("search/{passport}")]
        public ClientsView Search (string passport)
        {
            return db.ClientsView.FirstOrDefault(x => x.Passport == passport);
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var client = db.Clients.SingleOrDefault(x => x.Id == id);
            var history = db.HistoryHotelAccommodation.Single(x => x.IdClient == id);
            var hotel = db.HotelRooms.FirstOrDefault(x => x.Id == history.IdHotelRoom);

            if (client == null)
            {
                return NotFound();
            }

            hotel.State = "Свободно";

            db.Clients.Remove(client);
            db.HistoryHotelAccommodation.Remove(history);
            db.HotelRooms.Update(hotel);
            db.SaveChanges();
            return Ok(client);
        }

        private HotelRooms GetRoom(int? number)
        {
            var room = db.HotelRooms.SingleOrDefault(x => x.Number == number);

            if (room.State == "Свободно")
            {
                room.State = "Занято";
                db.HotelRooms.Update(room);
            }
            else
                room = null;

            return room;
        }

        private void HistoryAdd(ClientsView clientView, Clients client, HotelRooms room)
        {
            HistoryHotelAccommodation history = new();
            Cities city = db.Cities.SingleOrDefault(x => x.Name == clientView.City);

            if (city == null)
            {
                city = new();
                city.Name = clientView.City;
                db.Cities.Add(city);
                db.SaveChanges();
            }

            history.IdClient = client.Id;
            history.Duration = clientView.Duration;
            history.RegistrationDate = DateTime.Now;
            history.IdHotelRoom = room.Id;
            history.IdCity = city.Id;
            history.Clients = client;

            db.HistoryHotelAccommodation.Add(history);
            db.SaveChanges();
        }
    }
}