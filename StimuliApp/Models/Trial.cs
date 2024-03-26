using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StimuliApp.Models;

public class Trial
{
    public int Id {get; set;}
    public int TotalCorrect { get; set; }
    public int TotalTrials { get; set; }
    public int CardsOnScreen { get; set; }
    public DateTime? Date { get; set; }
    public ICollection<Round>? Rounds { get; set; }

    // foreign key 
    public int? ClientId { get; set; }
    // Navigation property for the Client
    public Client? Client { get; set; }

    public int? SetId { get; set; }
    
    [ForeignKey("SetId")]
    public StimSet? StimSet { get; set; }
}