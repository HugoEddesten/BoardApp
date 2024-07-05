using BoardProvider.Data.Contexts;
using Microsoft.Azure.Functions.Worker;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var host = new HostBuilder()
    .ConfigureFunctionsWebApplication()
    .ConfigureServices(services =>
    {
        services.AddApplicationInsightsTelemetryWorkerService();
        services.ConfigureFunctionsApplicationInsights();
        services.AddDbContext<Context>(x => x.UseSqlServer("Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=D:\\WebDevelopmentProjects\\BoardApp\\BoardProvider\\BoardProvider\\Data\\Database\\BoardDB.mdf;Integrated Security=True;Connect Timeout=30;Encrypt=True"));
    })
    .Build();

host.Run();
