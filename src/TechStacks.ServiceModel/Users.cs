using System.Collections.Generic;
using ServiceStack;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceModel
{
    [Route("/favorites/techtacks", Verbs = "GET")]
    public class GetFavoriteTechStack : IReturn<GetFavoriteTechStackResponse>
    {
        public int TechnologyStackId { get; set; }
    }
    public class GetFavoriteTechStackResponse
    {
        public List<TechnologyStack> Results { get; set; }
    }

    [Route("/favorites/techtacks/{TechnologyStackId}", Verbs = "PUT")]
    public class AddFavoriteTechStack : IReturn<FavoriteTechStackResponse>
    {
        public int TechnologyStackId { get; set; }
    }

    [Route("/favorites/techtacks/{TechnologyStackId}", Verbs = "DELETE")]
    public class RemoveFavoriteTechStack : IReturn<FavoriteTechStackResponse>
    {
        public int TechnologyStackId { get; set; }
    }

    public class FavoriteTechStackResponse
    {
        public TechnologyStack Result { get; set; }
    }


    [Route("/favorites/technology", Verbs = "GET")]
    public class GetFavoriteTechnologies : IReturn<GetFavoriteTechnologiesResponse>
    {
        public int TechnologyId { get; set; }
    }
    public class GetFavoriteTechnologiesResponse
    {
        public List<Technology> Results { get; set; }
    }

    [Route("/favorites/technology/{TechnologyId}", Verbs = "PUT")]
    public class AddFavoriteTechnology : IReturn<FavoriteTechnologyResponse>
    {
        public int TechnologyId { get; set; }
    }
    [Route("/favorites/technology/{TechnologyId}", Verbs = "DELETE")]
    public class RemoveFavoriteTechnology : IReturn<FavoriteTechnologyResponse>
    {
        public int TechnologyId { get; set; }
    }

    public class FavoriteTechnologyResponse
    {
        public Technology Result { get; set; }
    }

    [Route("/pagestats/{Type}/{Slug}")]
    public class GetPageStats : IReturn<GetPageStatsResponse>
    {
        public string Type { get; set; }
        public string Slug { get; set; }
        public int? Id { get; set; }
    }

    public class GetPageStatsResponse
    {
        public string Type { get; set; }
        public string Slug { get; set; }
        public long ViewCount { get; set; }
        public long FavCount { get; set; }
    }

    [Restrict(VisibleInternalOnly = true)]
    [Route("/tasks/hourly")]
    public class HourlyTask
    {
        public bool Force { get; set; }
    }

    public class HourlyTaskResponse : IMeta
    {
        public Dictionary<string, string> Meta { get; set; }

        public ResponseStatus ResponseStatus { get; set; }
    }

    [Restrict(VisibleInternalOnly = true)]
    [Route("/cache/clear")]
    public class ClearCache : IReturn<string> {}

    [Route("/users/{UserName}/avatar", "GET")]
    public class UserAvatar
    {
        public string UserName { get; set; }
    }

    [Route("/users/karma", "GET")]
    public class GetUsersKarma : IReturn<GetUsersKarmaResponse>
    {
        public int[] UserIds { get; set; }
    }

    public class GetUsersKarmaResponse
    {
        public Dictionary<int, int> Results { get; set; }

        public ResponseStatus ResponseStatus { get; set; }
    }

    public class UserRef
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }

        public int? RefId { get; set; }
        public string RefSource { get; set; }
        public string RefUrn { get; set; }
    }

    [Route("/users/by-email")]
    public class GetUsersByEmails : IReturn<GetUsersByEmailsResponse>
    {
        public string[] Emails { get; set; }
    }

    public class GetUsersByEmailsResponse
    {
        public List<UserRef> Results { get; set; }
        public ResponseStatus ResponseStatus { get; set; }
    }
    
}
