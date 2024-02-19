using System.ComponentModel.DataAnnotations;

namespace StimuliApp.Models;

public class Client
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string? Name { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; }
    public ICollection<StimSet>? ClientSet { get; set; }
}