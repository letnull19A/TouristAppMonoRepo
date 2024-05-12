using Newtonsoft.Json;
using RestSharp;
using TouristCompany.Models.DTOs;
using TouristCompany.Models.DTOs.City;
using TouristCompany.Models.Entities;

namespace TouristCompany.Test;

[TestFixture]
public class CityApiTests
{
    private readonly RestClient _client = new(BaseUrl);
    private const string BaseUrl = "http://localhost:5143";
    private Guid _currentCityId;
    private Guid _currentCoutryId;

    [Test, Order(4)]
    public void GetAllCities()
    {
        var request = new RestRequest("/api/city");

        var response = _client.Execute(request);
        Assert.That(response.StatusCode, Is.EqualTo(System.Net.HttpStatusCode.OK));
    }
    
    [Test, Order(1)]
    public void CreateCity_ShouldReturnStatusCode200()
    {
        var requestCountry = new RestRequest("/api/country", Method.Post);
        requestCountry.AddJsonBody(new CountryCreationDto()
        {
            Name = "N",
            Description = "Описание страны N",
        });

        var responseCountry = _client.Execute(requestCountry);

        _currentCoutryId = JsonConvert.DeserializeObject<Country>(responseCountry.Content).Id;
        
        var request = new RestRequest("/api/city", Method.Post);
        request.AddBody(new CityCreationDto()
        {
            Name = "Y",
            Description = "Описание города Y",
            CountryId = _currentCoutryId
        });

        var response = _client.Execute(request);

        _currentCityId = JsonConvert.DeserializeObject<City>(response.Content).Id;
        
        Assert.That(response.StatusCode, Is.EqualTo(System.Net.HttpStatusCode.Created));
    }

    [Test, Order(2)]
    public void GetCityById_ShouldReturnStatusCode200()
    {
        var getUserRequest = new RestRequest($"/api/city/{_currentCityId}");

        var response = _client.Execute(getUserRequest);

        Assert.That(response.StatusCode, Is.EqualTo(System.Net.HttpStatusCode.OK));
    }

    [Test, Order(3)]
    public void UpdateCity_ShouldReturnStatusCode200()
    {
        var updateUserRequest = new RestRequest($"/api/city/{_currentCityId}", Method.Put);
        updateUserRequest.AddJsonBody(new CityUpdateDto()
        {
            Name = "Москва1",
            Description = "Описание города Москва - обновлено",
            CountryId = _currentCoutryId
        });

        var response = _client.Execute(updateUserRequest);

        Assert.That(response.StatusCode, Is.EqualTo(System.Net.HttpStatusCode.NoContent));
    }

    [Test, Order(5)]
    public void DeleteCity_ShouldReturnStatusCode204()
    {
        var deleteUserRequest = new RestRequest($"/api/city/{_currentCityId}", Method.Delete);

        var response = _client.Execute(deleteUserRequest);

        Assert.That(response.StatusCode, Is.EqualTo(System.Net.HttpStatusCode.NoContent));
    }
}