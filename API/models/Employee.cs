namespace API.models
{
    public class Employee
    {
        public int Id { get; set; }
        public required String FirstName { get; set; }
        public required String LastName { get; set; }
        public required String Email { get; set; }
        public DateTime DateOfJoining { get; set; }
    }
}