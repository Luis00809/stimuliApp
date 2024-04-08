using StimuliApp.Models;
using StimuliApp.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace StimuliApp.Services;

public class ItemService 
{
    private readonly StimuliAppContext _context;
    private readonly IConfiguration _configuration;
    
    public ItemService(StimuliAppContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public IEnumerable<Item> GetAll()
    {
        return _context.Items
        .AsNoTracking()
        .ToList();
    }

    public Item? GetById(int id)
    {
        return _context.Items
        .Include(s => s.Stimuli)
        .AsNoTracking()
        .SingleOrDefault(p => p.Id == id);
    }

    public Item? Create(Item item)
    {
        _context.Items.Add(item);
        _context.SaveChanges();
        return item;
    }

    public void Update(Item item)
    {
        var itemUpdating = _context.Items.Find(item.Id);

        if (itemUpdating is null)
        {
            throw new InvalidOperationException("Item doesn't exist");
        }

        itemUpdating.Category = item.Category ?? itemUpdating.Category;
        _context.SaveChanges();
    }

    public void CategorizeStimuli(int itemId, int stimId)
    {
        var itemUpdating = _context.Items.Find(itemId);
        var stimUpdating = _context.Stimuli.Find(stimId);

        if (itemUpdating is null || stimUpdating is null)
        {
            throw new InvalidOperationException("Item or stimuli doesn't exist");
        }

        if (itemUpdating.Stimuli is null )
        {
            itemUpdating.Stimuli = new List<Stimuli>(); 
        }

        itemUpdating.Stimuli.Add(stimUpdating);
        _context.SaveChanges();
    }

    public void Delete(int id)
    {
        var item = _context.Items.Find(id);

        if (item is null)
        {
            throw new InvalidOperationException("Item doesn't exist");
        }

        _context.Items.Remove(item);
        _context.SaveChanges();
    }

    public void RemoveStimuli(int itemId, int stimId)
    {
        var itemUpdating = _context.Items.Include(s => s.Stimuli).SingleOrDefault(s => s.Id == itemId);
        if (itemUpdating is null)
        {
            throw new InvalidOperationException("Item doesn't exist");
        }
        
        var stimUpdating = itemUpdating?.Stimuli?.SingleOrDefault(s => s.Id == stimId);
        if (stimUpdating is null)
        {
            throw new InvalidOperationException("Stimuli doesn't exist");
        }

        itemUpdating?.Stimuli?.Remove(stimUpdating);  
        _context.SaveChanges();
    }
}