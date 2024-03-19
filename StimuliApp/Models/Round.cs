using System.ComponentModel.DataAnnotations;

namespace StimuliApp.Models;

public class Round
{
    public int Id { get; set; }
    public int RoundNumber { get; set; }
    public string Target { get; set; }
    public string Answer { get; set; }

}