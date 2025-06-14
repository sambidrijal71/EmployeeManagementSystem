namespace API.models
{
    public class ApiError
    {
        public String? Type { get; set; }
        public required String Title { get; set; }
        public int StatusCode { get; set; }
        public required String Detail { get; set; } = string.Empty;
        public String? Path { get; set; }
        public String? TraceId { get; set; }
    }
}