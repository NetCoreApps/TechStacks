using System;
using System.Collections.Generic;
using ServiceStack.DataAnnotations;

namespace TechStacks.ServiceModel.Types;

public abstract class TechnologyStackBase
{
    [AutoIncrement]
    public long Id { get; set; }

    public string Name { get; set; }
    public string VendorName { get; set; }
    public string Description { get; set; }
    public string AppUrl { get; set; }
    public string ScreenshotUrl { get; set; }

    public DateTime Created { get; set; }
    public string CreatedBy { get; set; }
    public DateTime LastModified { get; set; }
    public string LastModifiedBy { get; set; }

    public bool IsLocked { get; set; }

    public string OwnerId { get; set; }

    [Index]
    public string Slug { get; set; }

    [StringLength(StringLengthAttribute.MaxText)]
    public string Details { get; set; }

    [StringLength(StringLengthAttribute.MaxText)]
    public string DetailsHtml { get; set; }

    public DateTime? LastStatusUpdate { get; set; }

    public int? OrganizationId { get; set; }

    public long? CommentsPostId { get; set; }

    [Default(0)]
    public int ViewCount { get; set; }

    [Default(0)]
    public int FavCount { get; set; }
}

public class TechnologyStack : TechnologyStackBase {}

public class TechnologyStackHistory : TechnologyStackBase
{
    public long TechnologyStackId { get; set; }
    public string Operation { get; set; }
    public List<long> TechnologyIds { get; set; }
}

public class TechnologyChoice
{
    [AutoIncrement]
    public long Id { get; set; }

    [References(typeof(Technology))]
    public long TechnologyId { get; set; }

    [Reference]
    public Technology Technology { get; set; }

    [References(typeof(TechnologyStack))]
    public long TechnologyStackId { get; set; }

    [Reference]
    public TechnologyStack TechnologyStack { get; set; }

    public string CreatedBy { get; set; }
    public string LastModifiedBy { get; set; }
    public string OwnerId { get; set; }
}

public abstract class TechnologyBase
{
    [AutoIncrement]
    public long Id { get; set; }

    public string Name { get; set; }
    public string VendorName { get; set; }
    public string VendorUrl { get; set; }
    public string ProductUrl { get; set; }
    public string LogoUrl { get; set; }
    public string Description { get; set; }

    public DateTime Created { get; set; }
    public string CreatedBy { get; set; }
    public DateTime LastModified { get; set; }
    public string LastModifiedBy { get; set; }
    public string OwnerId { get; set; }

    [Index]
    public string Slug { get; set; }

    public bool LogoApproved { get; set; }
    public bool IsLocked { get; set; }

    public TechnologyTier Tier { get; set; }

    public DateTime? LastStatusUpdate { get; set; }

    public int? OrganizationId { get; set; }

    public long? CommentsPostId { get; set; }

    [Default(0)]
    public int ViewCount { get; set; }

    [Default(0)]
    public int FavCount { get; set; }
}

public class Technology : TechnologyBase {}

public class TechnologyHistory : TechnologyBase
{
    public long TechnologyId { get; set; }
    public string Operation { get; set; }
}

public enum TechnologyTier
{
    [Description("Programming Languages")]
    ProgrammingLanguage,

    [Description("Client Libraries")]
    Client,

    [Description("HTTP Server Technologies")]
    Http,
        
    [Description("Server Libraries")]
    Server,

    [Description("Databases and NoSQL Datastores")]
    Data,
        
    [Description("Server Software")]
    SoftwareInfrastructure,
        
    [Description("Operating Systems")]
    OperatingSystem,
        
    [Description("Cloud/Hardware Infrastructure")]
    HardwareInfrastructure,

    [Description("3rd Party APIs/Services")]
    ThirdPartyServices,
}

// TechnologyStack with all value types optional so they're not returned in custom Fields queries
public class TechnologyStackView
{
    public long? Id { get; set; }
    public string Name { get; set; }
    public string VendorName { get; set; }
    public string Description { get; set; }
    public string AppUrl { get; set; }
    public string ScreenshotUrl { get; set; }
    public DateTime? Created { get; set; }
    public string CreatedBy { get; set; }
    public DateTime? LastModified { get; set; }
    public string LastModifiedBy { get; set; }
    public bool? IsLocked { get; set; }
    public string OwnerId { get; set; }
    public string Slug { get; set; }
    public string Details { get; set; }
    public string DetailsHtml { get; set; }
    public DateTime? LastStatusUpdate { get; set; }
    public int? OrganizationId { get; set; }
    public long? CommentsPostId { get; set; }
    public int? ViewCount { get; set; }
    public int? FavCount { get; set; }
}

// Technology with all value types optional so they're not returned in custom Fields queries
public class TechnologyView
{
    public long? Id { get; set; }
    public string Name { get; set; }
    public string VendorName { get; set; }
    public string VendorUrl { get; set; }
    public string ProductUrl { get; set; }
    public string LogoUrl { get; set; }
    public string Description { get; set; }
    public DateTime? Created { get; set; }
    public string CreatedBy { get; set; }
    public DateTime? LastModified { get; set; }
    public string LastModifiedBy { get; set; }
    public string OwnerId { get; set; }
    public string Slug { get; set; }
    public bool? LogoApproved { get; set; }
    public bool? IsLocked { get; set; }
    public TechnologyTier? Tier { get; set; }
    public DateTime? LastStatusUpdate { get; set; }
    public int? OrganizationId { get; set; }
    public long? CommentsPostId { get; set; }
    public int? ViewCount { get; set; }
    public int? FavCount { get; set; }
}