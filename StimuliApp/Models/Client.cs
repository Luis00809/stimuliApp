using System.ComponentModel.DataAnnotations;

namespace StimuliApp.Models;

public class Client
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string? Name { get; set; }

    public ICollection<StimSet>? StimSets { get; set; }
    public ICollection<User>? Users { get; set; }
}