using System;
using System.Collections.Generic;
using System.IO;
using ServiceStack;
using ServiceStack.DataAnnotations;
using ServiceStack.Web;

namespace TechStacks.ServiceModel
{
    [Route("/prerender/{Path*}", "PUT")]
    public class StorePreRender : IRequiresRequestStream, IReturnVoid, IPut
    {
        public string Path { get; set; }
        
        public Stream RequestStream { get; set; }
    }

    [Route("/prerender/{Path*}", "GET")]
    public class GetPreRender : IReturn<string>, IGet
    {
        public string Path { get; set; }
    }

    public class PreRender
    {
        [PrimaryKey]
        public string Path { get; set; }
        
        public byte[] Data { get; set; }
        
        public string ContentType { get; set; }
        
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        
        public DateTime Modified { get; set; }
        public string ModfiedBy { get; set; }
    }
    
    
    [Route("/prerender/sites")]
    public class GetPathsToRender : IGet {}

    public class GetPathsToRenderResponse
    {
        public List<string> Results { get; set; }
    }
}