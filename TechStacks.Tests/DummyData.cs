using System;
using System.Data;
using ServiceStack.OrmLite;
using TechStacks.ServiceInterface;
using TechStacks.ServiceModel.Types;

namespace TechStacks.Tests;

public class DummyData
{
    public static IMarkdownProvider Markdown = new MarkdownProvider();

    public Post NewsPost(PostType type, int techId, string title, string url = null, string content = null, int comments = 0, int upVotes = 1, int userId = 1, string userName = "demisbellot") => new Post
    {
        Type = type,
        OrganizationId = techId,
        Title = title,
        Slug = title.GenerateSlug(),
        Url = url,
        Content = content,
        ContentHtml = Markdown.Transform(content),
        CommentsCount = comments,
        UserId = userId,
        UpVotes = upVotes,
        Created = DateTime.Now,
        CreatedBy = userName,
        Modified = DateTime.Now,
        ModifiedBy = userName
    };

    private void AddPostVotes(IDbConnection db)
    {
        db.Insert(new PostVote { PostId = 1, UserId = 2, Weight = 1, Created = DateTime.Now });
        db.Insert(new PostVote { PostId = 2, UserId = 2, Weight = -1, Created = DateTime.Now });
        db.Insert(new PostVote { PostId = 3, UserId = 2, Weight = 1, Created = DateTime.Now });
    }

    private void AddPosts(IDbConnection db)
    {
        var postId = db.Insert(NewsPost(PostType.Question, 9, "Redis benchmark for a few instance, benchmark process often stuck in D(disk sleep) process state",
            content: @"I have more than 5 redis server in one server machine and a client machine (54 core, 256G, 1000Mbps).

I launch benchmark for every server instance in client machine.

When I launch more than 3 benchmark process, the benchmark process state will be D sometimes and cpu usage for each process come down.

It seems redis-benchmark are waiting for I/O, and I cannot find the bottleneck of my client machine.

1. no disk i/o
2. network pps 40w, no limited
3. network bandwidth 200Mbit/s
4. cpu usage of each benchmark process: 30%", comments: 9, upVotes: 10), selectIdentity: true);

        AddPostComments(db, postId);

        db.Insert(NewsPost(PostType.Announcement, 9, "Redis 3.2.7 is out: IMPORTANT SECURITY FIXES INSIDE",
            content: @"
Redis 3.2.7     Released Tue Jan 31 16:21:41 CET 2017
=====================================================

Upgrade urgency HIGH: This release fixes important security and correctness
                      issues. It is especially important to upgrade for Redis
                      Cluster users and for users running Redis in their laptop
                      since a cross-scripting attack is fixed in this release.

Main bugs fixes and improvements in this release:

1. MIGRATE could incorrectly move keys between Redis Cluster nodes by turning
   keys with an expire set into persisting keys. This bug was introduced with
   the multiple-keys migration recently. It is now fixed. Only applies to
   Redis Cluster users that use the resharding features of Redis Cluster.

2. As Redis 4.0 beta and the unstable branch already did (for some months at
   this point), Redis 3.2.7 also aliases the Host: and POST commands to QUIT
   avoiding to process the remaining pipeline if there are pending commands.
   This is a security protection against a ""Cross Scripting"" attack, that
   usually involves trying to feed Redis with HTTP in order to execute commands.
   Example: a developer is running a local copy of Redis for development
   purposes. She also runs a web browser in the same computer. The web browser
   could send an HTTP request to http://127.0.0.1:6379 in order to access the
   Redis instance, since a specially crafted HTTP requesta may also be partially
   valid Redis protocol. However if POST and Host: break the connection, this
   problem should be avoided. IMPORTANT: It is important to realize that it
   is not impossible that another way will be found to talk with a localhost
   Redis using a Cross Protocol attack not involving sending POST or Host: so
   this is only a layer of protection but not a definitive fix for this class
   of issues.

3. A ziplist bug that could cause data corruption, could crash the server and
   MAY ALSO HAVE SECURITY IMPLICATIONS was fixed. The bug looks complex to
   exploit, but attacks always get worse, never better (cit). The bug is very
   very hard to catch in practice, it required manual analysis of the ziplist
   code in order to be found. However it is also possible that rarely it
   happened in the wild. Upgrading is required if you use LINSERT and other
   in-the-middle list manipulation commands.

4. We upgraded to Jemalloc 4.4.0 since the version we used to ship with Redis
   was an early 4.0 release of Jemalloc. This version may have several
   improvements including the ability to better reclaim/use the memory of
   system.

The following is the list of commits:

antirez in commit 3876d98:
 Ziplist: insertion bug under particular conditions fixed.
 1 file changed, 9 insertions(+), 1 deletion(-)

antirez in commit 153f2f0:
 Jemalloc updated to 4.4.0.
 150 files changed, 17271 insertions(+), 6356 deletions(-)

miter in commit ca532c9:
 Change switch statment to if statment
 1 file changed, 2 insertions(+), 4 deletions(-)

oranagra in commit a735035:
 fix rare assertion in DEBUG DIGEST
 1 file changed, 1 insertion(+), 1 deletion(-)

Itamar Haber in commit b917e3f:
 Verify pairs are provided after subcommands
 1 file changed, 1 insertion(+), 1 deletion(-)

antirez in commit 1177cf6:
 Avoid geo.c warning in initialization.
 1 file changed, 1 insertion(+), 1 deletion(-)

antirez in commit 874804d:
 Security: Cross Protocol Scripting protection.
 3 files changed, 27 insertions(+), 2 deletions(-)

antirez in commit 273cd7f:
 Ziplist: remove static from functions, they prevent good crash reports.
 1 file changed, 14 insertions(+), 14 deletions(-)

Jan-Erik Rediger in commit 389b9f5:
 Initialize help only in repl mode
 1 file changed, 5 insertions(+), 5 deletions(-)

Yossi Gottlieb in commit 1370a88:
 Fix redis-cli rare crash.
 1 file changed, 4 insertions(+)

antirez in commit 68aab8e:
 MIGRATE: Remove upfront ttl initialization.
 1 file changed, 3 insertions(+), 4 deletions(-)

Jan-Erik Rediger in commit 788e892:
 Reset the ttl for additional keys
 1 file changed, 1 insertion(+)"));
        db.Insert(NewsPost(PostType.Post, 9, "Neural Redis (neural networks data structure extension for Redis machine learning) is out!",
            "https://github.com/antirez/neural-redis", comments: 1, upVotes: 101, userId: 2, userName: "layoric"));

        postId = db.Insert(NewsPost(PostType.Announcement, 9, "Redis 4.0 RC1 is out! My blog post about it", "http://antirez.com/news/110", comments: 2, upVotes: 1123, userId: 2, userName: "layoric"),
            selectIdentity: true);

        AddPostComments(db, postId);
    }

    private void AddPostComments(IDbConnection db, long postId)
    {
        const int u1Id = 1;
        const string u1 = "demisbellot";
        const int u2Id = 2;
        const string u2 = "layoric";

        var id = db.Insert(new PostComment
        {
            PostId = postId,
            UserId = u1Id,
            CreatedBy = u1,
            Modified = DateTime.Now,
            Created = DateTime.Now,
            UpVotes = 6,
            Content =
                @"You're not being very clear what you're talking about.

> When I launch more than 3 benchmark process, the benchmark process state will be D sometimes and cpu usage for each process come down.

This sounds like you're saying the benchmark clients are waiting on disk. But this is the Reddit for the server, so perhaps you're describing the Redis server processes? Would you please clarify?"
        }, selectIdentity: true);

        id = db.Insert(new PostComment
        {
            PostId = postId,
            ReplyId = id,
            UserId = u2Id,
            CreatedBy = u2,
            Modified = DateTime.Now.AddMinutes(-1),
            Created = DateTime.Now.AddMinutes(-1),
            UpVotes = 2,
            Content =
                @"Sorry for the describe. The server have not meet bottleneck, CPU usage is low and can increase when bench from another client server. I want to know the bottleneck of my single client host. Why benchmark process in ""D"" state?"
        }, selectIdentity: true);

        id = db.Insert(new PostComment
        {
            PostId = postId,
            ReplyId = id,
            UserId = u1Id,
            CreatedBy = u1,
            Modified = DateTime.Now.AddMinutes(-1),
            Created = DateTime.Now.AddMinutes(-1),
            UpVotes = 2,
            Content =
                @"Ah, you're asking about the redis-benchmark client program. A process in 'D' state is waiting for I/O to finish. This can occur because the process is waiting for disk I/O to finish, it's true. But that's not the only reason. It can occur because the process is waiting for other kinds of I/O, like network.

Since the redis-benchmark process sends commands to the Redis server, it also receives the replies. Generating the key and value names doesn't take much time and transmitting to the server doesn't either. So a larger portion of the time will be spent waiting for the reply from the server. At the particular instant that ps captures the process's state, it's more likely to be in the state that's waiting for a reply than in the middle of transmitting a command.

I think that's all it is - redis-benchmark behaving normally."
        }, selectIdentity: true);

        id = db.Insert(new PostComment
        {
            PostId = postId,
            ReplyId = id,
            UserId = u2Id,
            CreatedBy = u2,
            Modified = DateTime.Now.AddMinutes(-5),
            Created = DateTime.Now.AddMinutes(-5),
            UpVotes = 2,
            Content =
                @"Thanks for your comment.

In my side, when I launch one benchmark process everything looks good, when I launch more than 3 benchmark processes to different redis server the benchmark cpu usage come down.

Both server and client cpu/network resource is abundant. Futher more, client and server i/o is event-based(epoll in my environment), client dose not need block to wait for server reply. My interpretation is wrong?"
        }, selectIdentity: true);

        id = db.Insert(new PostComment
        {
            PostId = postId,
            ReplyId = id,
            UserId = u1Id,
            CreatedBy = u1,
            Modified = DateTime.Now.AddMinutes(id * -20),
            Created = DateTime.Now.AddMinutes(id * -20),
            UpVotes = 2,
            Content =
                @"Can you post an example of the redis-benchmark commands you're running? It's not easy to know what resources the commands will consume on the client computer without seeing the tasks you're asking them to perform."
        }, selectIdentity: true);

        id = db.Insert(new PostComment
        {
            PostId = postId,
            ReplyId = id,
            UserId = u2Id,
            CreatedBy = u2,
            Modified = DateTime.Now.AddMinutes(id * -20),
            Created = DateTime.Now.AddMinutes(id * -20),
            UpVotes = 2,
            Content =
                @"Sure. the system screenshot in google docs: https://docs.google.com/document/d/1MjdLPW1KngWedJORdpwCjblUygUFi-2Hoz30ezpifhA/edit?usp=sharing"
        }, selectIdentity: true);

        id = db.Insert(new PostComment
        {
            PostId = postId,
            ReplyId = id,
            UserId = u1Id,
            CreatedBy = u1,
            Modified = DateTime.Now.AddMinutes(id * -20),
            Created = DateTime.Now.AddMinutes(id * -20),
            UpVotes = 2,
            Content =
                @"Is the screenshot correct?

 - There are no other command-line options to the right of ""-q set {key:0000000nnnnn}"" that your terminal window failed to wrap around and make visible?
 - Are you really running all 7 processes with ""-n 10000000000"" (send 10 billion requests)?"
        }, selectIdentity: true);

        id = db.Insert(new PostComment
        {
            PostId = postId,
            ReplyId = id,
            UserId = u2Id,
            CreatedBy = u2,
            Modified = DateTime.Now.AddMinutes(id * -20),
            Created = DateTime.Now.AddMinutes(id * -20),
            UpVotes = 2,
            Content =
                @"It's correct And the commands are complete.

I use redis cluster of 10 redis master nodes, so I use specific key for different master.

I start benchmark with '-n 10000000000' to make benchmark process last for a longer time."
        }, selectIdentity: true);

        id = db.Insert(new PostComment
        {
            PostId = postId,
            ReplyId = id,
            UserId = u1Id,
            CreatedBy = u1,
            Modified = DateTime.Now.AddMinutes(id * -20),
            Created = DateTime.Now.AddMinutes(id * -20),
            UpVotes = 2,
            Content =
                @"My interpretation of the situation is that your redis-benchmark commands are consuming unexpected machine resources because of the extremely large '-n' option (request count). If I'm correctly interpreting the process listing you posted, each of the redis-benchmark commands are consuming 12GB or RAM. (there also seems to be a Redis server process on the same machine, which doesn't match with your original description that this machine is only running the redis-benchmark commands)

I suggest cutting down the '-n' option to 100000 and see if the processes display different behavior."
        }, selectIdentity: true);

        db.Select<PostComment>().ForEach(x =>
        {
            x.ContentHtml = Markdown.Transform(x.Content);
            db.Save(x);
        });
    }
}