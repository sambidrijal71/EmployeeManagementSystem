using API.data;
using API.middleware;
using API.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();

builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors();


var app = builder.Build();


app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000");
});

app.UseMiddleware<ExceptionMiddleware>();
app.MapControllers();

app.UseHttpsRedirection();

var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

try
{
    await context.Database.MigrateAsync();
    DbInitializer.Initialize(context);
}
catch (Exception ex)
{

    logger.LogError(ex, "Problem occured while migrating the database.");
}

await app.RunAsync();
