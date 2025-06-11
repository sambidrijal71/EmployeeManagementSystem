using Microsoft.AspNetCore.Mvc;

namespace API.controllers
{
    public class ErrorsController : BaseApiController
    {
        [HttpGet("not-found")]
        public IActionResult GetNotFoundError()
        {
            var problemDetails = new ProblemDetails
            {
                Title = "Resource not found",
                Status = StatusCodes.Status404NotFound,
                Detail = "The requested resource could not be found.",

            };

            return NotFound(problemDetails);
        }

        [HttpGet("bad-request")]
        public IActionResult GetBadRequestError()
        {
            var problemDetails = new ProblemDetails
            {
                Title = "Bad request provided",
                Status = StatusCodes.Status400BadRequest,
                Detail = "This is a bad request, please check your request.",
            };

            return BadRequest(problemDetails);
        }

        [HttpGet("validation")]
        public IActionResult GetValidationError()
        {
            ModelState.AddModelError("Error 1", "This is First Error.");
            ModelState.AddModelError("Error 2", "This is Second Error.");
            return ValidationProblem();
        }

        [HttpGet("unauthorized")]
        public IActionResult GetUnAuthorizedError()
        {
            var problemDetails = new ProblemDetails
            {
                Title = "Unauthorized access",
                Status = StatusCodes.Status401Unauthorized,
                Detail = "The content you are trying to view is unauthorized.",

            };

            return Unauthorized(problemDetails);
        }

        [HttpGet("server-error")]
        public IActionResult GetServerError()
        {
            throw new Exception("This is a server error.");
        }
    }
}