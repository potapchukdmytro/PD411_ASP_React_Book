namespace PD411_Books.BLL.Services
{
    public class ServiceResponse
    {
        public string Message { get; set; } = string.Empty;
        public bool IsSuccess { get; set; } = true;
        public object? Payload { get; set; } = null;

        public static ServiceResponse Success(string message, object? payload = null)
        {
            return new ServiceResponse
            {
                IsSuccess = true,
                Message = message,
                Payload = payload
            };
        }

        public static ServiceResponse Error(string message, object? payload = null)
        {
            return new ServiceResponse
            {
                IsSuccess = false,
                Message = message,
                Payload = payload
            };
        }
    }
}
