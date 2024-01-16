using System;
using ServiceStack.DataAnnotations;

namespace TechStacks.ServiceModel.Types;

public class UserActivity
{
    public int Id { get; set; }

    public string UserName { get; set; }

    [Default(0)]
    public int Karma { get; set; }

    [Default(0)]
    public int TechnologyCount { get; set; }

    [Default(0)]
    public int TechStacksCount { get; set; }

    [Default(0)]
    public int PostsCount { get; set; }

    [Default(0)]
    public int PostUpVotes { get; set; }

    [Default(0)]
    public int PostDownVotes { get; set; }

    [Default(0)]
    public int CommentUpVotes { get; set; }

    [Default(0)]
    public int CommentDownVotes { get; set; }

    [Default(0)]
    public int PostCommentsCount { get; set; }

    [Default(0)]
    public int PinnedCommentCount { get; set; }

    [Default(0)]
    public int PostReportCount { get; set; }

    [Default(0)]
    public int PostCommentReportCount { get; set; }

    public DateTime Created { get; set; }
    public DateTime Modified { get; set; }
}

public class UserFavoriteTechnologyStack
{
    [AutoIncrement]
    public int Id { get; set; }

    public string UserId { get; set; }

    [References(typeof(TechnologyStack))]
    public int TechnologyStackId { get; set; }
}

public class UserFavoriteTechnology
{
    [AutoIncrement]
    public int Id { get; set; }

    public string UserId { get; set; }

    [References(typeof(Technology))]
    public int TechnologyId { get; set; }
}