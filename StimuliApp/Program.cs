using Microsoft.EntityFrameworkCore;
using StimuliApp.Data;
using Microsoft.Extensions.Configuration;
using System.IO;
using StimuliApp.Services;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.SpaServices.Extensions;


var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;
string connectionString = configuration?.GetConnectionString("DefaultConnection") ?? string.Empty;

// Add services to the container.
builder.Services.AddControllersWithViews().AddJsonOptions(x =>
    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

builder.Services.AddRazorPages();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.CustomSchemaIds(type => type.FullName);
});

builder.Services.AddDbContext<StimuliAppContext>(options => 
{
    options.UseSqlServer(connectionString);
});

builder.Services.AddScoped<ClientService >();
builder.Services.AddScoped<UserService >();
builder.Services.AddScoped<StimSetService >();
builder.Services.AddScoped<StimuliService >();
builder.Services.AddScoped<JwtService >();
builder.Services.AddScoped<TrialService >();
builder.Services.AddScoped<RoundService >();
builder.Services.AddScoped<ItemService >();


builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "stimuliApp/clientui/build";
});

var app = builder.Build();
app.CreateDbIfNotExists();


if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
    
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseSpaStaticFiles(); // Serve static files from the React app
app.UseAuthorization();
app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html", "ClientApp/build"); // Serve the React app
app.Run();
