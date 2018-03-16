using System;
using ServiceStack.DataAnnotations;

namespace TechStacks.ServiceInterface.DataModel
{
    public class EmailTemplate
    {
        public string From { get; set; }
        public string FromName { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public string BodyHtml { get; set; }

        public string MetaType { get; set; }
        [PgSqlJsonB]
        public string Meta { get; set; }

        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
    }
}