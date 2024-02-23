using StimuliApp.Models;
using StimuliApp.Data;
using Microsoft.EntityFrameworkCore;

namespace StimuliApp.Services; 

public class UserService
{
    private readonly StimuliAppContext _context;

    public UserService (StimuliAppContext context)
    {
        _context = context;
    }

    public IEnumerable<User> GetAll()
    {
        return _context.Users
        .AsNoTracking()
        .ToList();
    }

    public User? GetById(int id)
    {
        return _context.Users
         .Include(p => p.Clients)
        .AsNoTracking()
        .SingleOrDefault(p => p.Id == id);
    }

    public User? Create(User newUser)
    {
        _context.Users.Add(newUser);
        _context.SaveChanges();
        return newUser;
    }

    public void Update(User updatedUser)
    {
        var userUpdating = _context.Users.Find(updatedUser.Id);
        if(userUpdating is null) 
        {
            throw new InvalidOperationException("User doesn't exist");
        }
        userUpdating.FirstName = updatedUser.FirstName ?? userUpdating.FirstName;
        userUpdating.LastName = updatedUser.LastName ?? userUpdating.LastName;
        userUpdating.Email = updatedUser.Email ?? userUpdating.Email;
        userUpdating.Password = updatedUser.Password ?? userUpdating.Password;
        _context.SaveChanges();
    }

    public void AddClient(int clientId, int userId)
    {
        var userUpdating = _context.Users.Find(userId);
        var clientUpdating = _context.Clients.Find(clientId);

         if(clientUpdating is null || userUpdating is null)
        {
            throw new InvalidOperationException("client or User doesn't exist");
        }

        if(userUpdating.Clients is null)
        {
            userUpdating.Clients = new List<Client>();
        }
        userUpdating.Clients.Add(clientUpdating);
        _context.SaveChanges();
    }

    public void DeleteById(int id)
    {
        var userUpdating = _context.Users.Find(id);
        if(userUpdating is not null)
        {
            _context.Users.Remove(userUpdating);
            _context.SaveChanges();
        }
    }
}