using System.ComponentModel.DataAnnotations;

namespace StimuliApp.Models;

public class Stimuli
{
    public int Id { get; set; }

    [Required]
    public string? Name { get; set; }
    public ICollection<StimSet>? StimSets { get; set; }

}