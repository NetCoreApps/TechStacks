using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using ServiceStack;
using ServiceStack.DataAnnotations;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceModel;

[QueryDb(QueryTerm.Or)]
[Route("/techstacks/search"), Tag(Tags.AutoQuery), Tag(Tags.TechStacks)]
[AutoQueryViewer(
    Title = "Find Technology Stacks", Description = "Explore different Technology Stacks",
    IconUrl = "material-icons:cloud",
    DefaultSearchField = "Description", DefaultSearchType = "Contains", DefaultSearchText = "ServiceStack")]
public class FindTechStacks : QueryDb<TechnologyStack,TechnologyStackView>
{
    public List<long> Ids { get; set; }
    public string Name { get; set; }
    public string VendorName { get; set; }
    public string NameContains { get; set; }
    public string VendorNameContains { get; set; }
    public string DescriptionContains { get; set; }
}

[Route("/techstacks/query"), Tag(Tags.AutoQuery), Tag(Tags.TechStacks)]
public class QueryTechStacks : QueryDb<TechnologyStack,TechnologyStackView>
{
    public List<long> Ids { get; set; }
    public string Name { get; set; }
    public string VendorName { get; set; }
    public string NameContains { get; set; }
    public string VendorNameContains { get; set; }
    public string DescriptionContains { get; set; }
}

[Route("/techstacks/{Slug}", Verbs = "GET"), Tag(Tags.TechStacks)]
public class GetTechnologyStack : IReturn<GetTechnologyStackResponse>, IRegisterStats, IGet
{
    public string Slug { get; set; }

    [IgnoreDataMember]
    public long Id
    {
        set => Slug = value.ToString();
    }

    public string GetStatsId() => "/stack/" + Slug;
}

public class GetTechnologyStackResponse
{
    public DateTime Created { get; set; }

    public TechStackDetails Result { get; set; }

    public ResponseStatus ResponseStatus { get; set; }
}

[Route("/techstacks/{Slug}/previous-versions", Verbs = "GET"), Tag(Tags.TechStacks)]
public class GetTechnologyStackPreviousVersions : IReturn<GetTechnologyStackPreviousVersionsResponse>, IGet
{
    public string Slug { get; set; }

    [IgnoreDataMember]
    public long Id
    {
        set => Slug = value.ToString();
    }
}

public class GetTechnologyStackPreviousVersionsResponse
{
    public List<TechnologyStackHistory> Results { get; set; }
}

[Route("/techstacks", Verbs = "POST"), Tag(Tags.TechStacks)]
public class CreateTechnologyStack : IReturn<CreateTechnologyStackResponse>, IPost
{
    public string Name { get; set; }
    public string Slug { get; set; }
    public string VendorName { get; set; }
    public string AppUrl { get; set; }
    public string ScreenshotUrl { get; set; }
    public string Description { get; set; }
    public string Details { get; set; }
    public bool IsLocked { get; set; }

    public List<long> TechnologyIds { get; set; }
}

public class CreateTechnologyStackResponse
{
    public TechStackDetails Result { get; set; }

    public ResponseStatus ResponseStatus { get; set; }
}

[Route("/techstacks/{Id}", Verbs = "PUT"), Tag(Tags.TechStacks)]
public class UpdateTechnologyStack : IReturn<UpdateTechnologyStackResponse>, IPut
{
    public long Id { get; set; }

    public string Name { get; set; }
    public string VendorName { get; set; }
    public string AppUrl { get; set; }
    public string ScreenshotUrl { get; set; }
    public string Description { get; set; }
    public string Details { get; set; }
    public bool IsLocked { get; set; }

    public List<long> TechnologyIds { get; set; }
}

public class UpdateTechnologyStackResponse
{
    public TechStackDetails Result { get; set; }

    public ResponseStatus ResponseStatus { get; set; }
}

[Route("/techstacks/{Id}", Verbs = "DELETE"), Tag(Tags.TechStacks)]
public class DeleteTechnologyStack : IReturn<DeleteTechnologyStackResponse>, IDelete
{
    public long Id { get; set; }
}

public class DeleteTechnologyStackResponse
{
    public TechStackDetails Result { get; set; }

    public ResponseStatus ResponseStatus { get; set; }
}

[Route("/techstacks", Verbs = "GET"), Tag(Tags.TechStacks)]
public class GetAllTechnologyStacks : IReturn<GetAllTechnologyStacksResponse>, IGet
{
}

public class GetAllTechnologyStacksResponse
{
    public List<TechnologyStack> Results { get; set; }
    public long Total { get; set; }
}

[Route("/techstacks/{Slug}/favorites"), Tag(Tags.TechStacks)]
public class GetTechnologyStackFavoriteDetails : IReturn<GetTechnologyStackFavoriteDetailsResponse>, IGet
{
    public string Slug { get; set; }
}

public class GetTechnologyStackFavoriteDetailsResponse
{
    public List<string> Users { get; set; }
    public int FavoriteCount { get; set; }
}

public class TechStackDetails : TechnologyStackBase
{
    public List<TechnologyInStack> TechnologyChoices { get; set; }
}

public class TechnologyInStack : TechnologyBase
{
    public long TechnologyId { get; set; }
    public long TechnologyStackId { get; set; }
    public string Justification { get; set; }
}

public class TechnologyInfo
{
    public TechnologyTier Tier { get; set; }
    public string Slug { get; set; }
    public string Name { get; set; }
    public string LogoUrl { get; set; }
    public int StacksCount { get; set; }
}

public class OrganizationInfo
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Slug { get; set; }
    public long? RefId { get; set; }
    public string RefSource { get; set; }
    public long? UpVotes { get; set; }
    public long? DownVotes { get; set; }
    public long MembersCount { get; set; }
    public int Rank { get; set; }
    public bool? DisableInvites { get; set; }
    public string Lang { get; set; }
    public string[] PostTypes { get; set; }
    public string[] ModeratorPostTypes { get; set; }
    public DateTime? Locked { get; set; }
    public List<LabelInfo> Labels { get; set; }
    public List<CategoryInfo> Categories { get; set; }
}

public class CategoryInfo
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Slug { get; set; }
}

public class LabelInfo
{
    public string Slug { get; set; }
    public string Color { get; set; }
}

[Description("Limit updates to TechStack to Owner or Admin users")]
[Route("/admin/techstacks/{TechnologyStackId}/lock"), Tag(Tags.TechStacks)]
public class LockTechStack : IReturn<LockStackResponse>, IPut
{
    [ValidateGreaterThan(0)]
    public long TechnologyStackId { get; set; }
    public bool IsLocked { get; set; }
}

public class LockStackResponse {}