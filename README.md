# The New TechStacks

![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/release-notes/techstacks-new.png)

Given the impressive development velocity enabled by the [Nuxt](http://docs.servicestack.net/templates-nuxt) and [Vuetify](http://docs.servicestack.net/templates-vuetify) power combo, we decided to rewrite [https://techstacks.io](https://techstacks.io) using it. The [original TechStacks website](http://angular.techstacks.io) was built in **2014** with what was considered the state-of-the-art Technology Stack for .NET SPA at the time: i.e. Angular 1.x / Bootstrap Website hosted on .NET's recommended system software of ASP.NET / IIS / Windows Server.

A lot has changed since then, in both the JavaScript and .NET Server ecosystems. [Angular 1.x](https://angularjs.org) was surpassed by a complete rewrite of Angular 2+ in TypeScript in its [latest version](https://angular.io). During that time both have since been eclipsed in popularity by [React](https://github.com/facebook/react) and [Vue](https://github.com/vuejs/vue) with nearly 3x the popularity by stars on GitHub. We like React for true Single Page Apps like IDEs and what we used to [develop Gistlyn](https://github.com/ServiceStack/Gistlyn). But for multi-page Apps we prefer Vue which has a higher fidelity and better encapsulation of HTML pages with its [Single File Components](https://vuejs.org/v2/guide/single-file-components.html).

Nuxt further enhances Vue with an opinionated convention-based framework that combines the most popular Vue libraries into a unified solution, perfect for multi-page Web Apps like TechStacks. 
Nuxt provides the prescribed architecture, development model and core functionality whilst Vuetify provides the UI Layout and comprehensive suite of UI Components - combining into an elegant solution that dramatically reduces the development and design effort to develop a Single Page Apps like TechStacks.

On the .NET side, .NET Core became the future platform for hosting .NET Apps with its leaner, faster and cross-platform runtime. It's ability to run flawlessly on Linux makes it our default choice for new projects where we readily take advantage of its superior automation and ecosystem.

#### Before and After

So given the current ecosystem we ported TechStacks to what we consider is the state-of-the-art Technology Stack for developing .NET Apps in **2018**, starting from the .NET Core [vuetify-nuxt](https://github.com/NetCoreTemplates/vuetify-nuxt) Template. Visually the before/after Technology Stack for TechStacks is:

[![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/release-notes/techstacks-before-after.png)](https://techstacks.io/stacks/techstacks/)

### Resilience of ServiceStack

What's noteworthy about the development of the new TechStacks Website was that despite having a completely rewritten UI on the front-end, running on the new .NET Core Runtime and Linux Operating System on the back-end, the one thing that could be reused as-is was its Services implementation - which speaks to both the timelessness of [ServiceStack's API Design](/api-design) for cleanly capturing the intent of its declarative Service Contracts and the near-perfect source-code compatibility with .NET Core - preserving and future-proofing existing ServiceStack investments by making it trivial to port to .NET Core as and when needed.

Also despite some existing tables being modified to support the expanded feature-set, the [Old TechStacks Website](http://angular.techstacks.io) continues to run, using the old OrmLite POCO Data Models to connect to the same database as the New TechStacks Website. This resilience also extends to the existing [Swift TechStacks iOS App](https://github.com/ServiceStackApps/TechStacksApp) which continues to run unmodified despite now accessing enhanced modified Services that's now being proxied through Netlify's CDN. The primary disruptive change to Services was that they now use .NET Core's default **camelCase** property names which also doesn't impact existing iOS Mobile Apps thanks to the [Swift JsonServiceClient](/swift-add-servicestack-reference) supporting case-insensitive properties.

For comparison purposes we're continuing to host the old Website:

#### New TechStacks

  - URL: [techstacks.io](https://techstacks.io)
  - Source Code: [github.com/NetCoreApps/TechStacks](https://github.com/NetCoreApps/TechStacks)

#### Old TechStacks

  - URL: [angular.techstacks.io](http://angular.techstacks.io)
  - Source Code: [github.com/ServiceStackApps/TechStacks](https://github.com/ServiceStackApps/TechStacks)

Both code-bases are Open Source and provide a good reference of our preferences in developing a mildly complex medium-sized ServiceStack App which now exceeds **100 Services** to support its expanded feature-set.

### Netlify CDN

One of the goals for TechStacks is to develop an efficient implementation that maximizes the scalability of the App Server. Some of the techniques include utilizing PostgreSQL's rich data types to minimize/eliminate table joins, Indexes for popular queries, maintenance of manual caches of aggregate query results, simple response caching, etc. 

Another strategy adopted to reduce the load off the App Server is to host the static Nuxt generated website in `/wwwroot` on Netlify's CDN as [described above](#host-static-content-on-netlifys-cdn-for-free) which is configured to proxy all API requests and built-in ServiceStack features using this [_redirects](https://github.com/NetCoreApps/TechStacks/blob/master/src/TechStacks/src/static/_redirects) file.

Whilst proxying provides the cleanest and most transparent solution, it can add a noticeable sub-second latency to API Requests so we've opted instead to [enable CORS](https://github.com/NetCoreApps/TechStacks/blob/17bbcdde189de4c59075942fb3985a2c75da07a1/src/TechStacks/Startup.cs#L255) and have API Requests call the App Server directly, done by configuring 2 Service Clients: 

```ts
const usingProxy = location.host == "techstacks.io";

const BaseUrl = usingProxy
    ? "https://www.techstacks.io/"  // .NET Core App Server on AWS LightSail
    : "/";

const AuthBaseUrl = usingProxy
    ? "https://techstacks.io/"      // Netlify
    : "/";

export const client = new JsonServiceClient(BaseUrl);
export const authClient = new JsonServiceClient(AuthBaseUrl); 
```

Where [https://techstacks.io](https://techstacks.io) serves the static website hosted from Netlify's CDN and [https://www.techstacks.io](https://www.techstacks.io) serves content directly from the App Server via an nginx reverse proxy.

The different domains means we need to transfer the Authenticated Session that's attached to the [techstacks.io](https://techstacks.io) domain by converting the Authenticated Session into a JWT Token that's sent to the App Server in parallel requests to retrieve the Authenticated User Info and convert the JWT Token into a Cookie so it's re-sent on every subsequent request to the App Server: 

```ts
export const getSessionInfo = async() => {
    try {
        //Converts Session to JWT Token Cookie
        const authResponse = await authClient.post(new ConvertSessionToToken());

        client.bearerToken = authResponse.accessToken;
        const [response, authResponse2] = await Promise.all([
            client.get(new SessionInfo()),
            client.post(new ConvertSessionToToken()),
        ]);

        //Remove unnecessary JWT from HTTP Headers so only JWT Cookie is used
        client.bearerToken = authClient.bearerToken = null;
        client.headers.delete('Authorization');
        authClient.headers.delete('Authorization');

        return response;
    } catch (e) {
        return null;
    }
}
```

### AWS LightSail

With these pro-active efficiency techniques we're confident in hosting on [AWS's $5/mo LightSail Server](https://aws.amazon.com/lightsail/) which we're happy to see still yielding a fast and responsive User Experience. We'll monitor the resource usage and report back on how much load it can withstand before requiring a hardware bump.

### ServiceStack Community Resources

One of the primary motivations for rewriting TechStacks was to create useful resource for the ServiceStack Community to be able to collaborate and contribute to as currently ServiceStack community content is scattered across several different sites:

 - [Questions/Issues/Discussion/Announcements on Discourse Forums](https://forums.servicestack.net)
 - [Questions/Issues on StackOverflow](https://stackoverflow.com/search?q=servicestack)
 - [Issues on GitHub](https://github.com/ServiceStack/Issues)
 - [Feature Requests on UserVoice](https://servicestack.uservoice.com/forums/176786-feature-requests)
 - [Announcements on Twitter](https://twitter.com/ServiceStack)
 - [Discussion/Announcements on Google+](https://plus.google.com/u/0/communities/112445368900682590445)

This situation is less than ideal as developers don't have a single resource they can frequent to find existing content and get in touch with the rest of the Community. There's also several things we dislike about all sites. Despite Discourse being one of the best forum software available we see a few issues with it like its search and discovery features aren't great, doesn't display threaded conversations well, not optimal for contributing developer content. StackOverflow is very strict about what content it will accept, lacks a welcoming community atmosphere and its markdown support isn't as good as GitHub Flavored Markdown. UserVoice is poor at moderation, editing and discussion, Twitter's only ideal for notifications and Google+ is poor at nearly all forms of rich content, discovery, threaded comments, etc.

None of the resources are particularly great at sharing community content like showcasing people's creations, blog posts, announcements or their preferred technology stacks they've used to create their Apps with - which is the kind of community content we're most interested in seeing more of and why TechStacks was originally created. 

It should also be easy for Developers to be able to subscribe to just the content their interested in which we don't believe any sites do particularly well, at least none that's optimized for programming/technology content so we decided to enhance TechStacks with the community features we've always wanted with a blend of our favorite features from Reddit, Hacker News, Discourse, StackOverflow and UserVoice. This is less daunting than it sounds given there are whole companies dedicated full-time to creating collaborative software, but armed with the most productive technology stack we've had the pleasure of using in Nuxt, Vuetify, ServiceStack, OrmLite and PostgreSQL - we knew we could churn out the features for a useful MVP in record time, and what we ended up doing.

### The new Community enhanced TechStacks

We're extremely happy with the current state of the new TechStacks which has been enhanced to make it easy to find, discuss and share information on your favorite technologies with others sharing similar interests.

You can utilize the rich markup and syntax highlighting features in [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/) within a developer-friendly Markdown Editor to post news, announcements and showcase stuff you're working on to reach and get feedback on your creations, which you can either post in a wide topic like a programming language or create and invite others to your own organization - your own space where to be able to collaborate with users of your technology or App.

TechStacks is ideal for technology organizations to host their own communities. Each organization can take advantage of multiple levels of moderation with different moderation features available to Owners and Moderators to control access for Organization Members and non-members. Moderators have complete control over any content posted within their organization, where they can delete, edit unwanted posts and comments, lock or hide controversial posts, or if preferred can choose to limit contributions between approved invite-only members as well as enlisting others to help moderate. To help with mitigating unwanted content each post and comment can be reported in which Moderators can quickly act upon, or set a threshold to automatically delete controversial content when it reaches a user-defined limit.

The ServiceStack Organization Admin page gives a preview of the different moderation features available:

![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/release-notes/techstacks-organization-moderation.png)

Whilst members contribute content, collaborate and subscribe to receive notifications within their respective Organizations, all content is aggregated on the homepage to make it easy for people find and subscribe to content on technology they're interested in, within a fast and enjoyable experience. Our aim is to improve the discoverability of technologies by making it easy to filter out unwanted noise and drill down to each technology to select the types of content you're interested in. For example you can click on the `javascript` tag and select [`Announcements` and `Showcase`](https://techstacks.io/?types=Announcement,Showcase&t=javascript) tabs to find news and interesting JavaScript content.

Our choice to develop TechStacks as a Nuxt SPA lets us add high-productivity features like Keyboard shortcuts and gestures which would otherwise yield a subpar experience on a traditional full-page reload website. As a result frequent users can benefit from site-wide shortcuts to quickly navigate, edit, contribute and browse around the site. Shortcut keys are discoverable in the labels of links and buttons across the site or by typing **`?`** to bring up the shortcuts dialog:

![shortcuts dialog](https://imgur.com/w4CdC6U.png)

### ServiceStack Community Changes

The new TechStacks ServiceStack Community is open and available at: 

### [techstacks.io/servicestack](https://techstacks.io/servicestack)

It's now open to all ServiceStack Customers to ask questions, submit posts and feature requests or showcase their creations or useful projects they would like to share to the rest of the Community. Currently Sign In's are currently limited to GitHub and Twitter Accounts where you'll need to [register your email or GitHub username](https://servicestack.net/account/support) before signing in.

In an effort to consolidate community content into a single location, all existing **feature requests** have been imported from UserVoice and **new posts** are being synced daily from the Discourse Customer Forums. We'll also be syncing any ServiceStack Questions and Answers posted on StackOverflow as we improve searchability and discoverability over all imported content.

We're going to continue hosting the [Discourse Customer Forums](https://servicestack.net/account/support) in parallel until we've implemented enough missing features that the majority of our active Customer base prefer it over Discourse. Although it may be the case that most people will always prefer Discourse in which case we'll leave it open and focus our efforts on providing better searchability of the imported content and improving overall discoverability whilst tailoring it for bespoke content like executable snippets, show cases, articles, etc.

But as their mostly operating as disconnected silos, we'll be **closing down UserVoice and the Google+ community** and directing users to contribute and subscribe to the [ServiceStack Organization on TechStacks](https://techstacks.io/servicestack) for updates.

## Solution Highlights

An important part of improving ServiceStack's usability is to [routinely create new Apps](https://github.com/ServiceStackApps/LiveDemos) to test new features in practice so we can identify and resolve any friction points with either new/enhanced features or documented working strategies. 

### Deployments

One of the reasons we love .NET Core is being able to leverage the rich simple tooling in the Linux ecosystem which is also available from inside Windows via [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10). After a [one-time setup of configuring nginx and supervisord](http://templates.servicestack.net/docs/deploying-web-apps#deploying-multiple-web-apps-to-ubuntu) our deployments are reduced down to:

    $ npm run deploy

Which runs these [npm scripts](https://github.com/NetCoreApps/TechStacks/blob/b933edac8219a4cc02cef640a89515a9895c700e/src/TechStacks/package.json#L10-L11) in the project's `package.json`:

    "publish": "nuxt build && dotnet publish -c Release",
    "deploy": "npm run publish && bash deploy.sh",

To generate a client and server production build of the App that then runs [deploy.sh](https://github.com/NetCoreApps/TechStacks/blob/master/src/TechStacks/deploy.sh) with WSL bash:

```sh
rsync -avz -e 'ssh' bin/Release/netcoreapp2.0/publish/ ubuntu@lightsail.web-app.io:/home/deploy/apps/techstacks
ssh ubuntu@lightsail.web-app.io "sudo supervisorctl restart web-techstacks"
```

Deploying the published App to TechStack's remote Ubuntu AWS LightSail server instance using `rsync` to only copy the incremental parts of the App that's changed (typically completing in <1s) and `ssh` to run a remote command to restart the `suprvisord` process, starting the .NET Core App with the latest deployed version.

### Client / Server Validation with Vuetify

TechStacks uses [Vuetify Form Components](https://vuetifyjs.com/en/components/forms) for all Input controls, one of the advantages they provide is a consistent validation model across all their controls which supports validation rules in the form of an array of lambda expressions and an `error-message` property for manually assigning error messages.

We'll walk through the [CategoryEdit.vue](https://github.com/NetCoreApps/TechStacks/blob/master/src/TechStacks/src/components/CategoryEdit.vue) as a simple example of a CRUD form built with Vue/Vuetify which is used to **Update** and **Delete** existing categories or **Create** new ones. Refer to the source code for the complete implementation, we'll highlight and document the main parts containing the functionality to validate the form and send the API Requests.

All forms follows the same approach where they each have a validation `errorSummary` to display any General Service Exceptions and Vuetify Input controls configured to show both client-side and server validation errors. The `rules` attribute is where **client validation rules** are assigned, they can be declared in-line within the template but as the same rules are shared across multiple components they're declared in [/shared/utils.js](https://github.com/NetCoreApps/TechStacks/blob/master/src/TechStacks/src/shared/utils.js).

Each validation rule is a lambda that returns either `true` if the rule is valid or the Error Message String to show attached to the control. Here are the three validation rules for  `slugRules`:

```js
export const slugCounter = 50;
export const slugRules = [
  v => !!v || "Required",
  v => (v && v.length <= slugCounter) || `Max ${slugCounter} characters`,
  v => (v && /^[a-z0-9\-]+$/.test(v)) || `Only lowercase letters, numbers or hyphens allowed`,
];
```

The `counter` attribute is a nice UX feature of Vuetify Text Input controls to show the current and maximum characters for each field. The `errorResponse` is a method in `@servicestack/client` which returns the error message or errorCode of a specific field in a ServiceStack Error Response. Any Errors that aren't covered by specific field errors are shown in the form's summary `<v-alert/>` component. Here's the Vue Template which utilizes all these features using declarative markup:

```html
<template>

<v-form v-model="valid" ref="form" lazy-validation>
  <v-container>
    <v-alert outline color="error" icon="warning" :value="errorSummary">{{ errorSummary }}</v-alert>
    <v-layout column>

      <v-text-field
        label="Name"
        v-model="name"
        required                        
        :rules="nameRules"
        :counter="nameCounter"
        :error-messages="errorResponse('name')"
        ></v-text-field>

      <v-text-field
        label="Slug"
        v-model="slug"
        required
        :rules="slugRules"
        :counter="slugCounter"
        :error-messages="errorResponse('slug')"
        ></v-text-field>

      <v-text-field
        label="Summary"
        v-model="description"
        :counter="summaryCounter"
        multi-line
        :rows="2"
        :rules="summaryRulesOptional"
        :error-messages="errorResponse('description')"
        ></v-text-field>

      <v-select
        label="Select Technologies"
        autocomplete
        :loading="loading"
        multiple
        chips
        :error-messages="errorResponse('technologyIds')"
        :items="technologySelectItems"
        v-model="technologyIds"
        ></v-select>

    </v-layout>
  </v-container>
</v-form>

<v-layout>
    <v-flex xs2>
      <v-btn small @click="submit" color="primary" :disabled="!valid || loading">
        {{category ? 'Update' : 'Add'}}
      </v-btn>
    </v-flex>
    <v-flex xs2>
      <v-btn small @click="reset()">Close</v-btn>
    </v-flex>
    <v-flex xs4></v-flex>
    <v-flex>
      <v-layout>
        <v-checkbox small label="confirm" v-model="allowDelete"></v-checkbox>
        <v-btn small @click="remove" :disabled="!allowDelete">
            Delete
        </v-btn>                    
      </v-layout>
    </v-flex>
</v-layout>

</template>
```

Which renders the UI for Updating or Adding new Categories that looks like:

![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/release-notes/techstacks-category-update.png)

The documented implementation below explains the different parts of the component:

```js
import { mapGetters } from "vuex";
import { toObject, errorResponse, errorResponseExcept } from "@servicestack/client";

const category = { // All fields to send to the gateway when Updating or Adding a new Category
  organizationId: null,
  id: null,
  name: "",
  slug: "",
  description: "",
  technologyIds: [],
};

export default {
  computed: {
    errorSummary(){ // Return any other error that isn't assigned to an Input Control in the Forms Alert Component
      return errorResponseExcept.call(this,'name,slug,description,technologyIds'.split(','));
    },
    isUpdate(){     // Whether this component is updating an existing category or creating a new one
      return this.category != null; 
    },
    ...mapGetters(["loading", "isAuthenticated", "isAdmin", "user", "technologySelectItems"])
  },

  //...
  methods: {

    reset(changed, deleted) {                 // Reset form back to initial empty state
        this.responseStatus = this.name = this.slug = this.description = this.id = null;
        this.technologyIds = [];
        this.$emit('done', changed, deleted); // Fire @done callback allowing parent component to close this form
    },

    async submit() {
      if (this.$refs.form.validate()) {  // Validate any client-side validation rules before continuing
          try {
            this.$store.commit('loading', true); // Set global 'loading' state for the App & disable submit button
            
            // Create an object populated with all category property values in this Component
            const fields = toObject.call(this, Object.keys(category));

            const response = this.isUpdate       // Either Add a New or Update Existing Category
                ? await updateCategory(fields)
                : await addCategory(fields);
              
            this.reset(true); // Reset form back to initial empty state
          } catch(e) {
              this.responseStatus = e.responseStatus || e; // Bind ServiceStack's ErrorResponse to this Component
          } finally {
              this.$store.commit('loading', false); // Unset the 'loading' state
          }
      }
    },

    async remove() {
      try {
        this.$store.commit('loading', true);
        
        const response = await deleteCategory(this.organizationId, this.id);

        this.reset(true,true);
      } catch(e) {
          this.responseStatus = e.responseStatus || e;
      } finally {
          this.$store.commit('loading', false);
      }
    },

    errorResponse,          // Make the errorResponse method available to the template
  },

  mounted() {
      if (this.isUpdate) {  // If this component was called with an existing category, populate its fields
        Object.assign(this, this.category);
      } else {
        this.organizationId = this.orgId; // Assign which organization to add new Category to
      }
  },

  data: () => ({
      ...category,           // Make all properties in category reactive field in this component
      valid: true,           // Whether to show the user 
      allowDelete: false,    // Unlock delete button when user checks 'Confirm' checkbox
      nameCounter, nameRules, slugCounter, slugRules, summaryCounter, summaryRulesOptional,
      responseStatus: null,  // placeholder for ServiceStack's structured Error Response
  }),
}
```

The functionality relevant to ServiceStack includes assigning `this.responseStatus` which is all that's required to bind the Services structured Error Response to the Form and Input Controls:

```js
catch(e) {
    this.responseStatus = e.responseStatus || e; // Bind ServiceStack's ErrorResponse to this Component
}
```

The code that sends the API Requests for Updating and Adding a new Category is:

```js
// Create an object populated with all category property values in this Component
const fields = toObject.call(this, Object.keys(category));

const response = this.isUpdate
    ? await updateCategory(fields)
    : await addCategory(fields);
```

Which calls the methods below defined in [gateway.js](https://github.com/NetCoreApps/TechStacks/blob/master/src/TechStacks/src/shared/gateway.js) which encapsulates all API access sent within the App. All the custom logic for Adding, Updating and Deleting categories is just:

```js
export const addCategory = async(args) => 
  await client.post(Object.assign(new AddOrganizationCategory(), args));

export const updateCategory = async(args) => 
  await client.put(Object.assign(new UpdateOrganizationCategory(), args));

export const deleteCategory = async(organizationId, id) => 
  await client.delete(new DeleteOrganizationCategory(), { organizationId, id });
```

Which is just using the DTOs generated with `npm run dtos` with ServiceStack's generic `JsonServiceClient`.

### Extensible AutoQuery Services

We want to make a special call out to the implementation of the `QueryPosts` Services given it's one of the most important Services that powers every Post feed in TechStacks but unlike most [AutoQuery Services](/autoquery-rdbms) which have no implementation, `QueryPosts` uses a custom implementation which in addition to inheriting all queryable functionality of an AutoQuery Service adds high-level functionality for custom `AnyTechnologyIds` and `Is` properties which don't directly map to any column.

The custom implementation below is used to:

 - Prevent returning any `Deleted` Posts
 - Prevent returning any posts with a `closed` status unless the query specifically targets a closed label or status
 - Avoid any table joins by using PostgreSQL advanced Array data type for querying post `string` **labels** or `int` **technology ids**
 - Uses `AnyTechnologyIds` to return any posts in **an Organization linked to** or **tagged with** the specified technologies

```csharp
[Route("/posts", "GET")]
public class QueryPosts : QueryDb<Post>
{
    // Handled by AutoQuery
    public int[] Ids { get; set; }
    public int? OrganizationId { get; set; }
    public int[] OrganizationIds { get; set; }
    public string[] Types { get; set; }

    // Handled by Custom Implementation
    public int[] AnyTechnologyIds { get; set; }
    public string[] Is { get; set; }
}

[CacheResponse(Duration = 600)]
public class PostPublicServices : PostServicesBase
{
    public IAutoQueryDb AutoQuery { get; set; }

    public object Any(QueryPosts request)
    {
        var q = AutoQuery.CreateQuery(request, Request.GetRequestParams());
        q.Where(x => x.Deleted == null);
        
        var states = request.Is ?? TypeConstants.EmptyStringArray;
        if (states.Contains("closed") || states.Contains("completed") || states.Contains("declined"))
            q.And(x => x.Status == "closed");
        else
            q.And(x => x.Hidden == null && (x.Status == null || x.Status != "closed"));

        if (states.Length > 0)
        {
            var labelSlugs = states.Where(x => x != "closed" && x != "open")
                .Map(x => x.GenerateSlug());
            if (labelSlugs.Count > 0)
                q.And($"ARRAY[{new SqlInValues(labelSlugs).ToSqlInString()}] && labels");
        }

        if (!request.AnyTechnologyIds.IsEmpty())
        {
            var techIds = request.AnyTechnologyIds.Join(",");
            var orgIds = request.AnyTechnologyIds.Map(id => GetOrganizationByTechnologyId(Db, id))
                .Where(x => x != null)
                .Select(x => x.Id)
                .Join(",");
            if (string.IsNullOrEmpty(orgIds))
                orgIds = "NULL";

            q.And($"(ARRAY[{techIds}] && technology_ids OR organization_id in ({orgIds}))");
        }

        return AutoQuery.Execute(request, q);
    }
}
```

The custom implementation also caches all `QueryPosts` responses as a result of being defined in a Service annotated with [`[CacheResponse]` attribute](/cacheresponse-attribute).

As it's difficult to invalidate cached search results when individual results change, TechStacks uses the naive approach of invalidating the cache after every write. This strategy yields a less efficient hit cache rate % but ensures no cached responses are stale whilst still providing a _cache shield_ protecting high read pages like post feeds from performing multiple identical queries.

## Background MQ Service

One of the areas we didn't have a good solution for was **running managed background jobs** as the previous InMemory Service MQ was a basic `IMessageService` implementation that executed requests synchronously, which although fulfilling its purpose as infrastructure-free In Memory placeholder until it was replaced by a [proper MQ Server](/messaging), it's not suitable for Queueing Background Tasks (to run in the background) after Services have been executed and their response returned to clients.

That was until now, the new `BackgroundMqService` is a full-featured `IMessageService` implementation that provides the functionality of [distributed MQ Server](/messaging) but doesn't require any infrastructure dependencies. You can queue long-running background tasks by publishing Request DTOs, control execution throughput by creating different sized Thread Pools per message type, inspect the status and statistics of different MQ Workers, stop and restart processing messages, etc. It's a complete implementation implementing the same [MQ Message flow](/messaging#message-workflow) and passes the existing MQ Test suites so you'll be able to substitute it for any of the other MQ Servers. But it still doesn't persist messages across App restarts so we recommend using it in combination with persistence to an external data source - generally a good idea for tracking the status of long-running jobs.

To illustrate an example we'll walkthrough TechStacks implementation of what's likely the most popular use of background job in Web Apps - sending emails... 

### Using Background Service to send Emails

Configuring the `BackgroundMqService` is the same as every other MQ Server, i.e. register it in the IOC and register handlers for the Request DTO of each Service you want to be able to run in the background:

```csharp
container.Register<IMessageService>(c => new BackgroundMqService());
var mqServer = container.Resolve<IMessageService>();

mqServer.RegisterHandler<SendNotification>(ExecuteMessage, 4);
mqServer.RegisterHandler<SendSystemEmail>(ExecuteMessage);

mqServer.Start();

AfterInitCallbacks.Add(host => ExecuteService(new RetryPendingNotifications()));
```

The one difference is that we also register an `AfterInitCallbacks` to Execute the [RetryPendingNotifications](https://github.com/NetCoreApps/TechStacks/blob/c89920d92e1e11a5495bf88a45fea60aea9d199e/src/TechStacks.ServiceInterface/Admin/NotificationServices.cs#L51) Service after the AppHost has started. We'll look at the implementation later, but it's for re-queueing any incomplete Background Jobs that failed to complete.

With the handlers registered, any Service can queue any of these Services to Execute in the background by publishing a populated Request DTO of that Type. One place where TechStacks does this is to notify all subscribers when someone creates a post, which it does by [calling SendNotificationAsync()](https://github.com/NetCoreApps/TechStacks/blob/973eecdc334687e13008aa9f07444e7c6affcfd9/src/TechStacks.ServiceInterface/PostServices.cs#L62):

```csharp
await SendNotificationAsync(nameof(CreatePost), nameof(Post), id);
```

A common API that inserts an entry in the `Notification` table and publishes a `SendNotification` message to have the Service executed in the background by 1 of the 4 MQ Workers configured at Startup:

```csharp
public async Task SendNotificationAsync(string eventName, string refType, long refId)
{
    var notificationId = await Db.InsertAsync(ToNotification(eventName, refType, refId), selectIdentity:true);
    PublishMessage(new SendNotification { Id = notificationId });
}

Notification ToNotification(string eventName, string refType, long refId) => new Notification {
    Event = eventName,
    RefId = refId,
    RefType = refType,
    RefUrn = $"urn:{refType}:{refId}",
    Created = DateTime.Now,
}; 
```

`SendNotification` is a regular ServiceStack Service except we only want it accessible to Admin Users so it's annotated with `[ExcludeMetadata]` to hide it from the public metadata services. 

```csharp
[ExcludeMetadata]
[Route("/notifications/{Id}/send")]
public class SendNotification : IReturnVoid
{
    public long Id { get; set; }
}
```

For the complete reference [NotificationServices.cs](https://github.com/NetCoreApps/TechStacks/blob/master/src/TechStacks.ServiceInterface/Admin/NotificationServices.cs) contains all the background Email Services and bespoke code to send the different Email types whilst [NotificationServices.Utils.cs](https://github.com/NetCoreApps/TechStacks/blob/master/src/TechStacks.ServiceInterface/Admin/NotificationServices.Utils.cs) contains reusable functionality shared by the different email implementations. 

The `SendNotification` Service sends a different Email based on the Notification Event Type which are all executed within the same managed implementation below where it takes care of marking the completion of the notification, either with the time it successfully completed or the Exception the notification it failed with:

```csharp
[RequiredRole("Admin")]
public partial class NotificationServices : Service
{
    private static ILog log = LogManager.GetLogger(typeof(NotificationServices));

    Func<Notification, Task> GetEventHandler(string eventName)
    {
        switch (eventName)
        {
            case nameof(CreatePost):
                return SendNewPostEmail;
            case nameof(UserPostReport):
                return SendReportPostEmail;
            case nameof(UserPostCommentReport):
                return SendReportCommentEmail;
        }
        return null;
    }

    public async Task Any(SendNotification request)
    {
        var notification = AssertNotification(request.Id);

        var eventHandler = GetEventHandler(notification.Event);
        if (eventHandler != null)
        {
            try
            {
                await eventHandler(notification);

                await Db.UpdateOnlyAsync(() => new Notification {
                        Completed = DateTime.Now
                    },
                    where: x => x.Id == notification.Id);
            }
            catch (Exception ex)
            {
                await Db.UpdateOnlyAsync(() => new Notification {
                        Failed = DateTime.Now,
                        Error = ex.Message + Environment.NewLine + ex
                    },
                    where:x => x.Id == notification.Id);
                throw;
            }
        }
        else
        {
            log.Warn($"Received notification of unknown Event Type: {notification.Event}");
        }
    }
}
```

The creation of Email Template is split into different steps to ensure all users are sent the same rendered Email snapshot, even if the task failed midway through and had to be replayed. 

Each template follows the same approach:

 - Work out all users the email should be sent to 
 - Retrieve all data required by the template and inject it into a new [ServiceStack Templates Context](http://templates.servicestack.net/docs/installation) 
 - Use the context to render the specified [email template](https://github.com/NetCoreApps/TechStacks/tree/master/src/TechStacks/emails). 
 
 In this case it renders the [post-new.html](https://github.com/NetCoreApps/TechStacks/blob/master/src/TechStacks/emails/post-new.html) Template inside the [_layout.html](https://github.com/NetCoreApps/TechStacks/blob/master/src/TechStacks/emails/_layout.html) - which is based on the [Email Bootstrap Template](https://github.com/seanpowell/Email-Boilerplate/blob/master/email_commentsremoved.html) and used as the layout for all email templates.

```csharp    
private async Task SendNewPostEmail(Notification notification)
{
    EmailTemplate template = null;

    if (notification.EmailTemplateId == null)
    {
        var post = await AssertPost(notification.RefId);
        var org = await Db.SingleByIdAsync<Organization>(post.OrganizationId);
        var user = await Db.SingleByIdAsync<CustomUserAuth>(post.UserId);

        var q = Db.From<OrganizationSubscription>()
            .Where(x => x.OrganizationId == post.OrganizationId)
            .And("ARRAY[{0}] && post_types", post.Type)
            .Select(x => x.UserId);
        var postTypeSubscriberUserIds = await Db.ColumnAsync<int>(q);

        var context = CreateEmailTemplateContext();
        var templatePath = "emails/post-new";
        var page = context.GetPage(templatePath);
        var result = new PageResult(page) {
            Args = {
                ["baseUrl"] = AppSettings.GetString("PublicBaseUrl"),
                ["post"] = post,
                ["organization"] = org,
            }
        };

        template = await CreateAndSaveEmailTemplate(notification, nameof(SendNewPostEmail), templatePath, 
            toUserIds: postTypeSubscriberUserIds, 
            fromName:  user.DisplayName ?? user.UserName, 
            ccName:    org.Name + " Subscribed", 
            subject:   $"[{post.Type}] {post.Title}", 
            html:      await result.RenderToStringAsync());
    }
    else
    {
        template = await Db.SingleByIdAsync<EmailTemplate>(notification.EmailTemplateId);
    }

    await SendEmailsToRemainingUsers(notification, template);
}
```

The end result of each email is to create an entry in the generic [EmailTemplate](https://github.com/NetCoreApps/TechStacks/blob/master/src/TechStacks.ServiceInterface/DataModel/EmailTemplate.cs) table with the rendered email to send and all users to send it to. It's then handed to the managed `SendEmailsToRemainingUsers` routine to send the emails.

The final step is to send the email to all designated users, which is ultimately done by the [EmailProvider](https://github.com/NetCoreApps/TechStacks/blob/master/src/TechStacks.ServiceInterface/Notifications/EmailProvider.cs) which uses an `SmtpClient` to send the Email to the AWS SES endpoint.

To handle cases where the long-running process can fail at any point, the email template keeps a record of each user that emails were sent to by updating the `emailed_user_ids` PostgreSQL Array after each email is sent. So if the `SendNotification` message is replayed it will start back where it left off and only sends emails to the remaining users.

```csharp
private async Task SendEmailsToRemainingUsers(Notification notification, EmailTemplate template)
{
    var remainingUserIds = notification.UserIds.Where(x => !notification.EmailedUserIds.Contains(x)).ToList();
    if (remainingUserIds.Count > 0)
    {
        var users = await Db.SelectAsync<UserEmailInfo>(Db.From<CustomUserAuth>()
            .Where(x => remainingUserIds.Contains(x.Id)));

        var userMap = users.ToDictionary(x => x.Id);

        foreach (var userId in remainingUserIds)
        {
            var user = userMap[userId];
            if (!string.IsNullOrEmpty(user.Email))
            {
                Email.Send(template.ToEmailMessage(user.Email, user.DisplayName ?? user.UserName));
            }

            await RecordEmailSentToUser(notification.Id, userId);
        }
    }
    else
    {
        SendNotificationEmail(template, $"{notification.UserIds.Length} subscribers");
    }
}

private void SendNotificationEmail(EmailTemplate template, string toName)
{
    var notificationsEmail = AppSettings.GetString("NotificationsFromEmail");
    var email = template.ToEmailMessage(notificationsEmail, toName);
    Email.Send(email);
}

private async Task RecordEmailSentToUser(long notificationId, int userId)
{
    await Db.ExecuteSqlAsync(@"UPDATE notification SET emailed_user_ids = emailed_user_ids || @userId
        WHERE id = @id", new { userId, id = notificationId });
}
```

### Replaying Messages

The `RetryPendingNotifications` Service replays incomplete notifications by publishing new `SendNotification` messages which are executed by the `BackgroundMqService` as normal. 
This also lets you replay failed notifications by setting `Failed` to `null` and recalling the Service. As the state of each task is persisted after each step, it can fail at any point and the replayed task will be able to restart where it left off.

```csharp
public object Any(RetryPendingNotifications request)
{
    var pendingNotificationIds = Db.Column<long>(Db.From<Notification>()
            .Where(x => x.Completed == null && x.Failed == null)
            .Select(x => x.Id))
        .ToArray();

    if (pendingNotificationIds.Length > 0)
    {
        log.Info($"Resending {pendingNotificationIds.Length} pending notifications: {pendingNotificationIds}");

        foreach (var notificationId in pendingNotificationIds)
        {
            PublishMessage(new SendNotification { Id = notificationId });
        }
    }
    
    return new RetryPendingNotificationsResponse {
        ResentIds = pendingNotificationIds
    };
}
```

### MQ Status

The other benefit from persisting the status of each tasks is being able to inspect the `Notification` and `EmailTemplate` table to be able to monitor the progress of each Task. 

We can also call the [IMessageService](https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack.Interfaces/Messaging/IMessageService.cs) APIs to inspect the state of the Background MQ Service. We can use the Service below to make the APIs accessible remotely:

```csharp
[Route("/mq/stop")]  // Stop the Background Service and all MQ Workers from processing more messages
public class MqStop : IReturn<string> {}

[Route("/mq/start")] // Start the Background Service and process any queued messages
public class MqStart : IReturn<string> {}

[Route("/mq/stats")]
public class MqStats : IReturn<string> {}

[Route("/mq/status")]
public class MqStatus : IReturn<string> {}

public class BackgroundAdminServices : Service
{
    public IMessageService MqService { get; set; }
    
    [RequiredRole("Admin")]
    public object Any(MqStart request)
    {
        MqService.Start();
        return "OK";
    }
    
    [RequiredRole("Admin")]
    public object Any(MqStop request)
    {
        MqService.Stop();
        return "OK";
    }

    public object Any(MqStats request) => MqService.GetStats();

    [AddHeader(ContentType = MimeTypes.PlainText)]
    public object Any(MqStatus request) => MqService.GetStatsDescription();
}
```

This lets you can call [/mq/stats](https://www.techstacks.io/mq/stats.json) to view a summary of **all messages processed** since the last time the App was restarted and [/mq/status](https://www.techstacks.io/mq/status) to view **all Queues** the Background Service is currently listening to and the **statistics of each individual MQ worker**. 

Here's a snapshot of what this looks like for TechStacks with 4 threads listening to `SendNotification` messages and 1 thread listening to `SendSystemEmail`:

```
# MQ SERVER STATS:

STATUS: Started

LISTENING ON: 
  mq:SendNotification.inq
  mq:SendNotification.inq
  mq:SendNotification.inq
  mq:SendNotification.inq
  mq:SendSystemEmail.inq

------------------------------

# COLLECTIONS:

------------------------------
INFO SendNotification:

STATS:
  Thread Count:         4
  Total Messages Added: 27
  Total Messages Taken: 0
  Total .outq Messages: 27
  Total .dlq Messages:  0
QUEUES:
  mq:SendNotification.inq:        0 message(s)
  mq:SendNotification.priorityq:  0 message(s)
  mq:SendNotification.dlq:        0 message(s)
  mq:SendNotification.outq:       27 message(s)
------------------------------
INFO SendSystemEmail:

STATS:
  Thread Count:         1
  Total Messages Added: 1
  Total Messages Taken: 0
  Total .outq Messages: 1
  Total .dlq Messages:  0
QUEUES:
  mq:SendSystemEmail.inq:         0 message(s)
  mq:SendSystemEmail.priorityq:   0 message(s)
  mq:SendSystemEmail.dlq:         0 message(s)
  mq:SendSystemEmail.outq:        1 message(s)
------------------------------

# WORKERS:

------------------------------
WORKER 1 on mq:SendNotification.inq 
STATS for SendNotification:

  TotalNormalMessagesReceived:    7
  TotalPriorityMessagesReceived:  0
  TotalProcessed:                 7
  TotalRetries:                   0
  TotalFailed:                    0
  LastMessageProcessed:           4/9/18 7:44:49 PM
------------------------------
WORKER 2 on mq:SendNotification.inq 
STATS for SendNotification:

  TotalNormalMessagesReceived:    7
  TotalPriorityMessagesReceived:  0
  TotalProcessed:                 7
  TotalRetries:                   0
  TotalFailed:                    0
  LastMessageProcessed:           4/9/18 7:49:17 PM
------------------------------
WORKER 3 on mq:SendNotification.inq 
STATS for SendNotification:

  TotalNormalMessagesReceived:    7
  TotalPriorityMessagesReceived:  0
  TotalProcessed:                 7
  TotalRetries:                   0
  TotalFailed:                    0
  LastMessageProcessed:           4/9/18 8:28:59 PM
------------------------------
WORKER 4 on mq:SendNotification.inq 
STATS for SendNotification:

  TotalNormalMessagesReceived:    6
  TotalPriorityMessagesReceived:  0
  TotalProcessed:                 6
  TotalRetries:                   0
  TotalFailed:                    0
  LastMessageProcessed:           4/9/18 7:41:18 PM
------------------------------
WORKER 5 on mq:SendSystemEmail.inq 
STATS for SendSystemEmail:

  TotalNormalMessagesReceived:    1
  TotalPriorityMessagesReceived:  0
  TotalProcessed:                 1
  TotalRetries:                   0
  TotalFailed:                    0
  LastMessageProcessed:           4/9/18 7:44:47 PM
------------------------------
```
