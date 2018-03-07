using System;
using System.Collections.Generic;
using ServiceStack;

namespace TechStacks.ServiceModel
{
    [Route("/sync/discourse/{Site}")]
    public class SyncDiscourseSite
    {
        public string Site { get; set; }
    }

    public class SyncDiscourseSiteResponse
    {
        public string TimeTaken { get; set; }

        public List<string> UserLogs { get; set; }

        public List<string> PostsLogs { get; set; }

        public ResponseStatus ResponseStatus { get; set; }
    }
}