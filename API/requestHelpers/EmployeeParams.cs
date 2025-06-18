namespace API.requestHelpers
{
    public class EmployeeParams : PaginationParams
    {
        public String? SortBy { get; set; }
        public String? SearchKey { get; set; }
    }
}