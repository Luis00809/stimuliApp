using StimuliApp.Services;
using StimuliApp.Models;
using Microsoft.AspNetCore.Mvc;


namespace StimuliApp.Controllers;

[ApiController]
[Route("/api/[controller]")]

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
        if (client is not null)
        {
            // Order the trials by date, using DateTime.MaxValue as a fallback for null dates
            client.Trials = client.Trials?.OrderByDescending(t => t.Date ?? DateTime.MaxValue).ToList();
            return client;
        }
        else
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


    [HttpPut("{id}/update")]
    public IActionResult Update(int id, Client updatedClient)
    {
        var client = _service.GetById(id);
        if(client is not null)
        {
            updatedClient.Id = id;
            _service.Update(updatedClient);
            return Ok(updatedClient);
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

    [HttpPut("{id}/addset/{StimSetId}")]
    public IActionResult AddSet(int id, int StimSetId)
    {
        var clientUpdate = _service.GetById(id);
        if(clientUpdate is not null)
        {
            var result = _service.AddSet(id, StimSetId);
            if (result)
            {
                return NoContent();
            } else
            {
              return Conflict("This Client already has this stim set.");
            }
        } else 
        {
            return NotFound("The specified client or stim set doesn't exist");
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

    [HttpGet("{id}/sets")]
    public ActionResult<IEnumerable<StimSet>> GetClientSets(int id)
    {
        try
        {
            var client = _service.GetById(id);
            if (client == null)
            {
                return NotFound();
            }
            
            return client.StimSets?.ToList() ?? new List<StimSet>();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred while fetching Client's stim sets: {e.Message}");
        }
    }

    [HttpDelete("{clientId}/removeset/{setId}")]
    public IActionResult RemoveStimuli(int clientId, int setId)
    {
        try
        {
            _service.RemoveSetFromClient(clientId, setId);
            return NoContent();
        }
        catch (InvalidOperationException e)
        {
            return BadRequest(e.Message);
        }
    }

}