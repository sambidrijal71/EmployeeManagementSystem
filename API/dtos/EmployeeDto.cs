namespace API.dtos
{
    public class EmployeeDto
    {
        public required String FirstName { get; set; }
        public required String LastName { get; set; }
        public required String Email { get; set; }
        public DateTime DateOfJoining { get; set; }
    }
}