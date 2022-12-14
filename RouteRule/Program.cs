using RouteRule.Bl.Archive;
using RouteRule.Bl.ConfigFileOperations;
using RouteRule.Bl.Helpers;
using RouteRule.Bl.RuleOperations;
using RouteRule.Models;

namespace RouteRule
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddSingleton<IConfigRepository, ConfigRepository>();
            builder.Services.AddSingleton<IRuleRepository, RuleRepository>();
            builder.Services.AddSingleton<IRuleHelperRepository, RuleHelperRepository>();
            builder.Services.AddSingleton<IArchiveRepository, ArchiveRepository>();

            builder.Services.AddCors();

            builder.Services.Configure<Login>(builder.Configuration.GetSection("Login"));
            builder.Services.Configure<IISApplication>(builder.Configuration.GetSection("IISApplication"));
            
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseRouting();

            app.UseCors(c=>c.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}