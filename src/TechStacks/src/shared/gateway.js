import { JsonServiceClient, toFormData } from "@servicestack/client";
import { 
    GetConfig, 
    Overview, 
    OverviewResponse, 
    ConvertSessionToToken,
    GetTechnology, 
    GetTechnologyStack, 
    GetPageStats,
    GetAllTechnologies,
    GetAllTechnologyStacks,
    QueryTechnology,
    QueryTechStacks,
    GetUserInfo,
    SessionInfo,
    GetUserFeed,
    AddFavoriteTechnology,
    RemoveFavoriteTechnology,
    AddFavoriteTechStack,
    RemoveFavoriteTechStack,
    CreateTechnology,
    UpdateTechnology,
    DeleteTechnology,
    CreateTechnologyStack,
    UpdateTechnologyStack,
    DeleteTechnologyStack,
    GetTechnologyPreviousVersions,
    GetTechnologyStackPreviousVersions,
} from "./dtos";

export const client = new JsonServiceClient("/");

export const getConfig = async () => await client.get(new GetConfig());

export const getOverview = async () => await client.get(new Overview());

export const convertSessionToToken = async () => await client.get(new ConvertSessionToToken());

export const getAllTechnologies = async () => await client.get(new GetAllTechnologies(), { include: 'total' });

export const getAllTechStacks = async () => await client.get(new GetAllTechnologyStacks(), { include: 'total' });

export const queryTechnology = async (query) => await client.get(new QueryTechnology(), { include: 'total', ...query });

export const queryTechStacks = async (query) => await client.get(new QueryTechStacks(), { include: 'total', ...query });

export const getTechnology = async(slug) => {
    const request = new GetTechnology();
    request.slug = slug;
    const response = await client.get(request);
    return { 
        ...response.technology,
        technologyStacks: response.technologyStacks
    }
}

export const getTechnologyStack = async(slug) => {
    const request = new GetTechnologyStack();
    request.slug = slug;
    return await client.get(request);
}

export const getPageStats = async(type, slug, id) => {
    const request = new GetPageStats();
    request.type = type;
    request.slug = slug;
    if (id != null)
        request.id = id;
    return await client.get(request);
}

export const getUserInfo = async(username) => {
    const request = new GetUserInfo();
    request.userName = username;
    return await client.get(request);
}

export const getSessionInfo = async() => {
    try {
        return await client.get(new SessionInfo());
    } catch (e) {
        return null;
    }
}

export const getUserFeed = async() => {
    try {
        return (await client.get(new GetUserFeed())).results;
    } catch (e) {
        return null;
    }
}

export const addFavoriteTechnology = async (id) => {
    const request = new AddFavoriteTechnology();
    request.technologyId = id;
    return (await client.put(request)).result;
}

export const removeFavoriteTechnology = async (id) => {
    const request = new RemoveFavoriteTechnology();
    request.technologyId = id;
    return (await client.delete(request)).result;
}

export const addFavoriteTechStack = async (id) => {
    const request = new AddFavoriteTechStack();
    request.technologyStackId = id;
    return (await client.put(request)).result;
}

export const removeFavoriteTechStack = async (id) => {
    const request = new RemoveFavoriteTechStack();
    request.technologyStackId = id;
    return (await client.delete(request)).result;
}

export const createTechnology = async(args, logo) => {
    const request = new CreateTechnology();
    const body = toFormData({...args, logo });
    return (await client.postBody(request, body)).result;
}

export const updateTechnology = async(args, logo) => {
    const request = new UpdateTechnology();
    const body = toFormData({...args, logo });
    return (await client.putBody(request, body)).result;
}

export const deleteTechnology = async(id) => {
    return await client.delete(new DeleteTechnology(), { id });
}

export const createTechStack = async(args, logo) => {
    const request = new CreateTechnologyStack();
    const body = toFormData({...args, logo });
    return (await client.postBody(request, body)).result;
}

export const updateTechStack = async(args, logo) => {
    const request = new UpdateTechnologyStack();
    const body = toFormData({...args, logo });
    return (await client.putBody(request, body)).result;
}

export const deleteTechStack = async(id) => {
    return await client.delete(new DeleteTechnologyStack(), { id });
}

export const getTechnologySelectItems = async() => {
    const request = new QueryTechnology();
    const results = (await client.get(request, { orderBy:"tier,name", fields:"id,name,tier", jsconfig:"edv" })).results;
    const to = results.map(x => ({ text:`${x.tier} - ${x.name}`, value:x.id }));
    return to;
}

export const getTechnologyPreviousVersions = async(slug) => {
    const request = new GetTechnologyPreviousVersions();
    request.slug = slug;
    return (await client.get(request)).results;
}

export const getTechStackPreviousVersions = async(slug) => {
    const request = new GetTechnologyStackPreviousVersions();
    request.slug = slug;
    return (await client.get(request)).results;
}
