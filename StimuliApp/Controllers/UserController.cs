using StimuliApp.Services;
using StimuliApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace StimuliApp.Controllers;

[ApiController]
[Route("/api/[controller]")]

public class UserController : ControllerBase
{
    UserService _service;
    public UserController(UserService service)
    {
        _service = service;
    }

    [HttpGet]
    public IEnumerable<User> GetAll()
    {
        return _service.GetAll();
    }

    [HttpGet("{id}")]
    public ActionResult<User> GetById(int id) 
    {
        var user = _service.GetById(id);
        if(user is not null)
        {
            return user;
        } 
        else 
        {
            return NotFound();
        }
    }

    [HttpPost]
    public IActionResult Create(User newUser)
    {
        var user = _service.Create(newUser);
        return CreatedAtAction(nameof(GetById), new { id = user!.Id}, user);
    }

    [HttpPut]
    public IActionResult Update(int id, User updatedUser)
    {
        var user = _service.GetById(id);
        if(user is not null)
        {
            updatedUser.Id = id;
            _service.Update(updatedUser);
            return NoContent();
        } 
        else 
        {
            return NotFound();
        }
    }

    [HttpPut("{id}/addclient")]
    public IActionResult AddClient(int id, int clientId)
    {
        var userUpdate = _service.GetById(id);
        if(userUpdate is not null) 
        {
            _service.AddClient(id, clientId);
            return NoContent();

        } 
        else 
        {
            return NotFound();
        }
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var user = _service.GetById(id);
        if (user is not null)
        {
            _service.DeleteById(id);
            return Ok();
        }
        else 
        {
            return NotFound();
        }
    }


}