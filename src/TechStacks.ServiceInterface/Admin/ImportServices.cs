using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ServiceStack;
using ServiceStack.FluentValidation;
using ServiceStack.OrmLite;
using TechStacks.ServiceInterface.Validations;
using TechStacks.ServiceModel;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceInterface.Admin
{
    public class ImportUserVoiceSuggestionValidator : AbstractValidator<ImportUserVoiceSuggestion>
    {
        public ImportUserVoiceSuggestionValidator()
        {
            RuleFor(x => x.TopicId).GreaterThan(0);
            RuleFor(x => x.Url).RequiredUrl();
            RuleFor(x => x.Id).GreaterThan(0);
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Creator)
                .Must(x => x != null 
                   && !string.IsNullOrEmpty(x.Name) 
                   && !string.IsNullOrEmpty(x.Email)
                   && x.Id > 0);
            RuleFor(x => x.Response)
                .Must(x => {
                    if (x == null)
                        return true;
                    var creator = x.Creator;
                    var ret = (
                        !string.IsNullOrEmpty(creator.Name)
                        && !string.IsNullOrEmpty(creator.Email)
                        && creator.Id > 0
                    );
                    return ret;
                });
            RuleFor(x => x.CreatedAt).NotEmpty();
            RuleFor(x => x.UpdatedAt).NotEmpty();
        }
    }
    
    [RequiredRole("Import")] //or Admin
    public class ImportServices : PostServicesBase
    {
        public async Task<ImportUserResponse> Any(ImportUser request)
        {
            if (string.IsNullOrEmpty(request.Email) && string.IsNullOrEmpty(request.UserName))
                throw new ArgumentNullException(nameof(request.Email));
            
            if (string.IsNullOrEmpty(request.RefSource))
                throw new ArgumentNullException(nameof(request.RefSource));
            
            if (string.IsNullOrEmpty(request.RefIdStr) && request.RefId == null)
                throw new ArgumentNullException(nameof(request.RefId));
            
            var existingUser = 
                (string.IsNullOrEmpty(request.Email) ? null : AuthRepository.GetUserAuthByUserName(request.Email))
                ?? (string.IsNullOrEmpty(request.UserName) ? null : AuthRepository.GetUserAuthByUserName(request.UserName));

            if (existingUser != null)
                throw HttpError.Conflict("Email and UserName must be unique");

            var session = SessionAs<CustomUserSession>();
            
            var user = request.ConvertTo<CustomUserAuth>();
            user.CreatedDate = user.ModifiedDate = DateTime.Now;
            user.CreatedBy = session.UserName;

            var userId = (int)await Db.InsertAsync(user, selectIdentity: true);

            return new ImportUserResponse {
                Id = userId
            };
        }

        public const string UserVoiceSource = "uservoice"; 

        public async Task<CustomUserAuth> GetOrCreateUser(UserVoiceUser user)
        {
            if (user == null)
                return null;
            
            var dbUser = await Db.SingleAsync<CustomUserAuth>(x => x.Email == user.Email
                 || (x.RefSource == UserVoiceSource && x.RefId == user.Id));
            if (dbUser != null)
                return dbUser;

            var userNameFromEmail = user.Email.LeftPart('@');
            var potentialUserNames = new[] {
                userNameFromEmail,
                user.Name.Replace(" ",""),
                user.Name.Replace(" ","-"),
                userNameFromEmail + ".uv",
            };

            var takenUserNames = await Db.ColumnAsync<string>(Db.From<CustomUserAuth>()
                .Where(x => potentialUserNames.Contains(x.UserName))
                .Select(x => x.UserName));

            var bestUserName = potentialUserNames.FirstOrDefault(x => !takenUserNames.Contains(x));

            if (bestUserName == null)
                throw HttpError.Conflict("Could not generate unique username, please specify one for UserVoice User: " + user.Id);

            var session = GetUser();

            var newUser = new CustomUserAuth {
                UserName = bestUserName,
                Email = user.Email,
                DisplayName = user.Name,
                DefaultProfileUrl = user.AvatarUrl,
                RefSource = "uservoice",
                RefId = user.Id,
                RefUrn = $"urn:uservoice:user:{user.Id}",
                CreatedBy = session.UserName,
                CreatedDate = user.CreatedAt,
                ModifiedDate = user.UpdatedAt,
            };

            newUser.Id = (int) await Db.InsertAsync(newUser, selectIdentity: true);
            return newUser;
        }

        public async Task<int> GetOrCreateCategory(int organizationId, string category)
        {
            if (string.IsNullOrEmpty(category))
                return default(int);

            var orgCategory = Db.SingleAsync<Category>(x => x.OrganizationId == organizationId && x.Name == category);
            if (orgCategory != null)
                return orgCategory.Id;
            
            var user = GetUser();

            var now = DateTime.Now;
            var newCategoryId = (int)await Db.InsertAsync(new Category {
                OrganizationId = organizationId,
                Name = category,
                Created = now,
                CreatedBy = user.UserName,
                Modified = now,
                ModifiedBy = user.UserName,
                RefSource = "uservoice",
                RefUrn = $"urn:uservoice:category:{category}" 
            }, selectIdentity:true);

            return newCategoryId;
        }

        public async Task<ImportUserVoiceSuggestionResponse> Any(ImportUserVoiceSuggestion request)
        {
            var user = GetUser();
            AssertOrganizationModerator(Db, request.OrganizationId, user, out var org, out var orgMember);
            
            var creator = await GetOrCreateUser(request.Creator);
            
            var existingPost = await Db.SingleAsync<Post>(x => 
                (request.Url != null && x.Url == request.Url) || 
                (x.RefSource == UserVoiceSource && x.RefId == request.Id));

            if (existingPost != null)
                throw HttpError.Conflict($"Post already imported: /posts/{existingPost.Id}/{existingPost.Slug}");

            var categoryId = await GetOrCreateCategory(request.OrganizationId, request.Category);

            var now = DateTime.Now;
            var hidden = request.StatusKey == "declined" || request.StatusKey == "completed"
                ? now
                : (DateTime?) null;

            var statusBy = (await GetOrCreateUser(request.StatusChangedBy))?.UserName
                           ?? user.UserName;

            var labels = new List<string>();
            if (request.State != null && request.State != "closed")
            {
                labels.Add(request.State.GenerateSlug());
            }
            
            if (request.StatusKey != null)
            {
                labels.Add(request.StatusKey);

                var orgLabelExists = await Db.ExistsAsync<OrganizationLabel>(x =>
                    x.OrganizationId == request.OrganizationId && x.Slug == request.StatusKey);
                
                if (!orgLabelExists)
                {
                    await Db.InsertAsync(new OrganizationLabel {
                        OrganizationId = request.OrganizationId,
                        Slug = request.StatusKey,
                        Description = $"UserVoice Suggestion",
                        Color = request.StatusHexColor,
                    });
                }
            }

            Post newPost = null;

            using (var trans = Db.OpenTransaction())
            {
                newPost = new Post
                {
                    OrganizationId = request.OrganizationId,
                    UserId = creator.Id,
                    Type = PostType.Request,
                    Url = request.Url,
                    Title = request.Title,
                    Slug = request.Slug ?? request.Title.GenerateSlug(),
                    RefSource = "uservoice",
                    RefId = request.Id,
                    RefUrn = $"urn:uservoice:suggestion:{request.TopicId}:{request.Id}",
                    Created = request.CreatedAt,
                    CreatedBy = creator.UserName,
                    Modified = request.UpdatedAt,
                    ModifiedBy = creator.UserName,
                    CategoryId = categoryId,
                    PointsModifier = request.VoteCount,
                    Hidden = hidden,
                    HiddenBy = statusBy,
                    Content = request.Text,
                    ContentHtml = request.FormattedText,
                    Labels = labels.Count > 0 ? labels.ToArray() : null,
                };

                if (request.State == "closed")
                {
                    newPost.Status = request.State;
                    newPost.StatusBy = statusBy;
                    newPost.StatusDate = request.StatusChangedBy?.UpdatedAt;
                }

                newPost.Id = await Db.InsertAsync(newPost, selectIdentity:true);

                if (request.Response != null)
                {
                    var commentUser = await GetOrCreateUser(request.Response.Creator);
                    
                    var newComment = new PostComment {
                        PostId = newPost.Id,
                        Content = request.Response.Text,
                        ContentHtml = request.Response.FormattedText,
                        Created = request.Response.CreatedAt,
                        CreatedBy = commentUser.UserName,
                        Modified = request.Response.CreatedAt,                        
                        RefSource = "uservoice",
                        RefId = request.Id,
                        RefUrn = $"urn:uservoice:response:{request.TopicId}:{request.Id}",
                    };

                    newComment.Id = await Db.InsertAsync(newComment, selectIdentity: true);

                    await Db.UpdateOnlyAsync(() => new Post {PinCommentId = newComment.Id},
                        where: x => x.Id == newPost.Id && x.OrganizationId == request.OrganizationId);
                }
                
                trans.Commit();
            }

            return new ImportUserVoiceSuggestionResponse {
                PostId = newPost.Id,
                PostSlug = newPost.Slug
            };
        }
    }
}