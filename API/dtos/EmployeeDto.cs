using System.ComponentModel.DataAnnotations;

namespace API.dtos
{
    public class EmployeeDto
    {
        [Required]
        [MaxLength(8, ErrorMessage = "Firstname should be with in 8 characters.")]
        public required String FirstName { get; set; }

        [Required]
        [MaxLength(8, ErrorMessage = "Lastname should be with in 8 characters.")]
        public required String LastName { get; set; }

        [Required]
        [RegularExpression(@"[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?", ErrorMessage = "Invalid email format.")]
        public required String Email { get; set; }

        [Required]
        [CustomValidators.DateNotInFutureAttribute(ErrorMessage = "Date of Joining cannot be in the future.")]
        public DateTime DateOfJoining { get; set; }
    }
}