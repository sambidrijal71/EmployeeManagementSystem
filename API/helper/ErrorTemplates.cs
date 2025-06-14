using API.models;

namespace API.helper
{
    public static class ErrorTemplates
    {
        public static ApiError NotFound(string? detail)
        {
            return new ApiError
            {
                Type = "https://httpstatuses.com/404",
                Title = "Resource not found",
                StatusCode = StatusCodes.Status404NotFound,
                Detail = detail ?? "The requested resource could not be found.",
            };
        }

        public static ApiError BadRequest(string? detail)
        {
            return new ApiError
            {
                Type = "https://httpstatuses.com/400",
                Title = "Bad request provided",
                StatusCode = StatusCodes.Status400BadRequest,
                Detail = detail ?? "This is a bad request, please check your request.",
            };
        }

        public static ApiError UnAuthorized(string? detail)
        {
            return new ApiError
            {
                Type = "https://httpstatuses.com/401",
                Title = "Unauthorized access",
                StatusCode = StatusCodes.Status401Unauthorized,
                Detail = detail ?? "The content you are trying to view is unauthorized.",
            };
        }
    }
}