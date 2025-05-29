using API.models;
using Microsoft.EntityFrameworkCore;

namespace API.data
{
    public class StoreContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<Employee> Employees { get; set; }
    }
}