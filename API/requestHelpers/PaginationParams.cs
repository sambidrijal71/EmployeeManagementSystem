namespace API.requestHelpers
{
    public class PaginationParams
    {
        public const int maxPageSize = 50;
        private int _pageSize = 8;
        public int PageSize { get => _pageSize; set => _pageSize = value > maxPageSize ? maxPageSize : value; }
        public int PageNumber { get; set; } = 1;
    }
}