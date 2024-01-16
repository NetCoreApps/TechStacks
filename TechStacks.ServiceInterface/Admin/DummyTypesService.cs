using System.Collections.Generic;
using ServiceStack;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceInterface.Admin;

public class DummyTypes 
{
    public List<Post> Post { get; set; }
}

public class DummyTypesService : Service
{
    public object Any(DummyTypes request) => request;
}