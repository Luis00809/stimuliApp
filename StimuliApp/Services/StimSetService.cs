using StimuliApp.Models;
using StimuliApp.Data;
using Microsoft.EntityFrameworkCore;

namespace StimuliApp.Services;

public class StimSetService
{
    private readonly StimuliAppContext _context;

    public StimSetService (StimuliAppContext context)
    {
        _context = context;
    }

    public IEnumerable<StimSet> GetAll()
    {
        return _context.StimSets
        .Include(p => p.Stimuli)
        .AsNoTracking()
        .ToList();
    }

    public StimSet? GetById(int id)
    {
        return _context.StimSets
        .Include(p => p.Stimuli)
        .Include(p => p.Clients)
        .AsNoTracking()
        .SingleOrDefault(p => p.Id == id);
    }

    public StimSet? Create(StimSet newSet)
    {
        _context.StimSets.Add(newSet);
        _context.SaveChanges();
        return newSet;
    }

    public void Update(StimSet updatedSet)
    {
        var setUpdating = _context.StimSets.Find(updatedSet.Id);
        if (setUpdating is null)
        {
            throw new InvalidOperationException("StimSet doesn't exist");

        }

        setUpdating.Title = updatedSet.Title ?? setUpdating.Title;
        _context.SaveChanges();
    }

    public void AddStimuli(int stimId, int setId)
    {
        var stimSetUpdating = _context.StimSets.Find(setId);
        var stimuliUpdating = _context.Stimuli.Find(stimId);

        if (stimSetUpdating is null || stimuliUpdating is null)
        {
            throw new InvalidOperationException("StimSet or stimuli doesn't exist");

        }

        if(stimSetUpdating.Stimuli is null)
        {
            stimSetUpdating.Stimuli = new List<Stimuli>();
        }

        stimSetUpdating.Stimuli.Add(stimuliUpdating);
        _context.SaveChanges();
    }

    public void AddClient(int clientId, int setId)
    {
        var stimSetUpdating = _context.StimSets.Find(setId);
        var clientUpdating = _context.Clients.Find(clientId);

        if (stimSetUpdating is null || clientUpdating is null)
        {
            throw new InvalidOperationException("StimSet or client doesn't exist");

        }

        if(stimSetUpdating.Clients is null)
        {
            stimSetUpdating.Clients = new List<Client>();
        }

        stimSetUpdating.Clients.Add(clientUpdating);
        _context.SaveChanges();
    }

    public void DeleteById(int id)
    {
        var stimSetUpdating = _context.StimSets.Find(id);
        if(stimSetUpdating is not null)
        {
            _context.StimSets.Remove(stimSetUpdating);
            _context.SaveChanges();
        }
    }

    public void RemoveStimuli(int stimId, int setId)
{
    var stimSetUpdating = _context.StimSets.Include(s => s.Stimuli).SingleOrDefault(s => s.Id == setId);
    if (stimSetUpdating is null)
    {
        throw new InvalidOperationException("StimSet doesn't exist");
    }

    var stimuliUpdating = stimSetUpdating?.Stimuli?.SingleOrDefault(s => s.Id == stimId);
    if (stimuliUpdating is null)
    {
        throw new InvalidOperationException("Stimuli doesn't exist in this StimSet");
    }

    stimSetUpdating?.Stimuli?.Remove(stimuliUpdating);
    _context.SaveChanges();
}

}