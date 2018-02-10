using System;
using ServiceStack.Data;
using ServiceStack.OrmLite;

namespace TechStacks.Tests
{
    public class DbTasksBase
    {
        public readonly IDbConnectionFactory dbFactory = new OrmLiteConnectionFactory(
            Environment.GetEnvironmentVariable("TECHSTACKS_DB"),
            PostgreSqlDialect.Provider);
    }
}