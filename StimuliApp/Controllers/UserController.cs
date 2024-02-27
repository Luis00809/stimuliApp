using StimuliApp.Services;
using StimuliApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace StimuliApp.Controllers;

[ApiController]
[Route("/api/[controller]")]

public class UserController : ControllerBase
{
    private UserService _service;
    private JwtService _jwtService; // Add a field for JwtService

    public UserController(UserService service, JwtService jwtService) // Inject JwtService
    {
        _service = service;
        _jwtService = jwtService; // Initialize the JwtService field
    }



[HttpPost("authenticate")]
public IActionResult Authenticate([FromBody] AuthenticationRequest request)
{
    string email = request.Email;
    string password = request.Password;
    // Use the UserService to find the user by email
    var user = _service.GetByEmail(email);
    if (user == null)
    {
        return Unauthorized();
    }

    // Assuming you have a method in UserService to verify the password
    bool isPasswordCorrect = _service.VerifyPassword(user, password);

    if (isPasswordCorrect)
    {
        // Password is correct, proceed with authentication
        string token = _jwtService.GenerateToken(user);
        
        var response = new AuthenticationResponse
        {
            Token = token,
            Id = user.Id,
            Email = user.Email
        };
        return Ok(response);    }
    else
    {
        return Unauthorized();
    }
}


    [HttpGet]
    public IEnumerable<User> GetAll()
    {
        return _service.GetAll();
    }

    [HttpGet("{id}")]
    public ActionResult<User> GetById(int id) 
    {
        var user = _service.GetById(id);
        if(user is not null)
        {
            return user;
        } 
        else 
        {
            return NotFound();
        }
    }

    [HttpPost]
    public IActionResult Create(User newUser)
    {
        var user = _service.Create(newUser);
        if (user == null)
        {
            return BadRequest(); // Adjust this based on your service's behavior
        }

        // Generate JWT token for the newly created user
        string token = _jwtService.GenerateToken(user);
        return CreatedAtAction(nameof(GetById), new { id = user.Id }, new { user, token });
    }

    [HttpPut]
    public IActionResult Update(int id, User updatedUser)
    {
        var user = _service.GetById(id);
        if(user is not null)
        {
            updatedUser.Id = id;
            _service.Update(updatedUser);
            return NoContent();
        } 
        else 
        {
            return NotFound();
        }
    }

    [HttpPut("{id}/addclient")]
    public IActionResult AddClient(int id, int clientId)
    {
        var userUpdate = _service.GetById(id);
        if(userUpdate is not null) 
        {
            _service.AddClient(id, clientId);
            return NoContent();

        } 
        else 
        {
            return NotFound();
        }
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var user = _service.GetById(id);
        if (user is not null)
        {
            _service.DeleteById(id);
            return Ok();
        }
        else 
        {
            return NotFound();
        }
    }


}