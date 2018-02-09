﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.OrmLite;
using ServiceStack.Web;
using TechStacks.ServiceModel;
using TechStacks.ServiceModel.Types;

namespace TechStacks.ServiceInterface.Filters
{
    public class TechFilters
    {
        public static void FilterCreateTechRequest(IRequest req, IResponse res, CreateTechnology dto)
        {
            var dbFactory = req.TryResolve<IDbConnectionFactory>();

            if (req.Verb == "POST")
            {
                using (var db = dbFactory.OpenDbConnection())
                {
                    //Check unqiue name
                    var exists = db.Single<Technology>(x => x.Name.ToLower() == dto.Name.ToLower());
                    if (exists != null)
                    {
                        throw HttpError.Conflict("A Technology with that name already exists");
                    }
                }
            }
        }

        public static void FilterUpdateTechRequest(IRequest req, IResponse res, UpdateTechnology dto)
        {
            var dbFactory = req.TryResolve<IDbConnectionFactory>();

            if (req.Verb == "PUT")
            {
                using (var db = dbFactory.OpenDbConnection())
                {
                    //Check unqiue name
                    var exists = db.Single<Technology>(x => x.Name.ToLower() == dto.Name.ToLower());
                    if (exists != null && exists.Id != dto.Id)
                    {
                        throw HttpError.Conflict("A Technology with that name already exists");
                    }
                }
            }
        }
    }
}
