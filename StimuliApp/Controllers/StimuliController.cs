using StimuliApp.Models;
using StimuliApp.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
public async Task<IActionResult> Create([FromForm]Stimuli newStim, [FromForm]IFormFile? file = null)
    {
        try{
            if(file != null)
            {
                string imageUrl = await _service.UploadImageToS3Async(file);
                newStim.Image = imageUrl; 

            }

        var stim = _service.Create(newStim);
        return CreatedAtAction(nameof(GetById), new { id = stim?.Id}, stim);

        } catch(Exception e) {
            return StatusCode(StatusCodes.Status500InternalServerError, $"An error occurred while trying to create stimuli: {e.Message}");
        }
    }

    [HttpPut("{id}/update")]
public async Task<IActionResult> Update(int id, [FromForm]Stimuli updatedStim, [FromForm]IFormFile? file = null)
    
    {
        try
        {
            var stim = _service.GetById(id);
            if (stim is not null)
            {
                updatedStim.Id = id;
                if (file != null)
                {
                    string imageUrl = await _service.UploadImageToS3Async(file);
                    updatedStim.Image = imageUrl;
                }
                await _service.UpdateAsync(updatedStim);
            return Ok(updatedStim);
            }
            else
            {
                return NotFound();
            }
        }
        catch (DbUpdateConcurrencyException)
        {
            // Handle concurrency exceptions
            if (!_service.StimuliExists(id))
            {
                return NotFound();
            }
            else
            {
                return StatusCode(409, "Conflict occurred, please try again.");
            }
        }
        catch (Exception)
        {
            return StatusCode(500, "Internal server error");
        }
    }


    [HttpPut("{id}/addstimset/{StimSetId}")]
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
            Console.WriteLine(id);
            Console.WriteLine(StimSetId);
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
