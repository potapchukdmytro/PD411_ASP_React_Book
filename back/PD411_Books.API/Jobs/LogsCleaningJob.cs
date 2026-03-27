using Quartz;

namespace PD411_Books.API.Jobs
{
    public class LogsCleaningJob : IJob
    {
        private readonly IWebHostEnvironment _environment;

        public LogsCleaningJob(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        public Task Execute(IJobExecutionContext context)
        {
            return Task.Run(() =>
            {
                var logsPath = Path.Combine(_environment.ContentRootPath, "logs");

                if (Directory.Exists(logsPath))
                {
                    foreach (var filePath in Directory.GetFiles(logsPath))
                    {
                        var file = new FileInfo(filePath);
                        if(DateTime.Now - file.CreationTime > TimeSpan.FromDays(7))
                        {
                            File.Delete(filePath);
                        }
                    }
                }
            });
        }
    }
}
