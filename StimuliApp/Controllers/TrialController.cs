using StimuliApp.Services;
using StimuliApp.Models;
using Microsoft.AspNetCore.Mvc;

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
}