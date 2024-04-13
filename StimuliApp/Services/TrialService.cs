using StimuliApp.Models;
using StimuliApp.Data;
using Microsoft.EntityFrameworkCore;

namespace StimuliApp.Services;

public class TrialService
{
    private readonly StimuliAppContext _context;
    
    public TrialService(StimuliAppContext context)
    {
        _context = context;
    }

    public IEnumerable<Trial> GetAll()
    {
        return _context.Trials
        .AsNoTracking()
        .ToList();
    }

    public Trial? GetById(int id)
    {
        return _context.Trials
        .Include(p => p.Rounds)
        .AsNoTracking()
        .SingleOrDefault(p => p.Id == id);
    }

    public Trial? Create(Trial newTrial)
    {
        newTrial.Date = DateTime.Now;
        _context.Trials.Add(newTrial);
        _context.SaveChanges();
        return newTrial;
    }

    public void DeleteById(int id)
    {
        var trial = _context.Trials.Find(id);
        if (trial is not null)
        {
            _context.Trials.Remove(trial);
            _context.SaveChanges();
        }
    }

   public void AddToClient(Trial trial, int clientId)
    {
        var client = _context.Clients.Include(c => c.Trials).FirstOrDefault(c => c.Id == clientId);

        if (client == null)
        {
            throw new InvalidOperationException("Client does not exist");
        }

        trial.ClientId = clientId; 

        // Ensure the Trials collection is instantiated
        if (client.Trials == null)
        {
            client.Trials = new List<Trial>();
        }

        client.Trials.Add(trial); 

        _context.SaveChanges();
    }

    public IEnumerable<Trial> GetByDateAndClientAndStimSet(DateTime date, int clientId, int stimSetId)
    {
        // Start of the day
        var startDate = date.Date;
        // End of the day
        var endDate = startDate.AddDays(1).AddTicks(-1);

        return _context.Trials
        .Include(p => p.Rounds)
        .Include(p => p.Client)
        .Include(p => p.StimSet)
        .AsNoTracking()
        .Where(p => p.Date.HasValue && p.Date.Value >= startDate && p.Date.Value <= endDate
                && p.ClientId == clientId && p.SetId == stimSetId)
        .ToList();
    }   
}

// date: 2024-04-12
// client: 1005
// stimset: 4042