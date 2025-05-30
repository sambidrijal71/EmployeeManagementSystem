using System.ComponentModel.DataAnnotations;
using API.controllers;
using API.data;
using API.dtos;
using API.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace EmployeeManagement.Tests.Services
{
    public class EmployeeServiceTests
    {
        private readonly StoreContext _context;
        private readonly EmployeesController _controller;
        public EmployeeServiceTests()
        {
            var options = new DbContextOptionsBuilder<StoreContext>()
       .UseInMemoryDatabase(Guid.NewGuid().ToString()) // Ensures isolation
       .Options;
            _context = new StoreContext(options);
            _context.Database.EnsureCreated();

            _controller = new EmployeesController(_context);

            // Seed data if necessary
            if (!_context.Employees.Any())
            {
                var employees = new List<Employee>
                {
                   new Employee {
                    Id = 1,
                    FirstName = "John",
                    LastName = "Doe",
                    Email = "john.doe@test.com",
                    DateOfJoining = new System.DateTime(2023, 1, 1)
                },
               new Employee {
                    Id = 2,
                    FirstName = "Amber",
                    LastName = "Cool",
                    Email = "ambercool@test.com",
                    DateOfJoining = new System.DateTime(2023, 1, 1)
                }
                };
                foreach (var employee in employees)
                {
                    _context.Employees.Add(employee);
                }
                _context.SaveChanges();
            }
        }

        [Fact]
        public async Task GetAllEmployeesValidScenario()
        {
            // Act
            var result = await _controller.GetAllEmployees();

            // Assert

            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var employees = Assert.IsAssignableFrom<IEnumerable<Employee>>(okResult.Value);

            Assert.Collection(employees,
            e => Assert.Equal("John", e.FirstName),
            e => Assert.Equal("Amber", e.FirstName)
            );
            Assert.Equal("John", employees.First().FirstName);
            Assert.NotNull(result);
            Assert.NotEmpty(employees);
        }

        [Fact]
        public async Task GetAllEmployeesNotFound()
        {
            var result = await _controller.GetAllEmployees();
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var employees = Assert.IsAssignableFrom<IEnumerable<Employee>>(okResult.Value);

            Assert.NotEqual("Test", employees.First().FirstName);
        }

        [Fact]
        public async Task GetEmployeeWithValidId()
        {
            var result = await _controller.GetEmployee(1);
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var employee = Assert.IsType<Employee>(okResult.Value);

            Assert.Equal("John", employee.FirstName);
            Assert.NotNull(employee);
        }

        [Fact]
        public async Task GetEmployeeWithInvalidId()
        {
            var result = await _controller.GetEmployee(3);
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task CreateNewEmployee()
        {
            var employee =
                new EmployeeDto
                {
                    FirstName = "Sammy",
                    LastName = "Sopm",
                    Email = "sammysopm@test.com",
                    DateOfJoining = new DateTime(2023, 05, 23)
                };

            var result = await _controller.AddEmployee(employee);
            Assert.IsType<CreatedAtActionResult>(result);
        }

        [Fact]
        public async Task CreateEmployeeWithInvalidDetails()
        {
            var employee = new EmployeeDto
            {
                FirstName = "aaaaaadddda",
                LastName = "Tesdddddddddt",
                Email = "sa.test@gmailcom",
                DateOfJoining = new DateTime(2026, 05, 11)
            };

            var validationContext = new ValidationContext(employee, null, null);
            var validationResults = new List<ValidationResult>();
            Validator.TryValidateObject(employee, validationContext, validationResults, true);

            foreach (var validationResult in validationResults)
            {
                foreach (var memberName in validationResult.MemberNames)
                {
                    Assert.NotNull(validationResult.ErrorMessage);
                    _controller.ModelState.AddModelError(memberName, validationResult.ErrorMessage);
                }
            }

            var result = await _controller.AddEmployee(employee);
            var badRequestResult = Assert.IsType<ObjectResult>(result);

            var validationProblemDetails = Assert.IsType<ValidationProblemDetails>(badRequestResult.Value);

            Assert.Contains("Invalid email format.", validationProblemDetails.Errors["Email"]);
            Assert.Contains("Firstname should be with in 8 characters.", validationProblemDetails.Errors["FirstName"]);
            Assert.Contains("Lastname should be with in 8 characters.", validationProblemDetails.Errors["LastName"]);
            Assert.Contains("Date of Joining cannot be in the future.", validationProblemDetails.Errors["DateOfJoining"]);
        }

        [Fact]
        public async Task UpdateEmployee()
        {
            var getResult = await _controller.GetEmployee(1);
            var okResult = Assert.IsType<OkObjectResult>(getResult.Result);
            var employee = Assert.IsType<Employee>(okResult.Value);
            Assert.Equal("John", employee.FirstName);

            var updatedDto = new EmployeeDto
            {
                FirstName = "UpdatedJohn",
                LastName = "UpdatedDoe",
                Email = employee.Email,
                DateOfJoining = employee.DateOfJoining
            };

            var updatedResult = await _controller.EditEmployeeDetails(1, updatedDto);
            Assert.IsType<NoContentResult>(updatedResult);

            var newResult = await _controller.GetEmployee(1);
            var updatedOk = Assert.IsType<OkObjectResult>(newResult.Result);
            var updatedEmployee = Assert.IsType<Employee>(updatedOk.Value);

            Assert.Equal("UpdatedJohn", updatedEmployee.FirstName);
            Assert.Equal("UpdatedDoe", updatedEmployee.LastName);
        }

        [Fact]
        public async Task DeleteEmployee()
        {
            var existingEmployee = await _controller.GetEmployee(1);
            Assert.IsType<OkObjectResult>(existingEmployee.Result);

            var deleteResult = await _controller.DeleteEmployee(1);
            Assert.IsType<OkResult>(deleteResult.Result);

            var deleteAfter = await _controller.GetEmployee(1);
            Assert.IsType<NotFoundResult>(deleteAfter.Result);
        }
    }
}