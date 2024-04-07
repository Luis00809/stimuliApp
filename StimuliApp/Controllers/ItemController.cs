using StimuliApp.Services;
using StimuliApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace StimuliApp.Controllers;

[ApiController]
[Route("/api/[controller]")]

public class ItemController : ControllerBase
{
    ItemService _service;
    public ItemController(ItemService service)
    {
        _service = service;
    }

    [HttpGet]
    public IEnumerable<Item> GetAll()
    {
        return _service.GetAll();
    }

    [HttpGet("{id}")]
    public ActionResult<Item> GetById(int id)
    {
        var item = _service.GetById(id);
        if (item is not null)
        {
            return item;
        }
        else 
        {
            return NotFound();
        }
    }

    [HttpPost]
    public IActionResult Create(Item item)
    {
        var newItem = _service.Create(item);
        return CreatedAtAction(nameof(GetById), new { id = newItem!.Id }, newItem);  
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, Item item)
    {
        var updatedItem = _service.GetById(id);

        if (updatedItem is not null)
        {
            item.Id = id;
            _service.Update(item);
            return Ok(item);
        }
        else
        {
            return NotFound();
        }
    }

    [HttpPut("{id}/addStimuli")]
    public IActionResult AddStimuli(int id, int stimuliId)
    {
        var itemUpdating = _service.GetById(id);
        if (itemUpdating is not null)
        {
            _service.CategorizeStimuli(id, stimuliId);
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
        var item = _service.GetById(id);
        if (item is not null)
        {
            _service.Delete(id);
            return Ok();
        }
        else 
        {
            return NotFound();
        }
    }

    [HttpDelete("{id}/removeStimuli/{stimId}")]
    public IActionResult RemoveStimuli(int id, int stimId)
    {
        try
        {
            _service.RemoveStimuli(id, stimId);
            return NoContent();
        }
        catch (InvalidOperationException e)
        {
          return BadRequest(e.Message);
        }
    }
}
