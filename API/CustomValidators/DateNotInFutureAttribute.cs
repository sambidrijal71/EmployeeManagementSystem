using System.ComponentModel.DataAnnotations;

namespace API.CustomValidators
{
    public class DateNotInFutureAttribute : ValidationAttribute
    {
        public override bool IsValid(object? value)
        {
            if (value is DateTime dt)
            {
                return dt <= DateTime.Today;
            }
            return true;
        }
    }
}