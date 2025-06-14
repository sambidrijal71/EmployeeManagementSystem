using API.models;
using Microsoft.AspNetCore.Mvc;

namespace API.controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        protected ApiError BuildErrorWithContext(ApiError error)
        {

            if (HttpContext == null)
            {
                throw new InvalidOperationException("HttpContext is null");
            }

            return new ApiError
            {
                Type = error.Type,
                Title = error.Title,
                StatusCode = error.StatusCode,
                Detail = error.Detail,
                Path = HttpContext.Request.Path,
                TraceId = HttpContext.TraceIdentifier
            };
        }
    }
}