using System.ComponentModel.DataAnnotations;

namespace StimuliApp.Models;

public class User
{
    public int Id { get; set; }
    [Required]
    [MaxLength(100)]
    public string? FirstName {get;set;}
    [Required]
    [MaxLength(100)]
    public string? LastName { get; set; }
    
    [Required]
    public string? Email { get; set; }

    [Required]
    public string? Password { get; set; }
    public ICollection<Client>? Clients { get; set; }
}