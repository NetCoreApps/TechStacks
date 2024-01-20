using System;
using Microsoft.Extensions.Configuration;
using ServiceStack;
using ServiceStack.OrmLite;
using ServiceStack.Configuration;
using TechStacks.ServiceModel;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceInterface;

[Authenticate]
public class TechnologyServicesAdmin(IConfiguration configuration) : Service
{
    public object Post(CreateTechnology request)
    {
        var slug = request.Slug;
        var existingTech = Db.Single<Technology>(q => q.Name == request.Name || q.Slug == slug);
        if (existingTech != null)
            throw new ArgumentException($"'{slug}' already exists", nameof(request.Name));

        var tech = request.ConvertTo<Technology>();
        var session = SessionAs<AuthUserSession>();
        tech.CreatedBy = session.UserName;
        tech.Created = DateTime.UtcNow;
        tech.LastModifiedBy = session.UserName;
        tech.LastModified = DateTime.UtcNow;
        tech.OwnerId = session.UserAuthId;
        tech.LogoApproved = true;
        tech.Slug = slug;
        tech.LogoUrl = request.LogoUrl;

        if (string.IsNullOrEmpty(tech.LogoUrl) && Request.Files.Length > 0)
        {
            tech.LogoUrl = Request.Files[0].UploadToImgur(configuration["oauth.imgur.ClientId"],
                nameof(tech.LogoUrl), minWidth:100, minHeight:50, maxWidth:2000, maxHeight:1000);
        }

        if (string.IsNullOrEmpty(tech.LogoUrl))
            throw new ArgumentException("Logo is Required", nameof(request.LogoUrl));

        var id = Db.Insert(tech, selectIdentity: true);
        var createdTechStack = Db.SingleById<Technology>(id);

        var history = createdTechStack.ConvertTo<TechnologyHistory>();
        history.TechnologyId = id;
        history.Operation = "INSERT";

        Db.Insert(history);

        Db.ExecuteSql(
            @"update user_activity set technology_count = (select count(*) from technology where owner_id = @userIdStr)
              where id = @userId",
            new { userId = session.GetUserId(), userIdStr = session.UserAuthId });

        Cache.FlushAll();

        return new CreateTechnologyResponse
        {
            Result = createdTechStack,
        };
    }

    public object Put(UpdateTechnology request)
    {
        var tech = Db.SingleById<Technology>(request.Id);
        if (tech == null)
            throw HttpError.NotFound("Tech not found");

        var session = SessionAs<AuthUserSession>();
        var authRepo = HostContext.AppHost.GetAuthRepository(Request);
        using (authRepo as IDisposable)
        {
            if (tech.IsLocked && !(tech.OwnerId == session.UserAuthId || session.HasRole(RoleNames.Admin, authRepo)))
                throw HttpError.Unauthorized(
                    "This Technology is locked and can only be modified by its Owner or Admins.");
        }

        tech.PopulateWith(request);
        tech.LastModifiedBy = session.UserName;
        tech.LastModified = DateTime.UtcNow;

        if (Request.Files.Length > 0)
        {
            tech.LogoUrl = Request.Files[0].UploadToImgur(configuration["oauth.imgur.ClientId"],
                nameof(tech.LogoUrl), minWidth:100, minHeight:50, maxWidth:2000, maxHeight:1000);
        }

        if (string.IsNullOrEmpty(tech.LogoUrl))
            throw new ArgumentException("Logo is Required", nameof(request.LogoUrl));

        Db.Save(tech);

        var history = tech.ConvertTo<TechnologyHistory>();
        history.TechnologyId = tech.Id;
        history.Operation = "UPDATE";
        Db.Insert(history);

        Cache.FlushAll();

        var response = new UpdateTechnologyResponse
        {
            Result = tech
        };
        return response;
    }

    public object Delete(DeleteTechnology request)
    {
        var existingTech = Db.SingleById<Technology>(request.Id);
        if (existingTech == null)
            throw HttpError.NotFound("Tech not found");

        var session = SessionAs<AuthUserSession>();
        var authRepo = HostContext.AppHost.GetAuthRepository(Request);
        using (authRepo as IDisposable)
        {
            if (existingTech.OwnerId != session.UserAuthId && !session.HasRole(RoleNames.Admin, authRepo))
                throw HttpError.Unauthorized("Only the Owner or Admins can delete this Technology");
        }

        Db.DeleteById<Technology>(request.Id);

        var history = existingTech.ConvertTo<TechnologyHistory>();
        history.TechnologyId = existingTech.Id;
        history.LastModified = DateTime.UtcNow;
        history.LastModifiedBy = session.UserName;
        history.Operation = "DELETE";
        Db.Insert(history);

        Cache.FlushAll();

        return new DeleteTechnologyResponse
        {
            Result = new Technology { Id = request.Id }
        };
    }
}