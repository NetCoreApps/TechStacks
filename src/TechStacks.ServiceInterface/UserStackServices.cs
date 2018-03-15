using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ServiceStack;
using ServiceStack.Configuration;
using ServiceStack.OrmLite;
using TechStacks.ServiceModel;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceInterface
{
    public class UserStackServices : Service
    {
        [Authenticate]
        public object Any(GetUserFeed request)
        {
            var session = SessionAs<CustomUserSession>();

            var favTechs = Db.Select<UserFavoriteTechnology>(x => x.UserId == session.UserAuthId);

            var userFeed = favTechs.Count == 0
                ? GetDefaultFeed()
                : GetDefaultFeed(favTechs.Select(x => x.TechnologyId).ToList());
            
            return new GetUserFeedResponse
            {
                Results = userFeed
            };
        }

        private List<TechStackDetails> GetDefaultFeed(List<int> favTechIds = null)
        {
            var q = Db.From<TechnologyStack>().OrderByDescending(x => x.Id).Limit(20);

            if (favTechIds != null)
            {
                q.Join<TechnologyStack, TechnologyChoice>((ts, tsc) =>
                    ts.Id == tsc.TechnologyStackId && Sql.In(tsc.TechnologyId, favTechIds));
            }

            return Db.GetTechstackDetails(q);
        }
    }

    public class LiveUserServices : Service
    {
        public object Any(GetUsersKarma request)
        {
            var results = Db.Dictionary<int,int>(Db.From<UserActivity>()
                .Where(x => request.UserIds.Contains(x.Id))
                .Select(x => new { x.Id, Karma = 1 
                    + x.PostsCount + x.CommentUpVotes  
                    - x.PostDownVotes - x.CommentDownVotes
                    + (x.TechStacksCount * 5) + (x.PinnedCommentCount * 10)
                    + x.PostUpVotes
                }));

            return new GetUsersKarmaResponse
            {
                Results = results
            };
        }
    }

    [CacheResponse(Duration = 3600)]
    public class CachedUserStackServices : Service
    {
        public object Any(GetUserInfo request)
        {
            var user = Db.Single<CustomUserAuth>(x => x.UserName == request.UserName);
            if (user == null)
                throw HttpError.NotFound("User not found");

            var techStacks = Db.Select(Db.From<TechnologyStack>()
                .Where(x => x.CreatedBy == request.UserName)
                .OrderByDescending(x => x.Id));

            var favStacks = Db.Select(
                Db.From<TechnologyStack>()
                    .Join<UserFavoriteTechnologyStack>()
                    .Where<UserFavoriteTechnologyStack>(u => u.UserId == user.Id.ToString()));

            favStacks.Each(x => x.Details = null); //lighten payload

            var favTechs = Db.Select(
                Db.From<Technology>()
                    .Join<UserFavoriteTechnology>()
                    .Where<UserFavoriteTechnology>(u => u.UserId == user.Id.ToString()));

            var userActivity = Db.SingleById<UserActivity>(user.Id);

            return new GetUserInfoResponse
            {
                Created = DateTime.UtcNow,
                Id = user.Id,
                UserName = user.UserName,
                AvatarUrl = user.DefaultProfileUrl ?? $"/users/{user.UserName}/avatar",
                TechStacks = techStacks,
                FavoriteTechStacks = favStacks,
                FavoriteTechnologies = favTechs,
                UserActivity = userActivity,
            };
        }

        private const string SvgTemplate = @"<svg width=""100"" height=""100"" xmlns=""http://www.w3.org/2000/svg"">
 <g>
  <rect x=""0"" y=""0"" width=""100"" height=""100"" id=""canvas_background"" fill=""BACKGROUND""/>
 </g>
 <g>
  <text x=""50%"" y=""60%"" alignment-baseline=""middle"" text-anchor=""middle"" fill=""#ffffff"" font-size=""80"" font-family=""Helvetica, Arial, sans-serif"" font-weight=""bold"">LETTER</text>
 </g>
</svg>";

        public static string[] MaterialColors = 
        {
            "#c62828",
            "#ad1457",
            "#6a1b9a",
            "#4527a0",
            "#283593",
            "#1565c0",
            "#0277bd",
            "#00838f",
            "#00695c",
            "#2e7d32",
            "#255d00",
            "#6c6f00",
            "#bc5100",
            "#c43e00",
            "#b53d00",
            "#bf360c",
            "#4e342e",
            "#424242",
            "#37474f",
        };

        public async Task<object> Get(UserAvatar request)
        {
            if (string.IsNullOrEmpty(request.UserName))
                throw new ArgumentNullException(nameof(request.UserName));

            var user = Db.Single<CustomUserAuth>(x => x.UserName == request.UserName);
            if (user?.DefaultProfileUrl == null)
            {
                var imgIndex = Math.Abs(request.UserName.GetHashCode()) % MaterialColors.Length;
                var userNameColor = MaterialColors[imgIndex];
                Response.ContentType = MimeTypes.GetMimeType("svg");
                var svg = SvgTemplate.Replace("BACKGROUND", userNameColor).Replace("LETTER", request.UserName.Substring(0, 1).ToUpper());
                await Response.WriteAsync(svg);
                Response.EndRequest();
                return null;
            }

            return HttpResult.Redirect(user.DefaultProfileUrl);
        }
    }

    public static class UserExtensions
    {
        public static int CalculateKarma(this UserActivity user) => 1 
            + user.PostUpVotes   + user.CommentUpVotes 
            - user.PostDownVotes - user.CommentDownVotes
            + (user.TechStacksCount * 5) + (user.PinnedCommentCount * 10)
            + user.PostsCount;

        public static bool IsAdmin(this AuthUserSession session) => session.HasRole(RoleNames.Admin, null);

        public static int GetUserId(this AuthUserSession session) => session.UserAuthId.ToInt();

        public static string GetGitHubToken(this AuthUserSession session) => 
            session?.ProviderOAuthAccess?.FirstOrDefault(x => x.Provider == "github")?.AccessTokenSecret;

        public static bool IsOrganizationOwner(this AuthUserSession session, OrganizationMember organizationMember) =>
            session.IsAdmin() || organizationMember?.IsOwner == true;

        public static bool IsOrganizationModerator(this AuthUserSession session, OrganizationMember organizationMember) =>
            session.IsOrganizationOwner(organizationMember) || organizationMember?.IsModerator == true;
    }
}
