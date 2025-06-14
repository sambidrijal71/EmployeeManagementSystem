using System.ComponentModel.DataAnnotations;

namespace API.CustomValidators
{
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field, AllowMultiple = false)]

    public class DateNotInFutureAttribute : ValidationAttribute
    {
        public DateNotInFutureAttribute()
        {
            ErrorMessage = "{0} cannot more than 30 days from today.";
        }

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value == null) return ValidationResult.Success;
            if (value is DateTime dateTime && dateTime > DateTime.Now.Date.AddDays(30))
            {
                var errorMessage = FormatErrorMessage(validationContext.DisplayName);
                return new ValidationResult(errorMessage);
            }
            return ValidationResult.Success;
        }
    }
}