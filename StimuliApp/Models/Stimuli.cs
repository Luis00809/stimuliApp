using System.ComponentModel.DataAnnotations;

namespace StimuliApp.Models;

public class Stimuli
{
    public int Id { get; set; }

    [Required]
    public string? Name { get; set; }
    public int SetId { get; set; }

    public StimSet? Set { get; set; }

}