using Quartz;

namespace PD411_Books.API.Jobs
{
    public class ConsoleWriterJob : IJob
    {
        public async Task Execute(IJobExecutionContext context)
        {
            Console.ForegroundColor = ConsoleColor.Green;
            await Console.Out.WriteLineAsync($"{DateTime.Now.ToLongTimeString()}: Quart working");
            await Console.Out.WriteLineAsync($"{DateTime.Now.ToLocalTime()}: Quart working");
            await Console.Out.WriteLineAsync($"{DateTime.Now.ToShortTimeString()}: Quart working");
            Console.ResetColor();
        }
    }
}
