using StimuliApp.Models;
using StimuliApp.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace StimuliApp.Services;

public class StimuliService
{
    private readonly StimuliAppContext _context;
    public StimuliService (StimuliAppContext context)
    {
        _context = context;
    }

    public IEnumerable<Stimuli> GetAll()
    {
        return _context.Stimuli
        .AsNoTracking()
        .ToList();
    }

    public Stimuli? GetById(int id)
    {
        return _context.Stimuli
        .Include(p => p.StimSets)
        .AsNoTracking()
        .SingleOrDefault(p => p.Id == id);
    }

    public Stimuli? Create(Stimuli newStim)
    {
        _context.Stimuli.Add(newStim);
        _context.SaveChanges();
        return newStim;
    }

    public void Update(Stimuli updatedStim)
    {
        var stimuliUpdating = _context.Stimuli.Find(updatedStim.Id);
        if(stimuliUpdating is null)
        {
            throw new InvalidOperationException("Stimuli doesn't exist");

        }

        stimuliUpdating.Name = updatedStim.Name ?? stimuliUpdating.Name;
        _context.SaveChanges();
    }

    public void AddStimSet(int stimId, int setId)
    {
        var updatingStim = _context.Stimuli.Find(stimId);
        var updatingSet = _context.StimSets.Find(setId);
        if (updatingSet is null || updatingStim is null)
        {
            throw new InvalidOperationException("Stimuli or stimset doesn't exist");

        }

        if(updatingStim.StimSets is null)
        {
            updatingStim.StimSets = new List<StimSet>();
        }

        updatingStim.StimSets.Add(updatingSet);
        _context.SaveChanges();
    }

    public void DeleteById(int id)
    {
        var updatedStim = _context.Stimuli.Find(id);
        if(updatedStim is not null)
        {
            _context.Stimuli.Remove(updatedStim);
            _context.SaveChanges();
        }
    }


}