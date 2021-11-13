using System;
using ServiceStack.Data;
using ServiceStack.OrmLite;

namespace TechStacks.Tests;

public class DbTasksBase
{
    public static OrmLiteConnectionFactory RegisterDialects(OrmLiteConnectionFactory factory)
    {
        factory.RegisterDialectProvider(nameof(PostgreSqlDialect), PostgreSqlDialect.Provider);
        return factory;
    }

    public readonly OrmLiteConnectionFactory dbFactory = RegisterDialects(
        new OrmLiteConnectionFactory(
            Environment.GetEnvironmentVariable("TECHSTACKS_DB"),
            PostgreSqlDialect.Provider));
}