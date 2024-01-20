using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using ServiceStack;
using ServiceStack.Configuration;
using ServiceStack.OrmLite;
using TechStacks.ServiceInterface.Notifications;
using TechStacks.ServiceModel;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceInterface;

[Authenticate]
public class TechnologyStackServicesAdmin(IConfiguration configuration, IMarkdownProvider markdown) : Service
{
    public async Task<CreateTechnologyStackResponse> Post(CreateTechnologyStack request)
    {
        var slug = request.Slug;
        var existingStack = await Db.SingleAsync<TechnologyStack>(q => q.Name == request.Name || q.Slug == slug);
        if (existingStack != null)
            throw new ArgumentException($"'{slug}' already exists");

        if (string.IsNullOrEmpty(request.AppUrl) || request.AppUrl.IndexOf("://", StringComparison.Ordinal) == -1)
            throw new ArgumentException("A valid URL to the Website or App is required");

        if (string.IsNullOrEmpty(request.Description) || request.Description.Length < 100)
            throw new ArgumentException("Summary needs to be a min of 100 chars");

        var techStack = request.ConvertTo<TechnologyStack>();
        var session = SessionAs<AuthUserSession>();
        techStack.CreatedBy = session.UserName;
        techStack.LastModifiedBy = session.UserName;
        techStack.OwnerId = session.UserAuthId;
        techStack.Created = DateTime.UtcNow;
        techStack.LastModified = techStack.Created;
        techStack.Slug = slug;
        techStack.DetailsHtml = markdown.Transform(request.Details);

        if (string.IsNullOrEmpty(techStack.ScreenshotUrl) && Request.Files.Length > 0)
        {
            techStack.ScreenshotUrl = Request.Files[0].UploadToImgur(configuration["oauth.imgur.ClientId"],
                nameof(techStack.ScreenshotUrl), minWidth:858, minHeight:689, maxWidth:2600, maxHeight:2600);
        }

        if (string.IsNullOrEmpty(techStack.ScreenshotUrl))
            throw new ArgumentException("Screenshot is Required", nameof(techStack.ScreenshotUrl));

        var techIds = (request.TechnologyIds ?? new List<long>()).ToSet();

        long id;
        using (var trans = Db.OpenTransaction())
        {
            id = await Db.InsertAsync(techStack, selectIdentity: true);

            if (techIds.Count > 0)
            {
                var techChoices = request.TechnologyIds.Map(x => new TechnologyChoice
                {
                    TechnologyId = x,
                    TechnologyStackId = id,
                    CreatedBy = techStack.CreatedBy,
                    LastModifiedBy = techStack.LastModifiedBy,
                    OwnerId = techStack.OwnerId,
                });

                await Db.InsertAllAsync(techChoices);
            }

            trans.Commit();
        }

        var createdTechStack = await Db.SingleByIdAsync<TechnologyStack>(id);
        var history = createdTechStack.ConvertTo<TechnologyStackHistory>();
        history.TechnologyStackId = id;
        history.Operation = "INSERT";
        history.TechnologyIds = techIds.ToList();
        await Db.InsertAsync(history);

        await Db.ExecuteSqlAsync(@"update user_activity set 
             tech_stacks_count = (select count(*) from technology_stack where owner_id = @userIdStr)
             where id = @userId",
            new { userId = session.GetUserId(), userIdStr = session.UserAuthId });

        Cache.FlushAll();

        return new CreateTechnologyStackResponse
        {
            Result = createdTechStack.ConvertTo<TechStackDetails>(),
        };
    }

    public async Task<UpdateTechnologyStackResponse> Put(UpdateTechnologyStack request)
    {
        var techStack = await Db.SingleByIdAsync<TechnologyStack>(request.Id);
        if (techStack == null)
            throw HttpError.NotFound("Tech stack not found");

        if (string.IsNullOrEmpty(request.AppUrl) || request.AppUrl.IndexOf("://", StringComparison.Ordinal) == -1)
            throw new ArgumentException("A valid URL to the Website or App is required");

        if (string.IsNullOrEmpty(request.Description) || request.Description.Length < 100)
            throw new ArgumentException("Summary needs to be a min of 100 chars");

        var session = SessionAs<AuthUserSession>();
        var authRepo = HostContext.AppHost.GetAuthRepository(Request);
        using (authRepo as IDisposable)
        {
            if (techStack.IsLocked && !(techStack.OwnerId == session.UserAuthId || session.HasRole(RoleNames.Admin,authRepo)))
                throw HttpError.Unauthorized(
                    "This TechStack is locked and can only be modified by its Owner or Admins.");
        }

        var techIds = (request.TechnologyIds ?? []).ToSet();

        if (techStack.Details != request.Details)
        {
            techStack.DetailsHtml = markdown.Transform(request.Details);
        }

        techStack.PopulateWith(request);
        techStack.LastModified = DateTime.UtcNow;
        techStack.LastModifiedBy = session.UserName;

        if (Request.Files.Length > 0)
        {
            techStack.ScreenshotUrl = Request.Files[0].UploadToImgur(configuration["oauth.imgur.ClientId"],
                nameof(techStack.ScreenshotUrl), minWidth:858, minHeight:689, maxWidth:2600, maxHeight:2600);
        }

        if (string.IsNullOrEmpty(techStack.ScreenshotUrl))
            throw new ArgumentException("Screenshot is Required", nameof(techStack.ScreenshotUrl));

        using (var trans = Db.OpenTransaction())
        {
            await Db.SaveAsync(techStack);

            var existingTechChoices = await Db.SelectAsync<TechnologyChoice>(q => q.TechnologyStackId == request.Id);
            var techIdsToAdd = techIds.Except(existingTechChoices.Select(x => x.TechnologyId)).ToSet();
            var techChoices = techIdsToAdd.Map(x => new TechnologyChoice
            {
                TechnologyId = x,
                TechnologyStackId = request.Id,
                CreatedBy = techStack.CreatedBy,
                LastModifiedBy = techStack.LastModifiedBy,
                OwnerId = techStack.OwnerId,
            });

            var unusedTechChoices = Db.From<TechnologyChoice>().Where(x => x.TechnologyStackId == request.Id);
            if (techIds.Count > 0)
                unusedTechChoices.And(x => !techIds.Contains(x.TechnologyId));

            await Db.DeleteAsync(unusedTechChoices);

            await Db.InsertAllAsync(techChoices);

            trans.Commit();
        }

        var history = techStack.ConvertTo<TechnologyStackHistory>();
        history.TechnologyStackId = techStack.Id;
        history.Operation = "UPDATE";
        history.TechnologyIds = techIds.ToList();
        await Db.InsertAsync(history);

        Cache.FlushAll();

        var response = new UpdateTechnologyStackResponse
        {
            Result = techStack.ConvertTo<TechStackDetails>()
        };

        return response;
    }

    public object Delete(DeleteTechnologyStack request)
    {
        var stack = Db.SingleById<TechnologyStack>(request.Id);
        if (stack == null)
            throw HttpError.NotFound("TechStack not found");

        var session = SessionAs<AuthUserSession>();
        var authRepo = HostContext.AppHost.GetAuthRepository(Request);
        using (authRepo as IDisposable)
        {
            if (stack.OwnerId != session.UserAuthId && !session.HasRole(RoleNames.Admin, authRepo))
                throw HttpError.Unauthorized("Only the Owner or Admins can delete this TechStack");
        }

        Db.Delete<UserFavoriteTechnologyStack>(q => q.TechnologyStackId == request.Id);
        Db.Delete<TechnologyChoice>(q => q.TechnologyStackId == request.Id);
        Db.DeleteById<TechnologyStack>(request.Id);

        var history = stack.ConvertTo<TechnologyStackHistory>();
        history.TechnologyStackId = stack.Id;
        history.LastModified = DateTime.UtcNow;
        history.LastModifiedBy = session.UserName;
        history.Operation = "DELETE";
        Db.Insert(history);

        Cache.FlushAll();

        return new DeleteTechnologyStackResponse
        {
            Result = stack.ConvertTo<TechStackDetails>()
        };
    }
}