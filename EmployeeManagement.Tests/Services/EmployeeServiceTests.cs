using API.controllers;
using API.data;
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
            var options = new DbContextOptionsBuilder<StoreContext>().UseInMemoryDatabase(databaseName: "storeDb").Options;
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
        public async Task GetAllEmployees_ReturnsEmployees()
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
        public async Task GetEmployeeValidId()
        {
            var result = await _controller.GetEmployee(1);
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var employee = Assert.IsType<Employee>(okResult.Value);

            Assert.Equal("John", employee.FirstName);
            Assert.NotNull(employee);
        }

        [Fact]
        public async Task GetEmployeeInvalidId()
        {
            var result = await _controller.GetEmployee(3);
            Assert.IsType<NotFoundResult>(result.Result);
        }
    }
}