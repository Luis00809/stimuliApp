using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using StimuliApp.Models;

public class JwtService
{
    private readonly IConfiguration _configuration;

    public JwtService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GenerateToken(User user)
    {
        var secretKey = _configuration["JwtToken:SecretKey"];
        var tokenExpiry = _configuration["JwtToken:TokenExpiry"];

        if (string.IsNullOrEmpty(secretKey) || string.IsNullOrEmpty(tokenExpiry))
        {
            throw new InvalidOperationException("JwtToken:SecretKey or JwtToken:TokenExpiry is not set in the configuration.");
        }

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(secretKey);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, user.Email) }),
            Expires = DateTime.UtcNow.AddMinutes(Convert.ToDouble(tokenExpiry)),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}
