using Microsoft.EntityFrameworkCore;
using StimuliApp.Data;
using Microsoft.Extensions.Configuration;
using System.IO;
using StimuliApp.Services;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;
string connectionString = configuration?.GetConnectionString("DefaultConnection") ?? string.Empty;

// Add services to the container.
builder.Services.AddControllersWithViews().AddJsonOptions(x =>
    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<StimuliAppContext>(options => 
{
    options.UseSqlServer(connectionString);
});

builder.Services.AddScoped<ClientService >();
builder.Services.AddScoped<UserService >();
builder.Services.AddScoped<StimSetService >();
builder.Services.AddScoped<StimuliService >();



var app = builder.Build();
app.CreateDbIfNotExists();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
    
}

// app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
