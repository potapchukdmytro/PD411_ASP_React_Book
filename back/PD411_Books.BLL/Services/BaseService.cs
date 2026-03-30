using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PD411_Books.BLL.Dtos.Pagination;

namespace PD411_Books.BLL.Services
{
    public abstract class BaseService
    {
        private readonly IMapper _mapper;

        protected BaseService(IMapper mapper)
        {
            _mapper = mapper;
        }

        public async Task<PaginationResponseDto<TDto>> GetPaginationAsync<TEntity, TDto>(IQueryable<TEntity> collection, PaginationDto pagination)
        {
            int totalCount = await collection.CountAsync();
            int pageSize = pagination.PageSize < 1 ? 15 : pagination.PageSize;
            int pageCount = (int)Math.Ceiling((double)totalCount / pageSize);
            int page = pagination.Page < 1 || pagination.Page > pageCount ? 1 : pagination.Page;

            var entities = await collection
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var dtos = _mapper.Map<List<TDto>>(entities);

            return new PaginationResponseDto<TDto>
            {
                Page = page,
                PageSize = pageSize,
                TotalCount = totalCount,
                PageCount = pageCount,
                Data = dtos
            };
        }
    }
}
