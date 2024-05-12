using System.Net;
using Newtonsoft.Json;
using RestSharp;
using TouristCompany.Models.DTOs;
using TouristCompany.Models.DTOs.Category;

namespace TouristCompany.Test;

internal class Category
{
    public Guid Id { get; set; }
}

[TestFixture]
public class CategoryApiTests
{
    private readonly RestClient _client = new(BaseUrl);
    private const string BaseUrl = "http://localhost:5143";
    private Guid _categoryId;

    [Test, Order(2)]
    public void GetAllCategories_ShouldReturnListOfCategories()
    {
        var request = new RestRequest("/api/category", Method.Get);

        var response = _client.Execute(request);
        
        Assert.Multiple(() =>
        {
            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK));
            Assert.That(response.Content, Is.Not.Empty);
        });
    }

    [Test, Order(3)]
    public void GetCategoryById_ShouldReturnCategory()
    {
        var request = new RestRequest($"/api/Category/{_categoryId}", Method.Get);
            
        var response = _client.Execute(request);
        Assert.Multiple(() =>
        {
            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK));
            Assert.That(response.Content, Is.Not.Null);
        });
    }

    [Test, Order(1)]
    public void AddCategory_ShouldReturnStatusCodeCreated()
    {
        var request = new RestRequest("/api/category", Method.Post);
        request.AddJsonBody(new CategoryCreationDto()
        {
            Name = "Новая категория",
            Description = "Тестовая котегория"
        });

        var response = _client.Execute(request);
        
        _categoryId = JsonConvert.DeserializeObject<Category>(response.Content).Id;

        Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.Created));
    }

    [Test, Order(4)]
    public void UpdateCategory_ShouldReturnStatusCodeNoContent()
    {
        var request = new RestRequest($"/api/category/{_categoryId}", Method.Put);
        request.AddBody(new CategoryUpdateDto()
        {
            Name = "Обновлённая тестовая категория",
            Description = "Обновлённое описание категории"
        });

        var response = _client.Execute(request);

        Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.NoContent));
    }

    [Test, Order(5)]
    public void DeleteCategory_ShouldReturnStatusCodeNoContent()
    {
        var request = new RestRequest($"/api/Category/{_categoryId}", Method.Delete);

        var response = _client.Execute(request);

        Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.NoContent));
    }
}