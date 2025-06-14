using API.models;
using Microsoft.AspNetCore.Mvc;

namespace API.controllers
{
    public class ErrorsController : BaseApiController
    {
        [HttpGet("not-found")]
        public IActionResult GetNotFoundError()
        {
            return NotFound(new ApiError
            {
                Title = "Resource not found",
                StatusCode = StatusCodes.Status404NotFound,
                Detail = "The requested resource could not be found.",
                Path = HttpContext.Request.Path,
                TraceId = HttpContext.TraceIdentifier
            });
        }

        [HttpGet("bad-request")]
        public IActionResult GetBadRequestError()
        {
            return BadRequest(new ApiError
            {
                Title = "Bad request provided",
                StatusCode = StatusCodes.Status400BadRequest,
                Detail = "This is a bad request, please check your request.",
                Path = HttpContext.Request.Path,
                TraceId = HttpContext.TraceIdentifier
            });
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
            return Unauthorized(new ApiError
            {
                Title = "Unauthorized access",
                StatusCode = StatusCodes.Status401Unauthorized,
                Detail = "The content you are trying to view is unauthorized.",
                Path = HttpContext.Request.Path,
                TraceId = HttpContext.TraceIdentifier
            });
        }

        [HttpGet("server-error")]
        public IActionResult GetServerError()
        {
            throw new Exception("This is a server error.");
        }
    }
}