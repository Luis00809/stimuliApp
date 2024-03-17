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
        _context.Trials.Add(newTrial);
        _context.SaveChanges();
        return newTrial;
    }

    public void AddToClient(Trial trial, int clientId)
    {
        var client = _context.Clients.Find(clientId);

        if (client == null)
        {
            throw new InvalidOperationException("Client does not exist");
        }

        trial.ClientId = clientId; 
        client.Trials.Add(trial); 

        _context.Trials.Add(trial); 
        _context.SaveChanges();
    }

}