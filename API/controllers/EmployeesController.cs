using System.Net;
using API.data;
using API.dtos;
using API.helper;
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
            if (employee == null) return NotFound(BuildErrorWithContext(ErrorTemplates.NotFound($"Employee with Id #{id} does not exist.")));
            return Ok(employee);
        }

        [HttpPost]
        public async Task<ActionResult> AddEmployee([FromBody] EmployeeDto employeeDto)
        {
            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }
            var existingEmployeeEmail = await _context.Employees.FirstOrDefaultAsync(x => x.Email == employeeDto.Email);
            if (existingEmployeeEmail != null) return BadRequest(BuildErrorWithContext(ErrorTemplates.BadRequest($"Email '{employeeDto.Email}' already exists.")));
            var newEmployee = new Employee
            {
                FirstName = employeeDto.FirstName,
                LastName = employeeDto.LastName,
                Email = employeeDto.Email,
                DateOfJoining = employeeDto.DateOfJoining,

            };
            await _context.AddAsync(newEmployee);
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return CreatedAtAction(nameof(GetEmployee), new { id = newEmployee.Id }, newEmployee);
            return BadRequest(BuildErrorWithContext(ErrorTemplates.BadRequest("Unable to add the employee. Please check the request.")));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> EditEmployeeDetails(int id, [FromBody] EmployeeDto employeeDto)
        {
            var existingEmployee = await _context.Employees.FirstOrDefaultAsync(eid => eid.Id == id);
            if (existingEmployee == null) return NotFound(BuildErrorWithContext(ErrorTemplates.NotFound("Employee does not exist. Please create an employee.")));

            existingEmployee.FirstName = employeeDto.FirstName;
            existingEmployee.LastName = employeeDto.LastName;
            existingEmployee.Email = employeeDto.Email;
            existingEmployee.DateOfJoining = employeeDto.DateOfJoining;

            var result = await _context.SaveChangesAsync() > 0;
            if (!result) return BadRequest(BuildErrorWithContext(ErrorTemplates.BadRequest("Unable to edit the employee. Please check the request.")));
            return NoContent();

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Employee>> DeleteEmployee(int id)
        {
            var existingEmployee = await _context.Employees.FirstOrDefaultAsync(eid => eid.Id == id);
            if (existingEmployee == null) return NotFound();
            _context.Remove(existingEmployee);
            var result = await _context.SaveChangesAsync() > 0;
            if (!result) return NotFound("Unable to delete the employee.Please check the request.");
            return Ok();
        }
    }
}