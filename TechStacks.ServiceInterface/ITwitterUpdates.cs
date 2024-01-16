namespace TechStacks.ServiceInterface;

public interface ITwitterUpdates
{
    string BaseUrl { get; set; }
    string Tweet(string status);
}