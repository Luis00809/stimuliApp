using System.ComponentModel.DataAnnotations;

namespace StimuliApp.Models;

public class Item
{
    public int Id { get; set; }
    public string? Category { get; set; }
    public ICollection<Stimuli>? Stimuli {get; set;}
}