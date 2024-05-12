using Newtonsoft.Json;
using RestSharp;
using TouristCompany.Models.DTOs;
using TouristCompany.Models.Entities;

namespace TouristCompany.Test;

[TestFixture]
public class CountryApiTests
{
    private readonly RestClient _client = new(BaseUrl);
    private const string BaseUrl = "http://localhost:5143";
    private Guid _currentCountryId;

    [Test, Order(4)]
    public void GetAllCountries()
    {
        var request = new RestRequest("/api/country");

        var response = _client.Execute(request);
        Assert.That(response.StatusCode, Is.EqualTo(System.Net.HttpStatusCode.OK));
    }
    
    [Test, Order(1)]
    public void CreateCountry_ShouldReturnStatusCode200()
    {
        var request = new RestRequest("/api/country", Method.Post);
        request.AddJsonBody(new CountryCreationDto()
        {
            Name = "Россия",
            Description = "Описание страны Россия",
        });

        var response = _client.Execute(request);

        _currentCountryId = JsonConvert.DeserializeObject<Country>(response.Content).Id;
        
        Assert.That(response.StatusCode, Is.EqualTo(System.Net.HttpStatusCode.Created));
    }

    [Test, Order(2)]
    public void GetCountryById_ShouldReturnStatusCode200()
    {
        var getUserRequest = new RestRequest($"/api/country/{_currentCountryId}");

        var response = _client.Execute(getUserRequest);

        Assert.That(response.StatusCode, Is.EqualTo(System.Net.HttpStatusCode.OK));
    }

    [Test, Order(3)]
    public void UpdateCountry_ShouldReturnStatusCode200()
    {
        var updateUserRequest = new RestRequest($"/api/country/{_currentCountryId}", Method.Put);
        updateUserRequest.AddJsonBody(new
        {
            
        });

        var response = _client.Execute(updateUserRequest);

        Assert.That(response.StatusCode, Is.EqualTo(System.Net.HttpStatusCode.NoContent));
    }

    [Test, Order(5)]
    public void DeleteCountry_ShouldReturnStatusCode204()
    {
        var deleteUserRequest = new RestRequest($"/api/country/{_currentCountryId}", Method.Delete);

        var response = _client.Execute(deleteUserRequest);

        Assert.That(response.StatusCode, Is.EqualTo(System.Net.HttpStatusCode.NoContent));
    }
}