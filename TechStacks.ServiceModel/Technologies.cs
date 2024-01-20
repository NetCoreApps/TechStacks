using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using ServiceStack;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceModel;

[QueryDb(QueryTerm.Or)]
[Route("/technology/search"), Tag(Tags.AutoQuery), Tag(Tags.Tech)]
[AutoQueryViewer(
    Title = "Find Technologies", Description = "Explore different Technologies", 
    IconUrl = "octicon:database",
    DefaultSearchField = "Tier", DefaultSearchType = "=", DefaultSearchText = "Data")]
public class FindTechnologies : QueryDb<Technology,TechnologyView>
{
    public List<long> Ids { get; set; }
    public string Name { get; set; }
    public string VendorName { get; set; }
    public string NameContains { get; set; }
    public string VendorNameContains { get; set; }
    public string DescriptionContains { get; set; }
}

[Route("/technology/query"), Tag(Tags.AutoQuery), Tag(Tags.Tech)]
public class QueryTechnology : QueryDb<Technology,TechnologyView>
{
    public List<long> Ids { get; set; }
    public string Name { get; set; }
    public string VendorName { get; set; }
    public string NameContains { get; set; }
    public string VendorNameContains { get; set; }
    public string DescriptionContains { get; set; }
}

[Route("/technology/{Slug}"), Tag(Tags.Tech)]
public class GetTechnology : IReturn<GetTechnologyResponse>, IRegisterStats, IGet
{
    public string Slug { get; set; }

    public long Id
    {
        set => Slug = value.ToString();
    }

    public string GetStatsId()
    {
        return "/tech/" + Slug;
    }
}

public class GetTechnologyResponse
{
    public DateTime Created { get; set; }

    public Technology Technology { get; set; }

    public List<TechnologyStack> TechnologyStacks { get; set; }

    public ResponseStatus ResponseStatus { get; set; }
}

[Route("/technology/{Slug}/previous-versions", Verbs = "GET"), Tag(Tags.Tech)]
public class GetTechnologyPreviousVersions : IReturn<GetTechnologyPreviousVersionsResponse>, IGet
{
    public string Slug { get; set; }

    [IgnoreDataMember]
    public long Id
    {
        set => Slug = value.ToString();
    }
}

public class GetTechnologyPreviousVersionsResponse
{
    public List<TechnologyHistory> Results { get; set; }
}

[Route("/technology", Verbs = "POST"), Tag(Tags.Tech)]
public class CreateTechnology : IReturn<CreateTechnologyResponse>, IPost
{
    public string Name { get; set; }
    public string Slug { get; set; }
    public string VendorName { get; set; }
    public string VendorUrl { get; set; }
    public string ProductUrl { get; set; }
    public string LogoUrl { get; set; }
    public string Description { get; set; }
    public bool IsLocked { get; set; }

    public TechnologyTier Tier { get; set; }
}

public class CreateTechnologyResponse
{
    public Technology Result { get; set; }

    public ResponseStatus ResponseStatus { get; set; }
}

[Route("/technology/{Id}", Verbs = "PUT"), Tag(Tags.Tech)]
public class UpdateTechnology : IReturn<UpdateTechnologyResponse>, IPut
{
    public long Id { get; set; }

    public string Name { get; set; }
    public string VendorName { get; set; }
    public string VendorUrl { get; set; }
    public string ProductUrl { get; set; }
    public string LogoUrl { get; set; }
    public string Description { get; set; }
    public bool IsLocked { get; set; }

    public TechnologyTier Tier { get; set; }
}

public class UpdateTechnologyResponse
{
    public Technology Result { get; set; }

    public ResponseStatus ResponseStatus { get; set; }
}

[Route("/technology/{Id}", Verbs = "DELETE"), Tag(Tags.Tech)]
public class DeleteTechnology : IReturn<DeleteTechnologyResponse>, IDelete
{
    public long Id { get; set; }
}

public class DeleteTechnologyResponse
{
    public Technology Result { get; set; }

    public ResponseStatus ResponseStatus { get; set; }
}

[Route("/technology", Verbs = "GET"), Tag(Tags.Tech)]
public class GetAllTechnologies : IReturn<GetAllTechnologiesResponse>, IGet {}

public class GetAllTechnologiesResponse
{
    public List<Technology> Results { get; set; }
    public long Total { get; set; }
}

[Route("/technology/{Slug}/favorites"), Tag(Tags.Tech)]
public class GetTechnologyFavoriteDetails : IReturn<GetTechnologyFavoriteDetailsResponse>, IGet
{
    public string Slug { get; set; }
}

public class GetTechnologyFavoriteDetailsResponse
{
    public List<string> Users { get; set; }
    public int FavoriteCount { get; set; }
}

[Route("/admin/technology/{TechnologyId}/logo"), Tag(Tags.Tech)]
public class LogoUrlApproval : IReturn<LogoUrlApprovalResponse>, IPut
{
    public long TechnologyId { get; set; }
    public bool Approved { get; set; }
}

public class LogoUrlApprovalResponse
{
    public Technology Result { get; set; }
}
    
[Api("Limit updates to Technology to Owner or Admin users")]
[Route("/admin/technology/{TechnologyId}/lock"), Tag(Tags.Tech)]
public class LockTech : IReturn<LockStackResponse>, IPut
{
    [ValidateGreaterThan(0)]
    public long TechnologyId { get; set; }
    public bool IsLocked { get; set; }
}

public class LockTechResponse {}