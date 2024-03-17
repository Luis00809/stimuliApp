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

    public Round? Create(Round newRound)
    {
        _context.Rounds.Add(newRound);
        _context.SaveChanges();
        return newRound;
    }

    public void addToTrial (List<int> roundIds, int TrialId)
    {
        var trialToAddTo = _context.Trials.Find(TrialId);

        if (trialToAddTo is null)
        {
            throw new InvalidOperationException("Trial doesn't exist");
        }

        foreach (var roundId in roundIds)
        {
            var roundToAdd = _context.Rounds.Find(roundId);

            if (roundToAdd is null)
            {
                throw new InvalidOperationException("Round doesn't exist");
            }

            trialToAddTo.Rounds.Add(roundToAdd);
        }

        _context.SaveChanges();

    }
}