using StimuliApp.Models;
using StimuliApp.Data;
using Microsoft.EntityFrameworkCore;

namespace StimuliApp.Services; 

public class ClientService 
{
    private readonly StimuliAppContext _context;

    public ClientService (StimuliAppContext context)
    {
        _context = context;
    }

    public IEnumerable<Client> GetAll()
    {
        return _context.Clients
        .AsNoTracking()
        .ToList();
    }

    public Client? GetById(int id)
    {
        return _context.Clients
        .Include(p => p.Users)
        .Include(p => p.StimSets)
        .ThenInclude(ss => ss.Stimuli)
        .AsNoTracking()
        .SingleOrDefault(p => p.Id == id);
    }

    public Client? Create(Client newClient)
    {
        _context.Clients.Add(newClient);
        _context.SaveChanges();
        return newClient;
    }

    public void Update(Client updatedClient)
    {
        var clientUpdating = _context.Clients.Find(updatedClient.Id);
        if(clientUpdating is null)
        {
            throw new InvalidOperationException("Client doesn't exist");
        }

        clientUpdating.Name = updatedClient.Name ?? clientUpdating.Name;
        _context.SaveChanges();

    }

    public void AddUser(int clientId, int userId)
    {
        var clientUpdating = _context.Clients.Find(clientId);
        var userUpdating = _context.Users.Find(userId);

        if(clientUpdating is null || userUpdating is null)
        {
            throw new InvalidOperationException("client or User doesn't exist");
        }

        if(clientUpdating.Users is null)
        {
            clientUpdating.Users = new List<User>();
        }
        clientUpdating.Users.Add(userUpdating);
        _context.SaveChanges();
    }

    public bool AddSet(int clientId, int stimSetId)
    {
        var clientUpdating = _context.Clients.Find(clientId);
        var stimSetUpdating = _context.StimSets.Find(stimSetId);

        if(clientUpdating is null || stimSetUpdating is null)
        {
            throw new InvalidOperationException("client or StimSet doesn't exist");

        }

        if(clientUpdating.StimSets is null)
        {
            clientUpdating.StimSets = new List<StimSet>();
        }

        clientUpdating.StimSets.Add(stimSetUpdating);
        _context.SaveChanges();
        return true;
    }

    public void DeleteById(int id)
    {
        var clientUpdating = _context.Clients.Find(id);
        if(clientUpdating is not null)
        {
            _context.Clients.Remove(clientUpdating);
            _context.SaveChanges();
        }
    }



    public void RemoveSetFromClient(int clientId, int setId)
    {
        var clientUpdating = _context.Clients.Include(s => s.StimSets).SingleOrDefault(s => s.Id == clientId);
        if(clientUpdating is null)

        {
            throw new InvalidOperationException("Client doesn't exist");
        };

        var setUpdating = clientUpdating?.StimSets?.SingleOrDefault(s => s.Id == setId);
        if(setUpdating is null)

        {
            throw new InvalidOperationException("Stim set doesn't exist");
        }

        clientUpdating?.StimSets?.Remove(setUpdating);
        _context.SaveChanges();
    }

}