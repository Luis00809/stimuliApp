using StimuliApp.Models;
using StimuliApp.Data;
using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;

using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;


namespace StimuliApp.Services; 

public class UserService
{
    private readonly StimuliAppContext _context;

    public UserService (StimuliAppContext context)
    {
        _context = context;
    }

    private string HashPassword(string password)
    {
        var salt = new byte[128 /  8];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(salt);
        }

        var hashedPassword = KeyDerivation.Pbkdf2(
            password: password,
            salt: salt,
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount:  10000,
            numBytesRequested:  256 /  8);

        return Convert.ToBase64String(salt) + "." + Convert.ToBase64String(hashedPassword);
    }


    public User? GetByEmail(string email)
    {
        return _context.Users
            .AsNoTracking()
            .SingleOrDefault(u => u.Email == email);
    }

    public bool VerifyPassword(User user, string password)
    {
        var parts = user.Password.Split('.');
        var salt = Convert.FromBase64String(parts[0]);
        var storedHash = Convert.FromBase64String(parts[1]);

        var hashedPassword = KeyDerivation.Pbkdf2(
            password: password,
            salt: salt,
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount:  10000,
            numBytesRequested: storedHash.Length);

        return hashedPassword.SequenceEqual(storedHash);
    }


    public IEnumerable<User> GetAll()
    {
        return _context.Users
        .Include(p => p.Clients)
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
        newUser.Password = HashPassword(newUser.Password);
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

        if (updatedUser.Password != null)
        {
            userUpdating.Password = HashPassword(updatedUser.Password);
        }

        userUpdating.FirstName = updatedUser.FirstName ?? userUpdating.FirstName;
        userUpdating.LastName = updatedUser.LastName ?? userUpdating.LastName;
        userUpdating.Email = updatedUser.Email ?? userUpdating.Email;
        _context.SaveChanges();
    }

    public bool AddClient(int clientId, int userId)
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
        return true;
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

    public void RemoveClientFromUser(int clientId, int userId)
    {
        var userUpdating = _context.Users.Include(c => c.Clients).SingleOrDefault(u => u.Id == userId);

        if(userUpdating is null )
        {
            throw new InvalidOperationException("User doesn't exist");
        }

        var clientUpdating = userUpdating?.Clients?.SingleOrDefault(c => c.Id == clientId);

        if(clientUpdating is null)
        {
            throw new InvalidOperationException("Client doesn't exist");
        }
        userUpdating?.Clients?.Remove(clientUpdating);
         _context.SaveChanges();
    }

}