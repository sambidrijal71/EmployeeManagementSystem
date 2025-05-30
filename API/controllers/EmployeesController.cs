using API.data;
using API.dtos;
using API.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.controllers
{

    public class EmployeesController : BaseApiController
    {
        private readonly StoreContext _context;
        public EmployeesController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Employee>>> GetAllEmployees()
        {
            var employees = await _context.Employees.ToListAsync();
            if (employees == null) return NotFound();
            return Ok(employees);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null) return NotFound();
            return Ok(employee);

        }

        [HttpPost]
        public async Task<ActionResult> AddEmployee([FromBody] Employee employee)
        {
            var newEmployee = new Employee
            {
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                Email = employee.Email,
                DateOfJoining = employee.DateOfJoining,

            };
            await _context.AddAsync(newEmployee);
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return Created();
            return BadRequest();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> EditEmployeeDetails(int id, [FromBody] EmployeeDto employeeDto)
        {
            var existingEmployee = await _context.Employees.FirstOrDefaultAsync(eid => eid.Id == id);
            if (existingEmployee == null) return NotFound();

            existingEmployee.FirstName = employeeDto.FirstName;
            existingEmployee.LastName = employeeDto.LastName;
            existingEmployee.Email = employeeDto.Email;
            existingEmployee.DateOfJoining = employeeDto.DateOfJoining;

            var result = await _context.SaveChangesAsync() > 0;
            if (!result) return NotFound();
            return NoContent();

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Employee>> DeleteEmployee(int id)
        {
            var existingEmployee = await _context.Employees.FirstOrDefaultAsync(eid => eid.Id == id);
            if (existingEmployee == null) return NotFound();
            _context.Remove(existingEmployee);
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) return NotFound();
            return Ok();
        }
    }
}