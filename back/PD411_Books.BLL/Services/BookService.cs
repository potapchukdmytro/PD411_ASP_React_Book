using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PD411_Books.BLL.Dtos.Book;
using PD411_Books.BLL.Dtos.Pagination;
using PD411_Books.DAL.Entities;
using PD411_Books.DAL.Repositories;

namespace PD411_Books.BLL.Services
{
    public class BookService : BaseService
    {
        private readonly BookRepository _bookRepository;
        private readonly ImageService _imageService;
        private readonly IMapper _mapper;

        public BookService(BookRepository bookRepository, ImageService imageService, IMapper mapper)
            : base(mapper)
        {
            _bookRepository = bookRepository;
            _imageService = imageService;
            _mapper = mapper;
        }

        public async Task<ServiceResponse> CreateAsync(CreateBookDto dto, string imagesPath)
        {
            var entity = _mapper.Map<BookEntity>(dto);

            if (dto.Image != null && !string.IsNullOrEmpty(imagesPath))
            {
                ServiceResponse response = await _imageService.SaveAsync(dto.Image, imagesPath);

                if (!response.IsSuccess)
                {
                    return response;
                }

                entity.Image = response.Payload!.ToString()!;
            }

            bool res = await _bookRepository.CreateAsync(entity);

            if (!res)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Не вдалося додати книгу"
                };
            }

            return new ServiceResponse
            {
                Message = $"Книга '{entity.Title}' успішно додана",
                Payload = _mapper.Map<BookDto>(entity)
            };
        }

        public async Task<ServiceResponse> UpdateAsync(UpdateBookDto dto, string imagesPath)
        {
            var entity = await _bookRepository.GetByIdAsync(dto.Id);

            if (entity == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = $"Книги з id {dto.Id} не існує"
                };
            }

            string oldTitle = entity.Title;
            entity = _mapper.Map(dto, entity);

            if (dto.Image != null && !string.IsNullOrEmpty(imagesPath))
            {
                if (!string.IsNullOrEmpty(entity.Image))
                {
                    string imagePath = Path.Combine(imagesPath, entity.Image);
                    var deleteResponse = _imageService.Delete(imagePath);

                    if (!deleteResponse.IsSuccess)
                    {
                        return deleteResponse;
                    }
                }

                var saveResponse = await _imageService.SaveAsync(dto.Image, imagesPath);

                if (!saveResponse.IsSuccess)
                {
                    return saveResponse;
                }

                entity.Image = saveResponse.Payload!.ToString()!;
            }

            bool res = await _bookRepository.UpdateAsync(entity);

            if (!res)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Не вдалося оновити книгу"
                };
            }

            return new ServiceResponse
            {
                Message = $"Книга '{oldTitle}' успішно оновлена",
                Payload = _mapper.Map<BookDto>(entity)
            };
        }

        public async Task<ServiceResponse> DeleteAsync(int id, string imagesPath)
        {
            var entity = await _bookRepository.GetByIdAsync(id);

            if (entity == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = $"Книги з id {id} не існує"
                };
            }

            if (!string.IsNullOrEmpty(entity.Image))
            {
                string imagePath = Path.Combine(imagesPath, entity.Image);
                var response = _imageService.Delete(imagePath);

                if (!response.IsSuccess)
                {
                    return response;
                }
            }

            bool res = await _bookRepository.DeleteAsync(entity);

            if (!res)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = "Не вдалося видалити книгу"
                };
            }

            return new ServiceResponse
            {
                Message = $"Книга '{entity.Title}' успішно видалена",
                Payload = _mapper.Map<BookDto>(entity)
            };
        }

        public async Task<ServiceResponse> GetByIdAsync(int id)
        {
            var entity = await _bookRepository.GetByIdAsync(id);

            if (entity == null)
            {
                return new ServiceResponse
                {
                    IsSuccess = false,
                    Message = $"Книги з id {id} не існує"
                };
            }

            return new ServiceResponse
            {
                Message = "Книга успішно отримана",
                Payload = _mapper.Map<BookDto>(entity)
            };
        }

        public async Task<ServiceResponse> GetAllAsync(PaginationDto pagination)
        {
            var entities = _bookRepository.Books
                .Include(b => b.Genres)
                .Include(b => b.Author)
                .OrderBy(b => b.Id);

            var paginationResponse = await GetPaginationAsync<BookEntity, BookDto>(entities, pagination);

            return new ServiceResponse
            {
                Message = "Книги отримано",
                Payload = paginationResponse
            };
        }
    }
}
