using StimuliApp.Models;
using StimuliApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace StimuliApp.Controllers;

[ApiController]
[Route("/api/[controller]")]

public class StimuliController : ControllerBase
{
    StimuliService _service;

    public StimuliController(StimuliService service)
    {
        _service = service;
    }

    [HttpGet]
    public IEnumerable<Stimuli> GetAll()
    {
        return _service.GetAll();
    }

    [HttpGet("{id}")]
    public ActionResult<Stimuli> GetById(int id)
    {
        var stimuli = _service.GetById(id);
        if (stimuli is not null)
        {
            return stimuli;
        } 
        else 
        {
            return NotFound();
        }
    }

    [HttpPost]
    public IActionResult Create(Stimuli newStim)
    {
        var stim = _service.Create(newStim);
        return CreatedAtAction(nameof(GetById), new { id = stim?.Id}, stim);
    }

    [HttpPut]
    public IActionResult Update(int id, Stimuli updatedStim)
    {
        var stim = _service.GetById(id);
        if(stim is not null)
        {
            updatedStim.Id = id;
            _service.Update(updatedStim);
            return NoContent();
        } 
        else 
        {
            return NotFound();
        }
    }

    [HttpPut("{id}/addstimset")]
    public IActionResult AddStimSet(int id, int StimSetId)
    {
        var stimUpdate = _service.GetById(id);
        if(stimUpdate is not null)
        {
            _service.AddStimSet(id, StimSetId);
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
        var stim = _service.GetById(id);
        if (stim is not null)
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
