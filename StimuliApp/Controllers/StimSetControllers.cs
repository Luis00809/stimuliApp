using StimuliApp.Services;
using StimuliApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace StimuliApp.Controllers;

[ApiController]
[Route("/api/[controller]")]

public class StimSetController : ControllerBase
{
    StimSetService _service;
    public StimSetController(StimSetService service)
    {
        _service = service;
    }

    [HttpGet]
    public IEnumerable<StimSet> GetAll()
    {
        return _service.GetAll().Where(s => s.Public.GetValueOrDefault());
    }

    [HttpGet("{id}")]
    public ActionResult<StimSet> GetById(int id)
    {
        var stimSet = _service.GetById(id);
        if(stimSet is not null)
        {
            return stimSet;
        }
        else 
        {
            return NotFound();
        }
    }

    [HttpPost]
    public IActionResult Create(StimSet newSet)
    {
        var set = _service.Create(newSet);
        return CreatedAtAction(nameof(GetById), new { id = set!.Id}, set);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, StimSet updatedSet)
    {
        var updatingSet = _service.GetById(id);
        if(updatingSet is not null)
        {
            updatedSet.Id = id;
            _service.Update(updatedSet);
            return NoContent();
        }
        else 
        {
            return NotFound();
        }
    }

    [HttpPut("{id}/addStimuli")]
    public IActionResult AddStimuli(int id, int stimId)
    {
        var stimSetUpdating = _service.GetById(id);
        if(stimSetUpdating is not null)
        {
            _service.AddStimuli(id, stimId);
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
        var stimSetUpdating = _service.GetById(id);
        if(stimSetUpdating is not null)
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
        var stimSet = _service.GetById(id);
        if(stimSet is not null)
        {
            _service.DeleteById(id);
            return Ok();
        }
        else
        {
            return NotFound();
        }
    }

    [HttpGet("{id}/stimuli")]
    public ActionResult<IEnumerable<Stimuli>> GetStimSetsStimuli(int id)
    {
        try
        {
            var set = _service.GetById(id);
            if (set == null)
            {
                return NotFound();
            }
             return set.Stimuli?.ToList() ?? new List<Stimuli>();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred while fetching StimSets stimuli: {e.Message}");
        }
    }

    [HttpDelete("{id}/removeStimuli/{stimId}")]
    public IActionResult RemoveStimuli(int id, int stimId)
    {
        try
        {
            _service.RemoveStimuli(stimId, id);
            return NoContent();
        }
        catch (InvalidOperationException e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost("{id}/duplicate")]
    public IActionResult DuplicateStimSet(int id)
    {
        try
        {
            var newSet = _service.DuplicateStimSet(id);
            return Ok(new { id = newSet.Id });
        }
        catch (InvalidOperationException e)
        {
            return NotFound(e.Message);
        }
    }

}