using Newtonsoft.Json;
using RestSharp;
using TouristCompany.Models.DTOs;

namespace TouristCompany.Test;

internal class User
{
    public Guid Id { get; set; }
    public string FirstName { get; set;  }
}

[TestFixture]
public class UserApiTests
{
    private readonly RestClient _client = new(BaseUrl);
    private const string BaseUrl = "http://localhost:5143";
    private Guid currentUserId;

    [Test, Order(4)]
    public void GetAllUsers()
    {
        var request = new RestRequest("/api/user", Method.Get);

        var response = _client.Execute(request);
        Assert.That(response.StatusCode, Is.EqualTo(System.Net.HttpStatusCode.OK));
    }
    
    [Test, Order(1)]
    public void CreateUser_ShouldReturnStatusCode200()
    {
        var request = new RestRequest("/api/registration", Method.Post);
        request.AddJsonBody(new RegistrationDto()
        {
            FirstName = "John",
            LastName = "Doe",
            Patronymic = "",
            Email = "john1@example.com",
            Password = "password123",
            ConfirmPassword = "password123"
        });

        var response = _client.Execute(request);

        currentUserId = JsonConvert.DeserializeObject<User>(response.Content).Id;
        
        Assert.That(response.StatusCode, Is.EqualTo(System.Net.HttpStatusCode.OK));
    }

    [Test, Order(2)]
    public void GetUserById_ShouldReturnStatusCode200()
    {
        var getUserRequest = new RestRequest($"/api/user/{currentUserId}");

        var response = _client.Execute(getUserRequest);

        Assert.That(response.StatusCode, Is.EqualTo(System.Net.HttpStatusCode.OK));
    }

    [Test, Order(3)]
    public void UpdateUser_ShouldReturnStatusCode200()
    {
        var updateUserRequest = new RestRequest($"/api/user/{currentUserId}", Method.Put);
        updateUserRequest.AddJsonBody(new
        {
            Id = currentUserId,
            FirstName = "UpdatedName1",
            LastName = "Doe1",
            Email = "jane12@example.com",
            Password = "password456"
        });

        var response = _client.Execute(updateUserRequest);

        Assert.That(response.StatusCode, Is.EqualTo(System.Net.HttpStatusCode.NoContent));
    }

    [Test, Order(5)]
    public void DeleteUser_ShouldReturnStatusCode204()
    {
        var deleteUserRequest = new RestRequest($"/api/user/{currentUserId}", Method.Delete);

        var response = _client.Execute(deleteUserRequest);

        Assert.That(response.StatusCode, Is.EqualTo(System.Net.HttpStatusCode.NoContent));
    }
}