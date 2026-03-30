namespace PD411_Books.BLL.Dtos.Query
{
    public class PaginationResponseDto<T>
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 15;
        public int PageCount { get; set; } = 1;
        public int TotalCount { get; set; } = 0;
        public IEnumerable<T> Data { get; set; } = [];
    }
}
