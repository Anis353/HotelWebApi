using HotelWebApi.Models;
using HotelWebApi.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.PortableExecutable;

namespace HotelWebApi.Controllers
{
    [Route("api/[controller]")]
    public class EmployeesController : Controller
    {
        private Models.AppContext db;

        public EmployeesController(Models.AppContext db)
        {
            this.db = db;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("get")]
        public IEnumerable<EmployeesScheduleView> Get()
        {
            return db.EmployeesScheduleView;
        }

        [HttpPost]
        public IActionResult Post(EmployeesScheduleView scheduleView)
        {
            Employees employee = new();
            Persons person = new();
            CleaningSchedule schedule = new();
            
            person.Name = scheduleView.Name;
            person.Surname = scheduleView.Surname;
            person.Patronymic = scheduleView.Patronymic;
            db.Persons.Add(person);
            db.SaveChanges();

            employee.IdPerson = person.Id;
            employee.WorkState = "Работает";
            db.Employees.Add(employee);
            db.SaveChanges();
            
            schedule.DayOfWeek = scheduleView.DayOfWeek;
            schedule.IdFloor = scheduleView.FloorNumber;
            schedule.IdEmployee = employee.Id;
            db.CleaningSchedule.Add(schedule);
            db.SaveChanges();

            return Ok();

        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var schedule = db.CleaningSchedule.SingleOrDefault(x => x.Id == id);
            var employee = db.Employees.SingleOrDefault(x => x.Id == schedule.IdEmployee);
            var person = db.Persons.SingleOrDefault(x => x.Id == employee.IdPerson);

            if (schedule == null || employee == null)
            {
                return NotFound();
            }

            employee.WorkState = "Уволен";

            db.CleaningSchedule.Remove(schedule);
            db.Employees.Update(employee);
            db.SaveChanges();
            return Ok(employee);
        }
    }
}
