using StimuliApp.Services;
using StimuliApp.Models;
using Microsoft.AspNetCore.Mvc;
using StimuliApp.Migrations;

namespace StimuliApp.Controllers;
[ApiController]
[Route("/api/[controller]")]


public class TrialController : ControllerBase
{
    TrialService _service;
    public TrialController(TrialService service)
    {
        _service = service;
    }

    [HttpGet] 
    public IEnumerable<Trial> GetAll()
    {
        return _service.GetAll();
    }

    [HttpGet("{id}")]
    public ActionResult<Trial> GetById(int id)
    {
        var trial = _service.GetById(id);
        if(trial is not null )
        {
            return trial;
        } else
        {
            return NotFound();
        }
    }

    [HttpPost]
    public IActionResult Create(Trial newTrial)
    {
       var trial = _service.Create(newTrial);
        if (trial == null)
        {
            
            return BadRequest("The trial could not be created.");
        }
        return CreatedAtAction(nameof(GetById), new { id = trial.Id }, trial);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var trial = _service.GetById(id);
        if(trial is not null)
        {
            _service.DeleteById(id);
            return Ok();
        } else 
        {
            return NotFound();
        }
    }

     [HttpPut("{trialId}/addclient/{clientId}")]
        public IActionResult AddTrialToClient(int trialId, int clientId)
        {
            try
            {
               
                var trial = _service.GetById(trialId);
                if (trial == null)
                {
                    return NotFound("Trial not found.");
                }

                _service.AddToClient(trial, clientId);
                return Ok("Trial added to client successfully.");
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    [HttpGet("trials")]
    public ActionResult<IEnumerable<Trial>> GetTrialsByDateAndClientAndStimSet([FromQuery] DateTime date, [FromQuery] int clientId, [FromQuery] int stimSetId)
    {
        var trials = _service.GetByDateAndClientAndStimSet(date, clientId, stimSetId);
        if (trials.Any())
        {
            return Ok(trials);
        }
        else
        {
            return NotFound();
        }
    }

    [HttpGet("trials/date-range")]
    public ActionResult<IEnumerable<Trial>> GetTrialsByDateRange([FromQuery] DateTime startDate, [FromQuery] DateTime endDate, int clientId, int stimSetId)
    {
        var trials = _service.GetTrialsWithDateRange(startDate, endDate, clientId, stimSetId);
        if (trials.Any())
        {
            return Ok(trials);  
        }
        else 
        { 
            return NotFound();
        }
    }
}