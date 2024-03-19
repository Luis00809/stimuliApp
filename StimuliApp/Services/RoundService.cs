using StimuliApp.Models;
using StimuliApp.Data;
using Microsoft.EntityFrameworkCore;

namespace StimuliApp.Services;

public class RoundService
{
    private readonly StimuliAppContext _context;
   
   public RoundService(StimuliAppContext context)
   {
        _context = context;
   }

    public IEnumerable<Round> GetAll()
    {
        return _context.Rounds
        .AsNoTracking()
        .ToList();
    }

    public Round? GetById(int id)
    {
        return _context.Rounds
        .AsNoTracking()
        .SingleOrDefault(p => p.Id == id);
    }

    public Round? Create(Round newRound)
    {
        _context.Rounds.Add(newRound);
        _context.SaveChanges();
        return newRound;
    }

    public void addToTrial(List<int> roundIds, int TrialId)
{
    var trialToAddTo = _context.Trials.Include(t => t.Rounds).FirstOrDefault(t => t.Id == TrialId);

    if (trialToAddTo == null)
    {
        throw new InvalidOperationException("Trial doesn't exist");
    }

    // Ensure the Rounds collection is instantiated
    if (trialToAddTo.Rounds == null)
    {
        trialToAddTo.Rounds = new List<Round>();
    }

    foreach (var roundId in roundIds)
    {
        var roundToAdd = _context.Rounds.Find(roundId);

        if (roundToAdd == null)
        {
            throw new InvalidOperationException("Round doesn't exist");
        }

        trialToAddTo.Rounds.Add(roundToAdd);
    }

    _context.SaveChanges();
}

    public void DeleteById(int id)
    {
        var round = _context.Rounds.Find(id);
        if(round is not null)
        {
            _context.Rounds.Remove(round);
            _context.SaveChanges();
        }
    }

}