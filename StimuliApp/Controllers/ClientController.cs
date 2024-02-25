using StimuliApp.Services;
using StimuliApp.Models;
using Microsoft.AspNetCore.Mvc;


namespace StimuliApp.Controllers;

[ApiController]
[Route("/swagger/[controller]")]

public class ClientController : ControllerBase
{
   ClientService _service;

    public ClientController(ClientService service)
    {
        _service = service;
    }

    [HttpGet]
    public IEnumerable<Client> GetAll()
    {
        return _service.GetAll();
    }

    [HttpGet("{id}")]
    public ActionResult<Client> GetById(int id)
    {
        var client = _service.GetById(id);
        if(client is not null)
        {
            return client;
        } else 
        {
            return NotFound();
        }
    }


    [HttpPost]
    public IActionResult Create(Client newClient)
    {
        var client = _service.Create(newClient);
        return CreatedAtAction(nameof(GetById), new { id = client!.Id}, client);
    }


    [HttpPut]
    public IActionResult Update(int id, Client updatedClient)
    {
        var client = _service.GetById(id);
        if(client is not null)
        {
            updatedClient.Id = id;
            _service.Update(updatedClient);
            return NoContent();
        }
        else 
        {
            return NotFound();
        }
    }

    [HttpPut("{id}/adduser")]
    public IActionResult AddUser(int id, int userId)
    {
        var clientUpdate = _service.GetById(id);
        if(clientUpdate is not null)
        {
            _service.AddUser(id, userId);
            return NoContent();
        } 
        else 
        {
            return NotFound();
        }
    }

    [HttpPut("{id}/addset")]
    public IActionResult AddSet(int id, int StimSetId)
    {
        var clientUpdate = _service.GetById(id);
        if(clientUpdate is not null)
        {
            _service.AddSet(id, StimSetId);
            return NoContent();
        } else 
        {
            return NotFound();
        }

    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var client = _service.GetById(id);
        if(client is not null)
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