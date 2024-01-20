using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using ServiceStack;
using ServiceStack.OrmLite;
using TechStacks.Data;
using TechStacks.ServiceModel;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceInterface;

[CacheResponse(Duration = 600)]
public class PublicOrganizationServices : Service
{
    public async Task<GetOrganizationResponse> Get(GetOrganization request)
    {
        if (request.Id <= 0)
            throw new ArgumentNullException(nameof(request.Id));

        return await GetOrganization(await Db.SingleByIdAsync<Organization>(request.Id));
    }

    public async Task<GetOrganizationResponse> Get(GetOrganizationBySlug request)
    {
        if (string.IsNullOrEmpty(request.Slug))
            throw new ArgumentNullException(nameof(request.Slug));

        return await GetOrganization(await Db.SingleAsync<Organization>(x => x.Slug == request.Slug));
    }

    private async Task<GetOrganizationResponse> GetOrganization(Organization organization)
    {
        PostServicesBase.AssertCanViewOrganization(Db, organization, SessionAs<AuthUserSession>(), out _);

        var members = await Db.SelectAsync<OrganizationMember>(x => x.OrganizationId == organization.Id && (x.IsOwner || x.IsModerator));

        return new GetOrganizationResponse
        {
            Cache = Stopwatch.GetTimestamp(),
            Id = organization.Id,
            Slug = organization.Slug,
            Organization = organization,
            Labels = await Db.SelectAsync<OrganizationLabel>(x => x.OrganizationId == organization.Id),
            Categories = (await Db.SelectAsync<Category>(x => x.OrganizationId == organization.Id && x.Deleted == null)).OrderBy(x => x.Name).ToList(),
            Owners = members.Where(x => x.IsOwner).ToList(),
            Moderators = members.Where(x => x.IsModerator).ToList(),
            MembersCount = PostServicesBase.GetOrganizationMembersCount(organization.Id), //display only, can be stale
        };
    }

    public async Task<GetOrganizationMembersResponse> Get(GetOrganizationMembers request)
    {
        if (request.Id <= 0)
            throw new ArgumentNullException(nameof(request.Id));

        PostServicesBase.AssertCanViewOrganization(Db, request.Id, SessionAs<AuthUserSession>(), out _, out _);

        return new GetOrganizationMembersResponse
        {
            OrganizationId = request.Id,
            Results = await Db.SelectAsync<OrganizationMember>(x => x.OrganizationId == request.Id),
        };
    }
}

[Authenticate]
public class OrganizationServices(IMarkdownProvider markdown, UserManager<ApplicationUser> userManager) 
    : PostServicesBase(markdown)
{
    public const string Uncategorized = nameof(Uncategorized);

    public async Task<GetOrganizationAdminResponse> Get(GetOrganizationAdmin request)
    {
        var user = GetUser();
        AssertOrganizationModerator(Db, request.Id, user, out var org, out var orgMember);

        return new GetOrganizationAdminResponse
        {
            Labels = await Db.SelectAsync(Db.From<OrganizationLabel>().Where(x => x.OrganizationId == org.Id)),

            Members = await Db.SelectAsync(Db.From<OrganizationMember>().Where(x => x.OrganizationId == org.Id).OrderByDescending(x => new{ x.IsOwner, x.IsModerator })),
            MemberInvites = await Db.SelectAsync<OrganizationMemberInvite>(x => x.OrganizationId == org.Id && x.Approved == null && x.OrganizationMemberId == null),

            ReportedPosts = await Db.SelectAsync<PostReportInfo>(Db.From<PostReport>()
                .Join<Post>().Where(x => x.Acknowledged == null && x.Dismissed == null)),
            ReportedPostComments = await Db.SelectAsync<PostCommentReportInfo>(Db.From<PostCommentReport>()
                .Join<PostComment>().Where(x => x.Acknowledged == null && x.Dismissed == null)),
        };
    }

    public async Task<CreateOrganizationForTechnologyResponse> Post(CreateOrganizationForTechnology request)
    {
        if (request.TechnologyId == null && request.TechStackId == null)
            throw new ArgumentNullException(nameof(request.TechnologyId));

        var user = GetUser();
        var userId = user.GetUserId();

        var type = request.TechnologyId != null
            ? typeof(Technology)
            : typeof(TechnologyStack);

        var technology = request.TechnologyId != null
            ? Db.SingleById<Technology>(request.TechnologyId.Value)
            : null;
        var techstack = request.TechStackId != null
            ? Db.SingleById<TechnologyStack>(request.TechStackId.Value)
            : null;

        if (technology == null && techstack == null)
            throw HttpError.NotFound(type.Name + " does not exist");

        var name = technology?.Name ?? techstack?.Name;

        var alreadyLinked = technology?.CommentsPostId != null || techstack?.CommentsPostId != null;
        if (alreadyLinked)
            throw HttpError.Conflict($"{name} {type.Name} Post has already been linked");

        var id = technology?.Id ?? techstack.Id;
        var techOrgId = technology?.OrganizationId ?? techstack?.OrganizationId;
        var techSlug = technology?.Slug ?? techstack?.Slug;
        var techRoute = techstack != null
            ? "stacks"
            : "tech";
        var organization = techOrgId == null 
            ? Db.Single<Organization>(x => x.Slug == techSlug)
            : Db.SingleById<Organization>(techOrgId);

        using (var trans = Db.OpenTransaction())
        {
            var postTitle = $"{name} Page Comments";
            var postContent = $"### Comments for [{name} {type.Name}](/{techRoute}/{techSlug}) page";
            var now = DateTime.Now;

            if (organization == null)
            {
                var description = technology?.Description ?? techstack?.Description;
                organization = new Organization
                {
                    Name = name,
                    Slug = techSlug,
                    Description = description,
                    DescriptionHtml = MarkdownConfig.Transform(description),
                    PostTypes = new []
                    {
                        PostType.Announcement.ToString(),
                        PostType.Post.ToString(),
                        PostType.Showcase.ToString(),
                    },
                    RefId = id,
                    RefSource = type.Name,
                    RefUrn = $"urn:{type.Name}:{id}",
                    Created = now,
                    CreatedBy = user.UserName,
                    Modified = now,
                    ModifiedBy = user.UserName,
                };

                organization.Id = (int)await Db.InsertAsync(organization, selectIdentity: true);
            }

            var post = new Post
            {
                OrganizationId = organization.Id,
                Type = PostType.Post,
                Title = postTitle,
                Slug = postTitle.GenerateSlug(),
                Content = postContent,
                ContentHtml = $"<div class='gfm ssfm'>{MarkdownConfig.Transform(postContent)}</div>",
                RefId = organization.RefId,
                RefSource = organization.RefSource,
                RefUrn = organization.RefUrn,
                Created = now,
                CreatedBy = user.UserName,
                Modified = now,
                ModifiedBy = user.UserName,
                Hidden = now,
                HiddenBy = "webstacks",
                UserId = userId,
                UpVotes = 0,
                Rank = 0,                    
                TechnologyIds = technology != null ? new[] { (int)technology.Id } : null,
            };
            post.Id = await Db.InsertAsync(post, selectIdentity: true);

            if (technology != null)
            {
                await Db.UpdateOnlyAsync(() => new Technology {
                    OrganizationId = organization.Id,
                    CommentsPostId = post.Id,
                }, where:x => x.Id == technology.Id);
            }
            else
            {
                await Db.UpdateOnlyAsync(() => new TechnologyStack {
                    OrganizationId = organization.Id,
                    CommentsPostId = post.Id,
                }, where: x => x.Id == techstack.Id);
            }

            trans.Commit();

            SendSystemEmail(nameof(CreateOrganizationForTechnology), 
                $"New {name} {type.Name} Organization was created by {user.UserName} at /{techSlug}");

            ClearOrganizationCaches();
            ClearPostCaches();

            return new CreateOrganizationForTechnologyResponse
            {
                OrganizationId = organization.Id,
                OrganizationSlug = organization.Slug,
                CommentsPostId = post.Id,
                CommentsPostSlug = post.Slug,
            };
        }
    }

    public object Post(CreateOrganization request)
    {
        var slugExists = Db.Exists<Organization>(x => x.Slug == request.Slug);
        if (slugExists)
            throw new ArgumentException("Slug already exists", nameof(request.Slug));

        var user = GetUser();

        var org = request.ConvertTo<Organization>();
        var orgMember = new OrganizationMember
        {
            UserId = user.GetUserId(),
            UserName = user.UserName,
            IsOwner = true
        };

        org.Created = org.Modified = orgMember.Created = DateTime.Now;
        org.CreatedBy = org.ModifiedBy = orgMember.CreatedBy = user.UserName;

        orgMember.OrganizationId = (int)Db.Insert(org, selectIdentity: true);

        Db.Insert(orgMember);

        SendSystemEmail(nameof(CreateOrganization), 
            $"New {request.Name} Organization was created by {user.UserName} at /{request.Slug}");

        ClearOrganizationCaches();

        return new CreateOrganizationResponse
        {
            Id = orgMember.OrganizationId,
            Slug = request.Slug,
        };
    }

    public async Task<UpdateOrganizationResponse> Put(UpdateOrganization request)
    {
        var user = GetUser();
        AssertOrganizationOwner(Db, request.Id, user, out var organization, out var orgMember);

        var slug = request.Slug;

        var slugExists = await Db.ExistsAsync<Organization>(x => x.Slug == slug && x.Id != request.Id);
        if (slugExists)
            throw new ArgumentException("Slug already exists", nameof(request.Slug));

        if (organization.Description != request.Description)
        {
            organization.DescriptionHtml = Markdown.Transform(request.Description);
        }

        organization.PopulateWith(request);
        organization.Slug = slug;
        organization.Modified = DateTime.Now;
        organization.ModifiedBy = user.UserName;

        await Db.UpdateAsync(organization);

        ClearOrganizationCaches();

        return new UpdateOrganizationResponse();
    }

    public void Delete(DeleteOrganization request)
    {
        var user = GetUser();
        AssertOrganizationOwner(Db, request.Id, user, out var org, out var orgMember);

        Db.UpdateOnly(() => new Organization
            {
                Deleted = DateTime.Now,
                DeletedBy = user.UserName,
            },
            where: x => x.Id == request.Id);

        ClearOrganizationCaches();
    }

    public void Put(LockOrganization request)
    {
        var user = GetUser();
        AssertOrganizationOwner(Db, request.Id, user, out var organization, out var orgMember);

        if (request.Lock)
        {
            organization.Locked = DateTime.Now;
            organization.LockedBy = user.UserName;
            if (!string.IsNullOrEmpty(request.Reason))
            {
                organization.Notes = request.Reason;
            }
        }
        else
        {
            organization.Locked = null;
            organization.LockedBy = null;
        }

        Db.Update(organization);

        ClearOrganizationCaches();
    }
        
        
    public object Post(AddOrganizationLabel request)
    {
        var user = GetUser();
        AssertOrganizationModerator(Db, request.OrganizationId, user, out var org, out var orgMember);

        if (string.IsNullOrEmpty(request.Slug))
            throw new ArgumentNullException(nameof(request.Slug));
            
        if (string.IsNullOrEmpty(request.Color))
            throw new ArgumentNullException(nameof(request.Color));
            
        var existingLabel = Db.Exists<OrganizationLabel>(x =>
            x.OrganizationId == request.OrganizationId && x.Slug == request.Slug);
        if (existingLabel)
            throw new ArgumentException("Label has already been added", nameof(request.Slug));

        var label = request.ConvertTo<OrganizationLabel>();
        label.Created = label.Modified = DateTime.Now;
        label.CreatedBy = label.ModifiedBy = user.UserName;
        Db.Insert(label);

        ClearOrganizationCaches();

        return new AddOrganizationMemberResponse();
    }

    public object Put(UpdateOrganizationLabel request)
    {
        var user = GetUser();
        AssertOrganizationModerator(Db, request.OrganizationId, user, out var org, out var orgMember);

        if (string.IsNullOrEmpty(request.Slug))
            throw new ArgumentNullException(nameof(request.Slug));
            
        if (string.IsNullOrEmpty(request.Color))
            throw new ArgumentNullException(nameof(request.Color));
            
        var label = Db.Single<OrganizationLabel>(x =>
            x.OrganizationId == request.OrganizationId && x.Slug == request.Slug);

        if (label == null)
            throw HttpError.NotFound("Label does not exist");

        label.PopulateWith(request);
        label.Modified = DateTime.Now;
        label.ModifiedBy = user.UserName;

        Db.Update(label);

        ClearOrganizationCaches();

        return new UpdateOrganizationMemberResponse();
    }

    public void Delete(RemoveOrganizationLabel request)
    {
        var user = GetUser();
        AssertOrganizationModerator(Db, request.OrganizationId, user, out var org, out var orgMember);

        Db.Delete<OrganizationLabel>(x => 
            x.OrganizationId == request.OrganizationId && x.Slug == request.Slug);

        ClearOrganizationCaches();
    }


    public object Post(AddOrganizationCategory request)
    {
        var user = GetUser();
        AssertOrganizationModerator(Db, request.OrganizationId, user, out var org, out var orgMember);

        var slugExists = Db.Exists<Category>(x => x.Slug == request.Slug && x.OrganizationId == request.OrganizationId);
        if (slugExists)
            throw new ArgumentException("Slug already exists", nameof(request.Slug));

        var category = request.ConvertTo<Category>();
        category.Created = category.Modified = DateTime.Now;
        category.CreatedBy = category.ModifiedBy = user.UserName;

        var id = (int)Db.Insert(category, selectIdentity: true);

        ClearOrganizationCaches();

        return new AddOrganizationCategoryResponse
        {
            Id = id,
            Slug = request.Slug,
        };
    }

    public object Put(UpdateOrganizationCategory request)
    {
        var user = GetUser();
        AssertOrganizationModerator(Db, request.OrganizationId, user, out var org, out var orgMember);

        var category = Db.Single<Category>(x => x.Id == request.Id && x.OrganizationId == request.OrganizationId);
        if (category == null)
            throw HttpError.NotFound("Category does not exist");

        category.PopulateWith(request);
        category.Modified = DateTime.Now;
        category.ModifiedBy = user.UserName;

        Db.Update(category);

        ClearOrganizationCaches();

        return new UpdateOrganizationCategoryResponse();
    }

    public void Delete(DeleteOrganizationCategory request)
    {
        var user = GetUser();
        AssertOrganizationModerator(Db, request.OrganizationId, user, out var org, out var orgMember);

        Db.UpdateOnly(() => new Category
            {
                Deleted = DateTime.Now,
                DeletedBy = user.UserName,
            },
            where: x => x.Id == request.Id && x.OrganizationId == request.OrganizationId);

        ClearOrganizationCaches();
    }

    public async Task<object> Post(AddOrganizationMember request)
    {
        var user = GetUser();
        AssertOrganizationModerator(Db, request.OrganizationId, user, out var org, out var orgMember);

        var requiresOwner = request.IsModerator || request.IsOwner;
        if (requiresOwner && !user.IsOrganizationOwner(orgMember))
            throw HttpError.Forbidden("This action is limited to Organization Owners");

        var memberUser = await userManager.FindByNameAsync(request.UserName);
        if (memberUser == null)
            throw HttpError.NotFound("User does not exist");

        var existingMember = Db.Exists<OrganizationMember>(x =>
            x.OrganizationId == request.OrganizationId && x.UserId == memberUser.Id);
        if (existingMember)
            throw new ArgumentException("Member has already been added", nameof(request.UserName));

        var member = request.ConvertTo<OrganizationMember>();
        member.UserId = memberUser.Id;
        member.UserName = memberUser.UserName;
        member.Created = member.Modified = DateTime.Now;
        member.CreatedBy = member.ModifiedBy = user.UserName;
        Db.Insert(member);

        ClearOrganizationCaches();

        return new AddOrganizationMemberResponse();
    }

    public object Put(UpdateOrganizationMember request)
    {
        var user = GetUser();
        AssertOrganizationModerator(Db, request.OrganizationId, user, out var org, out var orgMember);

        var member = Db.Single<OrganizationMember>(x =>
            x.UserId == request.UserId && x.OrganizationId == request.OrganizationId);

        if (member == null)
            throw HttpError.NotFound("Member does not exist");

        var requiresOwner = member.IsOwner || member.IsModerator ||
                            member.IsModerator != request.IsModerator ||
                            member.IsOwner != request.IsOwner;

        if (requiresOwner && !user.IsOrganizationOwner(orgMember))
            throw HttpError.Forbidden("This action is limited to Organization Owners");

        member.PopulateWith(request);

        Db.Update(member);

        ClearOrganizationCaches();

        return new UpdateOrganizationMemberResponse();
    }

    public void Delete(RemoveOrganizationMember request)
    {
        var user = GetUser();
        AssertOrganizationModerator(Db, request.OrganizationId, user, out var org, out var orgMember);

        var member = Db.Single<OrganizationMember>(x =>
            x.UserId == request.UserId && x.OrganizationId == request.OrganizationId);

        var requiresOwner = member.IsOwner || member.IsModerator;
        if (requiresOwner && !user.IsOrganizationOwner(orgMember))
            throw HttpError.Forbidden("This action is limited to Organization Owners");

        Db.Delete<OrganizationMember>(x => x.UserId == request.UserId && x.OrganizationId == request.OrganizationId);
        Db.Delete<OrganizationMemberInvite>(x => x.UserId == request.UserId && x.OrganizationId == request.OrganizationId);

        SendSystemEmail(nameof(RemoveOrganizationMember), 
            $"@{member.UserName} was removed from {org.Name} by {user.UserName}");

        ClearOrganizationCaches();
    }

    public object Post(SetOrganizationMembers request)
    {
        var user = GetUser();
        AssertOrganizationOwner(Db, request.OrganizationId, user, out var organization, out var orgMember);

        var githubUserNames = request.GithubUserNames ?? TypeConstants.EmptyStringArray;
        var twitterUserNames = request.TwitterUserNames ?? TypeConstants.EmptyStringArray;
        var emails = request.Emails ?? TypeConstants.EmptyStringArray;

        var users = Db.SqlList<(int userId, string userName)>(
            @"select c.id, c.user_name 
                    from custom_user_auth c
                   where c.email in (@emails)
                      or exists (select * from user_auth_details d 
                                  where d.user_auth_id = c.id
                                    and (email in (@emails) or 
                                        (user_name in (@twitterUserNames) and provider = 'twitter') or 
                                        (user_name in (@githubUserNames)  and provider = 'github')))",
            new { githubUserNames, twitterUserNames, emails });
            
        var userIdsMap = new Dictionary<int,string>();
        users.Each(x => userIdsMap[x.userId] = x.userName);

        var existingUserIds = Db.Column<int>(Db.From<OrganizationMember>()
            .Where(x => x.OrganizationId == request.OrganizationId)
            .Select(x => x.UserId));
            
        var userIdsAdded = new List<int>();
        var userIdsToRemove = existingUserIds.Where(x => !userIdsMap.ContainsKey(x)).ToArray();

        var response = new SetOrganizationMembersResponse {
        };

        var now = DateTime.Now;
        using (var trans = Db.OpenTransaction())
        {
            foreach (var entry in userIdsMap)
            {
                if (existingUserIds.Contains(entry.Key))
                    continue;

                var member = request.ConvertTo<OrganizationMember>();
                member.UserId = entry.Key;
                member.UserName = entry.Value;
                member.Created = member.Modified = now;
                member.CreatedBy = member.ModifiedBy = user.UserName;
                    
                Db.Insert(member);
                userIdsAdded.Add(entry.Key);
            }
                
            if (request.RemoveUnspecifiedMembers)
            {
                Db.Delete<OrganizationMember>(x => x.OrganizationId == request.OrganizationId
                                                   && userIdsToRemove.Contains(x.UserId));

                response.UserIdsRemoved = userIdsToRemove;
            }

            trans.Commit();
        }

        response.UserIdsAdded = userIdsAdded.ToArray();

        ClearOrganizationCaches();

        return response;
    }

        
    public async Task<object> Get(GetOrganizationMemberInvites request)
    {
        var user = GetUser();
        AssertOrganizationModerator(Db, request.OrganizationId, user, out var org, out var orgMember);

        return new GetOrganizationMemberInvitesResponse
        {
            Results = await Db.SelectAsync<OrganizationMemberInvite>(x => x.OrganizationId == request.OrganizationId),
        };
    }

    public async Task<object> Post(RequestOrganizationMemberInvite request)
    {
        if (request.OrganizationId <= 0)
            throw new ArgumentNullException(nameof(request.OrganizationId));

        var user = GetUser();
        var userId = user.GetUserId();

        var memberExists = Db.Exists<OrganizationMember>(x =>
            x.UserId == userId && x.OrganizationId == request.OrganizationId);

        if (memberExists)
            throw HttpError.Conflict("Already a member");

        var inviteExists = Db.Exists<OrganizationMemberInvite>(x =>
            x.UserId == userId && x.OrganizationId == request.OrganizationId);

        if (inviteExists)
            throw HttpError.Conflict("Member Invite already requested");

        await Db.InsertAsync(new OrganizationMemberInvite
        {
            UserId = userId,
            UserName = user.UserName,
            OrganizationId = request.OrganizationId,
            Created = DateTime.Now,
        });
            
        SendSystemEmail(nameof(RequestOrganizationMemberInvite), 
            $"@{user.UserName} requested member invite for {request.OrganizationId}");

        ClearOrganizationCaches();

        return new RequestOrganizationMemberInviteResponse
        {
            OrganizationId = request.OrganizationId,
        };
    }

    public async Task<object> Put(UpdateOrganizationMemberInvite request)
    {
        if (request.OrganizationId <= 0)
            throw new ArgumentNullException(nameof(request.OrganizationId));

        if (string.IsNullOrEmpty(request.UserName))
            throw new ArgumentNullException(nameof(request.UserName));

        var user = GetUser();
        AssertOrganizationModerator(Db, request.OrganizationId, user, out var org, out var orgMember);

        var userId = (await userManager.FindByNameAsync(request.UserName))?.Id;
        if (userId == null)
            throw HttpError.NotFound("User does not exist");

        var now = DateTime.Now;
        if (request.Approve)
        {
            var hasOwnersOrModerators = Db.Exists<OrganizationMember>(x =>
                x.OrganizationId == request.OrganizationId && (x.IsOwner || x.IsModerator));

            var id = await Db.InsertAsync(new OrganizationMember
            {
                OrganizationId = request.OrganizationId,
                UserId = userId.Value,
                UserName = request.UserName,
                IsOwner = !hasOwnersOrModerators,
                Created = now,
                CreatedBy = user.UserName,
                Modified = now,
                ModifiedBy = user.UserName,
            }, selectIdentity:true);

            await Db.UpdateOnlyAsync(() => new OrganizationMemberInvite
                {
                    Approved = now,
                    ApprovedBy = user.UserName,
                    OrganizationMemberId = (int)id,
                },
                where: x => x.UserId == userId && x.OrganizationId == request.OrganizationId);

            SendSystemEmail(nameof(UpdateOrganizationMemberInvite), 
                $"@{request.UserName} invitation for {org.Name} was approved by {user.UserName}");

        }
        else if (request.Dismiss)
        {
            await Db.UpdateOnlyAsync(() => new OrganizationMemberInvite
                {
                    Dismissed = now,
                    DismissedBy = user.UserName,
                }, 
                where: x => x.UserId == userId && x.OrganizationId == request.OrganizationId);

            SendSystemEmail(nameof(UpdateOrganizationMemberInvite), 
                $"@{request.UserName} invitation for {org.Name} was dismissed by {user.UserName}");
        }
        else
        {
            throw new Exception("Must Approve or Dismiss");
        }

        ClearOrganizationCaches();

        return new UpdateOrganizationMemberInviteResponse();
    }

}