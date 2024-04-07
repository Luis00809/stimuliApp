using Microsoft.EntityFrameworkCore;
using StimuliApp.Models;

namespace StimuliApp.Data;

public class StimuliAppContext : DbContext
{
    public StimuliAppContext (DbContextOptions<StimuliAppContext> options)
        : base(options)
    {
    }

    public DbSet<Stimuli> Stimuli => Set<Stimuli>();
    public DbSet<StimSet> StimSets => Set<StimSet>();
    public DbSet<Client> Clients => Set<Client>();
    public DbSet<User> Users => Set<User>();
    public DbSet<Trial> Trials => Set<Trial>();
    public DbSet<Round> Rounds => Set<Round>();
    public DbSet<Item> Items => Set<Item>();


}