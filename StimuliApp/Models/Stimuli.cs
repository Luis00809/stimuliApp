using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StimuliApp.Models;

public class Stimuli
{
    public int Id { get; set; }

    [Required]
    public string? StimName { get; set; }
    public ICollection<StimSet>? StimSets { get; set; }

    public string? Image {get; set;}
    public string? Group { get; set; }
    public bool? Viewable { get; set; }
    
    public int? ItemId { get; set; }
    public Item? Item { get; set; }
}