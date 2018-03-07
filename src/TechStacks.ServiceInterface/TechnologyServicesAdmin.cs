using System;
using System.Net;
using System.IO;
using System.Linq;
using System.Text;
using System.Collections.Generic;
using ServiceStack;
using ServiceStack.OrmLite;
using ServiceStack.Logging;
using ServiceStack.Configuration;
using TechStacks.ServiceModel;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceInterface
{
    [Authenticate]
    public class TechnologyServicesAdmin : Service
    {
        public static ILog Log = LogManager.GetLogger(typeof(TechnologyServicesAdmin));

        public IAppSettings AppSettings { get; set; }

        public TwitterUpdates TwitterUpdates { get; set; }

        private const int TweetUrlLength = 22;

        private string PostTwitterUpdate(string msgPrefix, List<long> techIds, int maxLength)
        {
            try
            {
                var stackNames = Db.Column<string>(Db.From<TechnologyStack>()
                    .Where(x => techIds.Contains(x.Id))
                    .Select(x => x.Name));

                var sb = new StringBuilder(msgPrefix);
                for (int i = 0; i < stackNames.Count; i++)
                {
                    var name = stackNames[i];
                    if (sb.Length + name.Length + 3 > maxLength)
                        break;

                    if (i > 0)
                        sb.Append(",");

                    sb.Append(" " + name);
                }

                return TwitterUpdates.Tweet(sb.ToString());

            }
            catch (Exception ex)
            {
                Log.Error("Could not post to Twitter: " + msgPrefix, ex);
                return null;
            }        
        }

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
                tech.LogoUrl = Request.Files[0].UploadToImgur(AppSettings.GetString("oauth.imgur.ClientId"),
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
                @"update user_activity set 
                                 technology_count = (select count(*) from technology where owner_id = @userIdStr)
                           where id = @userId",
                new { userId = session.GetUserId(), userIdStr = session.UserAuthId });

            Cache.FlushAll();

            var postUpdate = AppSettings.EnableTwitterUpdates();
            if (postUpdate)
            {
                var url = new ClientTechnology { Slug = tech.Slug }.ToAbsoluteUri();
                var twitterSlug = tech.Slug.Replace("-", "");
                PostTwitterUpdate(
                    $"Who's using #{twitterSlug}? {url}",
                    Db.ColumnDistinct<long>(Db.From<TechnologyChoice>()
                        .Where(x => x.TechnologyId == tech.Id)
                        .Select(x => x.TechnologyStackId)).ToList(),
                    maxLength: 140 - (TweetUrlLength - url.Length));
            }

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

            //Only Post an Update if there was no other update today
            var postUpdate = AppSettings.EnableTwitterUpdates()
                             && tech.LastStatusUpdate.GetValueOrDefault(DateTime.MinValue) < DateTime.UtcNow.Date;

            tech.PopulateWith(request);
            tech.LastModifiedBy = session.UserName;
            tech.LastModified = DateTime.UtcNow;

            if (postUpdate)
                tech.LastStatusUpdate = tech.LastModified;

            if (Request.Files.Length > 0)
            {
                tech.LogoUrl = Request.Files[0].UploadToImgur(AppSettings.GetString("oauth.imgur.ClientId"),
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

            if (postUpdate)
            {
                var url = new ClientTechnology { Slug = tech.Slug }.ToAbsoluteUri();
                var twitterSlug = tech.Slug.Replace("-", "");

                response.ResponseStatus = new ResponseStatus
                {
                    Message = PostTwitterUpdate(
                        $"Who's using #{twitterSlug}? {url}",
                        Db.ColumnDistinct<long>(Db.From<TechnologyChoice>()
                            .Where(x => x.TechnologyId == tech.Id)
                            .Select(x => x.TechnologyStackId)).ToList(),
                        maxLength: 140 - (TweetUrlLength - url.Length))
                };
            }

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
                Result = new Technology { Id = (long)request.Id }
            };
        }
    }
}