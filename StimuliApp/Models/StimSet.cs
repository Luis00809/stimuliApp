using System.ComponentModel.DataAnnotations;

namespace StimuliApp.Models;

public class StimSet
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string? Title { get; set; }
    public ICollection<Stimuli>? Stimuli { get; set; }
    public ICollection<Client>? Clients { get; set; }
    public ICollection<Trial>? Trials { get; set; }
}