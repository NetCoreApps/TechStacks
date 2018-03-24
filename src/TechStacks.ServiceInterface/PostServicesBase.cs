using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using ServiceStack;
using ServiceStack.OrmLite;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceInterface
{
    public class PostServicesBase : Service
    {
        public IMarkdownProvider Markdown { get; set; }

        public AuthUserSession GetUser() => SessionAs<AuthUserSession>();
        public int GetUserId() => SessionAs<AuthUserSession>().UserAuthId.ToInt();

        private static readonly object syncObject = new object();
        private static List<Organization> allOrgs;
        private static List<Organization> orgs;
        internal static ILookup<int, OrganizationMember> orgMembersLookup;
        private static DateTime lastSynced = DateTime.MinValue;
        private static readonly TimeSpan cacheExpiry = TimeSpan.FromMinutes(5);

        protected void ClearPostCaches() => Cache.FlushAll();

        protected void ClearOrganizationCaches()
        {
            ClearOrganizationCache();
            Cache.FlushAll();
        }

        public static void ClearOrganizationCache()
        {
            lastSynced = DateTime.MinValue;
        }

        public static Organization GetOrganization(IDbConnection db, int organizationId)
        {
            return GetOrganizations(db).FirstOrDefault(x => x.Id == organizationId);
        }

        public static Organization GetOrganizationByTechnologyId(IDbConnection db, int technologyId)
        {
            return GetOrganizations(db).FirstOrDefault(x => x.RefId == technologyId && x.RefSource == nameof(Technology));
        }

        public static List<Organization> GetOrganizations(IDbConnection db)
        {
            if (orgs == null || DateTime.Now - lastSynced > cacheExpiry)
            {
                ReloadOrganizations(db);
                PeriodicUpdateTableCaches(db);
            }
            return orgs;
        }

        public static void ReloadOrganizations(IDbConnection db)
        {
            lock (syncObject)
            {
                var now = DateTime.Now;
                allOrgs = db.Select<Organization>();
                orgs = allOrgs.Where(x => x.Deleted == null).ToList();
                orgMembersLookup = db.Select<OrganizationMember>().ToLookup(x => x.OrganizationId);
                lastSynced = now;
            }
        }

        public static void PeriodicUpdateTableCaches(IDbConnection db) => UpdatePostRanks(db);
        public static void UpdatePostRanks(IDbConnection db)
        {
            db.ExecuteSql(@"update post 
                set rank = r.rank
                from (select rank() over(order by bumped desc nulls last, modified desc nulls last), p.id from post p) r
                where post.id = r.id");

            db.ExecuteSql(@"update post 
                set points = GREATEST(1 + (up_votes - down_votes) + points_modifier, 0)");

            db.ExecuteSql(@"update organization set  
                posts_count = (select count(*) from post p where organization_id = organization.id or (organization.ref_source = 'Technology' and p.technology_ids @> ARRAY[organization.ref_id]::int[])),
                comments_count = (select count(*) from post_comment c join post p on (c.post_id = p.id) where p.organization_id = organization.id),
                subscribers = (select count(*) from subscription where organization_id = organization.id),
                favorites = (select count(*) from post_favorite f join post p on (f.post_id = p.id) where p.organization_id = organization.id),
                up_votes   = (select count(*) from post_vote v join post p on (v.post_id = p.id) where organization_id = organization.id and weight > 0), 
                down_votes = (select count(*) from post_vote v join post p on (v.post_id = p.id) where organization_id = organization.id and weight < 0)");

            db.ExecuteSql(@"update organization 
                set rank = r.rank
                from (select rank() over(order by posts_count desc), o.id from organization o) r
                where organization.id = r.id");
        }

        private static void LoadOrganizations(IDbConnection db) => GetOrganizations(db);

        public static List<OrganizationMember> GetOrganizationMembers(int organizationId)
        {
            return orgMembersLookup[organizationId].ToList();
        }

        public static void AssertOrganizationOwner(IDbConnection db, int orgId, AuthUserSession user,
            out Organization organization, out OrganizationMember orgMember)
        {
            AssertCanViewOrganization(db, orgId, user, out organization, out orgMember);

            if (!user.IsOrganizationOwner(orgMember))
                throw HttpError.Forbidden("This action is limited to Organization Owners");
        }

        public static void AssertOrganizationModerator(IDbConnection db, int orgId, AuthUserSession user,
            out Organization organization, out OrganizationMember orgMember)
        {
            AssertCanViewOrganization(db, orgId, user, out organization, out orgMember);

            if (!user.IsOrganizationModerator(orgMember))
                throw HttpError.Forbidden("This action is limited to Organization Moderators");
        }

        public static OrganizationMember AssertCanAnnotateOnOrganization(IDbConnection db, int organizationId, AuthUserSession user)
        {
            return AssertCanAnnotateOnOrganization(db, organizationId, user, out var org);
        }

        public static OrganizationMember AssertCanAnnotateOnOrganization(IDbConnection db, int organizationId, AuthUserSession user, out Organization org)
        {
            AssertCanViewOrganization(db, organizationId, user, out org, out var orgMember);

            if (orgMember?.DenyAll == true)
                throw HttpError.Forbidden("Access has been suspended");

            if (org.Locked != null && orgMember == null)
                throw HttpError.NotFound("Organization is locked to members only");

            return orgMember;
        }

        public static OrganizationMember AssertCanCommentToOrganization(IDbConnection db, int organizationId, AuthUserSession user)
        {
            AssertCanViewOrganization(db, organizationId, user, out var org, out var orgMember);

            if (orgMember?.DenyComments == true || orgMember?.DenyAll == true)
                throw HttpError.Forbidden("Access has been suspended");

            if (org.Locked != null && orgMember == null)
                throw HttpError.NotFound("Organization is locked to members only");

            return orgMember;
        }

        public static void AssertCanPostToOrganization(IDbConnection db, int organizationId, AuthUserSession user,
            out Organization org, out OrganizationMember orgMember)
        {
            AssertCanViewOrganization(db, organizationId, user, out org, out orgMember);

            if (orgMember?.DenyPosts == true || orgMember?.DenyAll == true)
                throw HttpError.Forbidden("Access has been suspended");

            if (org.Locked != null && orgMember == null)
                throw HttpError.NotFound("Organization is locked to members only");
        }

        public static void AssertCanPostTypeToOrganization(PostType postType, Organization org,
            OrganizationMember orgMember, AuthUserSession user)
        {
            if (user.IsOrganizationModerator(orgMember))
            {
                if (!org.ModeratorPostTypes.IsEmpty())
                {
                    if (!org.ModeratorPostTypes.Contains(postType.ToString()))
                        throw HttpError.Forbidden(postType + " is not an allowed Type for Moderators");
                    return;
                }
            }

            if (!org.PostTypes.IsEmpty())
            {
                if (!org.PostTypes.Contains(postType.ToString()))
                    throw HttpError.Forbidden($"You cannot submit {postType} posts here");
            }
        }

        public static void AssertCanViewOrganization(IDbConnection db, int organizationId, AuthUserSession user) =>
            AssertCanViewOrganization(db, organizationId, user, out _, out _);

        public static void AssertCanViewOrganization(IDbConnection db, int organizationId, AuthUserSession user,
            out Organization organization, out OrganizationMember organizationMember)
        {
            LoadOrganizations(db);
            organization = allOrgs.FirstOrDefault(x => x.Id == organizationId);

            AssertCanViewOrganization(db, organization, user, out organizationMember);
        }

        public static void AssertCanViewOrganization(IDbConnection db, Organization organization, AuthUserSession user, out OrganizationMember organizationMember)
        {
            LoadOrganizations(db);

            var userId = user?.GetUserId();
            organizationMember = organization != null && userId != null 
                ? orgMembersLookup[organization.Id]?.FirstOrDefault(x => x.UserId == userId)
                : null;

            if (organization == null || (organization.Deleted != null && !user.IsOrganizationModerator(organizationMember)))
                throw HttpError.NotFound("Organization does not exist");
        }

        protected Post AssertPost(long postId)
        {
            var post = Db.SingleById<Post>(postId);
            return post ?? throw HttpError.NotFound("Post does not exist");
        }

        protected PostComment AssertPostComment(long postCommentId)
        {
            var comment = Db.SingleById<PostComment>(postCommentId);
            return comment ?? throw HttpError.NotFound("Comment does not exist");
        }

        protected async Task<Post> AssertPostAsync(long postId)
        {
            var post = await Db.SingleByIdAsync<Post>(postId);
            return post ?? throw HttpError.NotFound("Post does not exist");
        }

        public static void AssertCanAnnotatePost(Post post, AuthUserSession session, OrganizationMember organizationMember)
        {
            if (post == null || post.Deleted != null && !session.IsOrganizationModerator(organizationMember))
                throw HttpError.NotFound("Post does not exist");

            if (post.Archived)
                throw HttpError.NotFound("Post is archived");
        }

        protected void AssertCanContributeToPost(Post post, AuthUserSession session, OrganizationMember organizationMember)
        {
            AssertCanAnnotatePost(post, session, organizationMember);

            if (post.Locked != null && !session.IsOrganizationModerator(organizationMember))
                throw HttpError.Unauthorized("Post is locked");
        }

        protected void AssertCanUpdatePost(Post post, AuthUserSession session, OrganizationMember organizationMember)
        {
            AssertCanContributeToPost(post, session, organizationMember);

            if (post.UserId != session.GetUserId() && !session.IsOrganizationModerator(organizationMember))
                throw HttpError.Unauthorized("Access Denied");
        }
    }
}