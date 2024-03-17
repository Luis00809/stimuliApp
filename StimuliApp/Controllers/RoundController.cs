using StimuliApp.Services;
using StimuliApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace StimuliApp.Controllers;

[ApiController]
[Route("/api/[controller]")]

public class RoundController: ControllerBase
{
    RoundService _service;

    public RoundController(RoundService service)
    {
        _service = service;
    }

    [HttpGet]
    public IEnumerable<Round> GetAll()
    {
        return _service.GetAll();
    }

    [HttpGet("{id}")]
    public ActionResult<Round> GetById(int id)
    {
        var round = _service.GetById(id);
        if(round is not null)
        {
            return round;
        } else 
        {
            return NotFound();
        }
    }

    [HttpPost]
    public IActionResult Create(Round newRound)
    {
        var round = _service.Create(newRound);
        return CreatedAtAction(nameof(GetById), new { id = round!.Id}, round);
    }

    [HttpPut("{trialId}/insert-rounds")]
        public IActionResult AddRoundsToTrial(int trialId, [FromBody] List<int> roundIds)
        {
            try
            {
                _service.addToTrial(roundIds, trialId);
                return Ok("Rounds added to trial successfully.");
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var round = _service.GetById(id);
        if (round is not null)
        {
            _service.DeleteById(id);
            return Ok();
        } else
        {
            return NotFound();
        }
    }
}