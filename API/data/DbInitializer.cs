using API.models;

namespace API.data
{
    public static class DbInitializer
    {
        public static void Initialize(StoreContext context)
        {
            if (context.Employees.Any()) return;

            var employees = new List<Employee>
            {
                new() {FirstName = "Jerry", LastName="Chen", Email="jerrychen@gmail.com", DateOfJoining=new DateTime(1990, 01, 15, 0, 0, 0, DateTimeKind.Utc).Date},
                new() {FirstName = "Chris", LastName="Adams", Email="chrisadams@gmail.com", DateOfJoining=new DateTime(1991, 01, 15, 0, 0, 0, DateTimeKind.Utc).Date},
                new() {FirstName = "Adam", LastName="Perry", Email="adamperry@gmail.com", DateOfJoining=new DateTime(1988, 01, 15, 0, 0, 0, DateTimeKind.Utc).Date},
                new() {FirstName = "Kate", LastName="Homming", Email="katehomming@gmail.com", DateOfJoining=new DateTime(1982, 01, 15, 0, 0, 0, DateTimeKind.Utc).Date},
                new() {FirstName = "Yorick", LastName="Block", Email="yorickblock@gmail.com", DateOfJoining=new DateTime(1986, 01, 15, 0, 0, 0, DateTimeKind.Utc).Date},
            };


            foreach (var employee in employees)
            {
                context.Employees.Add(employee);
            }
            context.SaveChanges();
        }
    }
}