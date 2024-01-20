using System;
using System.Collections.Generic;
using System.IO;
using System.Runtime.Serialization;
using ServiceStack;
using ServiceStack.DataAnnotations;
using ServiceStack.Web;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceModel;

[Route("/config"), Tag(Tags.Site)]
public class GetConfig : IReturn<GetConfigResponse>, IGet {}

public class GetConfigResponse
{
    public List<Option> AllTiers { get; set; }
    public List<Option> AllPostTypes { get; set; }
    public List<Option> AllFlagTypes { get; set; }
}

[Route("/overview"), Tag(Tags.Site)]
public class Overview : IReturn<OverviewResponse>, IGet
{
    public bool Reload { get; set; }
}

public class OverviewResponse
{
    public DateTime Created { get; set; }
    public List<UserInfo> TopUsers { get; set; }
    public List<TechnologyInfo> TopTechnologies { get; set; }
    public List<TechStackDetails> LatestTechStacks { get; set; }
    public List<TechnologyStack> PopularTechStacks { get; set; }
    public List<OrganizationInfo> AllOrganizations { get; set; }

    public Dictionary<string, List<TechnologyInfo>> TopTechnologiesByTier { get; set; }

    public ResponseStatus ResponseStatus { get; set; }
}

[Route("/app-overview"), Tag(Tags.Site)]
public class AppOverview : IReturn<AppOverviewResponse>, IGet
{
    public bool Reload { get; set; }
}

public class AppOverviewResponse
{
    public DateTime Created { get; set; }
    public List<Option> AllTiers { get; set; }
    public List<TechnologyInfo> TopTechnologies { get; set; }

    public ResponseStatus ResponseStatus { get; set; }
}

[DataContract]
public class Option
{
    [DataMember(Name = "name")]
    public string Name { get; set; }

    [DataMember(Name = "title")]
    public string Title { get; set; }

    [DataMember(Name = "value")]
    public TechnologyTier? Value { get; set; }
}

public class UserInfo
{
    public string UserName { get; set; }
    public string AvatarUrl { get; set; }
    public int StacksCount { get; set; }
}
    
[Route("/prerender/{**Path}", "PUT"), Tag(Tags.Site)]
public class StorePreRender : IRequiresRequestStream, IReturnVoid, IPut
{
    public string Path { get; set; }
        
    public Stream RequestStream { get; set; }
}

[Route("/prerender/{**Path}", "GET"), Tag(Tags.Site)]
public class GetPreRender : IReturn<string>, IGet
{
    public string Path { get; set; }
}

public class PreRender
{
    [PrimaryKey]
    public string Path { get; set; }
        
    public byte[] Data { get; set; }
        
    public string ContentType { get; set; }
        
    public DateTime Created { get; set; }
    public string CreatedBy { get; set; }
        
    public DateTime Modified { get; set; }
    public string ModifiedBy { get; set; }
}
    
    
[Route("/prerender/sites"), Tag(Tags.Site)]
public class GetPathsToRender : IGet {}

public class GetPathsToRenderResponse
{
    public List<string> Results { get; set; }
}