using Microsoft.Extensions.FileProviders;
using PD411_Books.API.Settings;

namespace PD411_Books.API.Infrastructure
{
    public static class ConfigureStaticFiles
    {
        public static IApplicationBuilder UseStaticFiles(this IApplicationBuilder app, IWebHostEnvironment env)
        {
            var items = new List<KeyValuePair<string, string>>
            {
                new KeyValuePair<string, string>(StaticFilesSettings.ShareDir, StaticFilesSettings.ShareUrl),
                new KeyValuePair<string, string>(StaticFilesSettings.AuthorsDir, StaticFilesSettings.AuthorUrl),
                new KeyValuePair<string, string>(StaticFilesSettings.BooksDir, StaticFilesSettings.BookUrl)
            };

            string storagePath = Path.Combine(env.ContentRootPath, StaticFilesSettings.StorageDir);
            if (!Directory.Exists(storagePath))
            {
                Directory.CreateDirectory(storagePath);
            }

            foreach (var item in items)
            {
                string path = Path.Combine(storagePath, item.Key);
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                app.UseStaticFiles(new StaticFileOptions
                {
                    FileProvider = new PhysicalFileProvider(path),
                    RequestPath = item.Value
                });
            }

            return app;
        }
    }
}
