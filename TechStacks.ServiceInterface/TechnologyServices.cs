using System;
using System.Linq;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.OrmLite;
using TechStacks.ServiceModel;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceInterface;

public class TechnologyServices : Service
{
    public object Get(GetTechnologyPreviousVersions request)
    {
        if (request.Slug == null)
            throw new ArgumentNullException(nameof(request.Slug));

        if (!long.TryParse(request.Slug, out var id))
        {
            var tech = Db.Single<Technology>(x => x.Slug == request.Slug.ToLower());
            id = tech.Id;
        }

        return new GetTechnologyPreviousVersionsResponse
        {
            Results = Db.Select(Db.From<TechnologyHistory>()
                .Where(x => x.TechnologyId == id)
                .OrderByDescending(x => x.LastModified))
        };
    }

    public object Get(GetAllTechnologies request)
    {
        return new GetAllTechnologiesResponse
        {
            Results = Db.Select(Db.From<Technology>().OrderByDescending(x => x.LastModified).Take(100)).ToList(),
            Total = Db.Count<Technology>(),
        };
    }
}

[CacheResponse(Duration = 3600)]
public class CachedTechnologyServices(IAutoQueryDb autoQuery) : Service
{
    public object Any(FindTechnologies request)
    {
        using var db = autoQuery.GetDb(request, base.Request);
        var q = autoQuery.CreateQuery(request, base.Request, db);
        return autoQuery.Execute(request, q, base.Request, db);
    }

    public object Any(QueryTechnology request)
    {
        using var db = autoQuery.GetDb(request, base.Request);
        var q = autoQuery.CreateQuery(request, base.Request, db);
        return autoQuery.Execute(request, q, base.Request, db);
    }

    public object Get(GetTechnology request)
    {
        if (string.IsNullOrEmpty(request.Slug))
            throw new ArgumentNullException(nameof(request.Slug));

        var tech = int.TryParse(request.Slug, out var id)
            ? Db.SingleById<Technology>(id)
            : Db.Single<Technology>(x => x.Slug == request.Slug.ToLower());

        if (tech == null)
            throw HttpError.NotFound("Tech stack not found");

        var techStacks = Db.Select(Db.From<TechnologyStack>()
            .Join<TechnologyChoice>()
            .Join<TechnologyChoice, Technology>()
            .Where<TechnologyChoice>(x => x.TechnologyId == tech.Id)
            .OrderByDescending(x => x.LastModified));

        return new GetTechnologyResponse
        {
            Technology = tech,
            TechnologyStacks = techStacks
        };
    }

    public object Get(GetTechnologyFavoriteDetails request)
    {
        var tech = int.TryParse(request.Slug, out var id)
            ? Db.SingleById<Technology>(id)
            : Db.Single<Technology>(x => x.Slug == request.Slug.ToLower());

        var favoriteCount =
            Db.Count<UserFavoriteTechnology>(x => x.TechnologyId == tech.Id);

        return new GetTechnologyFavoriteDetailsResponse
        {
            FavoriteCount = (int)favoriteCount
        };
    }
}