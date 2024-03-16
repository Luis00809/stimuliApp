using System.ComponentModel.DataAnnotations;

namespace StimuliApp.Models;

public class Stimuli
{
    public int Id { get; set; }

    [Required]
    public string? StimName { get; set; }
    public ICollection<StimSet>? StimSets { get; set; }

    public string? Image {get; set;}
    public string? Group { get; set; }

}