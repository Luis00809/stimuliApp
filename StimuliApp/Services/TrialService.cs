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

    public Trial Create(List<Round> rounds)
        {
            var trial = new Trial
            {
                Rounds = rounds
            };

            _context.Trials.Add(trial);
            _context.SaveChanges();

            return trial;
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