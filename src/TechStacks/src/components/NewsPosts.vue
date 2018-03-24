<template>
    <div class="news">
        <h2 v-if="!organization && loading" class="svg-icon loading">Loading {{slug}} News ...</h2>

        <div v-if="notFound" class="no-prerender">
          <h2><v-icon color="red">error_outline</v-icon> '{{slug}}' organization does not exist</h2>

          <v-layout style="margin-top:.5em;max-width:650px">
            <v-card>
              <v-card-title>
                <OrganizationAdd v-if="addOrganization" @done="organizationDone" :initialValues="{ slug, name:slugToName(slug) }" />
                <div v-else style="color:#666">
                  Create the <b>{{ slug }}</b> organization to create a space with others sharing similar interests.
                </div>
              </v-card-title>
              <v-card-actions v-if="!addOrganization">
                <v-layout align-center style="text-align:center">
                  <v-flex>
                    <v-btn flat large @click="addOrganization=true" :disabled="!isAuthenticated">
                      Create and Moderate {{ slug }}
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-layout>
        </div>

        <v-layout column v-else-if="organization" class="no-prerender" wrap>
            <v-flex>
                <v-layout id="news-nav" wrap>
                  <v-flex class="org-title" style="flex-grow:1">
                    <v-layout>
                      <div v-if="canPostToOrganization()">
                        <v-btn v-if="!add" fab dark small color="pink" @click="open" title="Submit New Post (N)">
                          <v-icon dark>add</v-icon>
                        </v-btn>
                        <v-btn v-if="add" fab dark small color="pink" @click="close" title="Hide (N)">
                          <v-icon dark>remove</v-icon>
                        </v-btn>
                      </div>
                      <div v-else>
                        <v-btn fab dark small color="grey" title="You are not permitted to submit posts">
                          <v-icon dark>add</v-icon>
                        </v-btn>
                      </div>

                      <h1>
                        <span class="parent-organization">
                          <nuxt-link :to="routes.homeNews" style="color:#333">news </nuxt-link>
                          <em>/</em>
                        </span>
                        
                        <nuxt-link v-if="view == 'category'" :to="routes.organizationNews(organization.slug)" style="color:#333">
                          {{ organization.name }}
                        </nuxt-link>
                        <a v-else @click.prevent="resetQuery()" style="color:#333">
                          {{ organization.name }}
                        </a>
                      </h1>
                    </v-layout>
                  </v-flex>
                  <v-spacer></v-spacer>

                  <v-flex class="org-links" style="flex-grow:0">
                    <span>
                      <v-btn class="btn-manage" v-if="canManageOrganization()" outline color="primary" :to="routes.organization(organization.slug)" title="Manage Organization (M)">
                        <span>{{ `Manage${organization.name.length &lt;= 20 ? ' ' + organization.name :''}` }}</span><b></b>
                      </v-btn>
                      <v-btn class="btn-tech" v-if="organization.refSource == 'Technology'" outline color="primary" :to="routes.tech(getTechnologySlug(organization.refId))">
                        <span>{{ organization.name.length &lt;= 20 ? 'TechStacks using  ' + organization.name : organization.name + ' TechStack' }}</span><b></b>
                      </v-btn>
                      <v-btn class="btn-stack" v-if="organization.refSource == 'TechnologyStack'" outline color="primary" :to="routes.stack(organization.slug)">
                        <span>{{ organization.name }}'s TechStack</span><b></b>
                      </v-btn>
                    </span>
                  </v-flex>

                  <v-flex class="org-types" style="flex-grow:0">
                    <v-layout>
                      <v-btn-toggle v-model="all" style="margin-right:5px">
                        <v-btn title="show ALL (ALT+1)">all</v-btn>
                      </v-btn-toggle>

                      <v-btn-toggle multiple v-if="browsablePostTypes.length > 0" v-model="filterTypes">
                        <v-btn v-for="(label,index) in visibleTypeLabels" :key="label" :title="`${label} (ALT+${index+2})`">{{ label }}</v-btn>
                      </v-btn-toggle>
                    </v-layout>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex v-if="add">
              <PostEdit ref="newPost" :org="organization" :initialTypes="types" :initialCategoryId="categoryId" @done="postDone"></PostEdit>
            </v-flex>

            <v-flex v-if="latestOrganizationPosts && latestOrganizationPosts.length > 0" style="margin:1em 0">
                <v-layout>
                  <PostsList :posts="latestOrganizationPosts" :page="page" />

                  <v-flex style="max-width:300px;margin-left:1em">

                    <MembersInfo :organization="organization" @done="memberDone" />

                    <div v-if="view != 'category' && organization.categories.length > 1">
                      <v-toolbar>
                        <v-toolbar-title>Categories</v-toolbar-title>
                      </v-toolbar>
                      <v-card v-for="category in organization.categories" :key="category.slug" :class="['category', { highlight: c == category.slug }]">
                        <v-card-title style="padding:10px">
                          <a :href="`/${slug}?c=${category.slug}`" @click.prevent="changeCategory(category)">
                            {{ category.name }}
                          </a>
                        </v-card-title>
                      </v-card>
                    </div>
                  </v-flex>
                </v-layout>

                <v-flex style="margin-top:5px;">
                  <v-btn v-if="page > 0" color="primary" :to="getPageUrl(page-1)" title="View Previous (←)">
                    <v-icon>chevron_left</v-icon>
                    prev
                  </v-btn>
                  <v-btn v-if="hasMore" color="primary" :to="getPageUrl(page+1)" title="View Next (→)">
                    more
                    <v-icon>chevron_right</v-icon>
                  </v-btn>
                </v-flex>
            </v-flex>
            <v-flex v-else-if="!loading">
              <v-alert color="info" outline :value="true" style="margin-top:1em">
                No Results matched your Query
              </v-alert>
            </v-flex>
        </v-layout>

    </div>
</template>

<script>
import PostEdit from "~/components/PostEdit.vue";
import PostsList from "~/components/PostsList.vue";
import MembersInfo from "~/components/MembersInfo.vue";
import OrganizationAdd from "~/components/OrganizationAdd.vue";
import DebugInfo from "~/components/DebugInfo.vue";

import { mapGetters } from "vuex";
import { routes } from "~/shared/routes";
import { ignoreKeyPress, fromNow, slugToName } from "~/shared/utils";
import { POSTS_PER_PAGE, canManageOrganization, canPostToOrganization } from "~/shared/post";
import { appendQueryString } from "@servicestack/client";
import nuxtErrorVue from '../../.nuxt/components/nuxt-error.vue';
import nuxtLoadingVue from '../../.nuxt/components/nuxt-loading.vue';

export default {
  components: { PostEdit, PostsList, MembersInfo, OrganizationAdd, DebugInfo },
  props: ["slug","query","view"],
  computed: {
    page() {
      return parseInt(this.$route.query.p || 0);
    },
    hasMore() {
      return (this.latestOrganizationPosts || []).length >= POSTS_PER_PAGE;
    },
    categoryId() {
      const category = this.organization && this.organization.categories.filter(x => x.slug == this.c)[0];
      return category && category.id;
    },
    filterTypeNames() {
      return this.filterTypes.map(i => this.browsablePostTypes[i]);
    },
    visibleTypeLabels() {
      const typeLabels = this.browsablePostTypes.map(
        x => this.postTypeLabelsMap[x]
      );
      return typeLabels;
    },
    ...mapGetters([
      "loading",
      "isAuthenticated",
      "organization",
      "browsablePostTypes",
      "postTypeLabelsMap",
      "latestOrganizationPosts",
      "getTechnologySlug",
      "getTechStackSlug"
    ])
  },

  methods: {
    open() {
      this.add = true;
    },
    close() {
      this.add = false;
    },
    async memberDone(){
      this.$store.dispatch('loadUserOrganizations');
      this.$store.dispatch('loadOrganizationById', this.organization.id);
    },
    async postDone() {
      this.add = false;
      this.$store.commit('latestOrganizationPostsQuery', null);
      await this.refreshPosts();
      this.$router.push(`${this.$route.path}` + (this.types ? `?types=${this.types}` : ''));
    },
    async refreshPosts() {
      await this.$store.dispatch({
        type: "latestOrganizationPosts",
        types: this.types,
        page: this.page,
        categoryId: this.categoryId
      });
    },
    getPageUrl(p) {
      let qs = Object.assign({}, this.$route.query, { p });
      if (qs.p == 0) delete qs["p"];
      return appendQueryString(this.$route.path, qs);
    },
    loadPage(p) {
      this.$router.push(this.getPageUrl(p));
    },
    initRoute(qs) {
      this.c = qs.c;
      this.p = qs.p;
      this.add = !!qs.add;
      this.types = qs.add || qs.types;
      const types = (this.types || "").split(",");
      const filterIndexes = types.map(name =>
        this.browsablePostTypes.findIndex(x => x == name)
      ).filter(x => x >= 0);
      this.stageChanges({ filterTypes: filterIndexes, all: filterIndexes.length == 0 ? 0 : null });
    },
    updateUrl(args) {
      let { p, add, ...qs } = this.$route.query; //strip ?p=&add=
      for (let k in args) {
        qs[k] = args[k];
        if (qs[k] === undefined) delete qs[k];
      }

      this.$router.push(appendQueryString(this.$route.path, qs));
      this.refreshPosts();
    },
    resetQuery(){
      this.c = undefined;
      this.changeTypes({});
    },
    changeCategory(cateogry) {
      this.c = this.c != cateogry.slug 
        ? cateogry.slug
        : undefined;
      this.updateUrl({ c:this.c });
    },
    changeTypes(types) {
      if (Object.keys(types).length == 0) {
        this.initRoute({ types:null });
        this.stageChanges({ all: 0, filterTypes: [] });
        this.updateUrl({ types: undefined, c:this.c });
      } else {
        this.stageChanges({ all: null });
        if (types !== this.$route.query.types) {
          this.initRoute({ types });
          this.updateUrl({ types, c:this.c });
        }
      }
    },
    stageChanges(changes) {
      this.staging = changes;
      for (let key in changes) {
        this[key] = changes[key];
      }
      this.$nextTick(() => (this.staging = null));
    },
    organizationDone(orgSlug) {
      this.addOrganization = false;
      if (orgSlug) {
        this.$router.push(routes.organization(orgSlug));
      }
    },

    handleKeyUp(e) {
      if (ignoreKeyPress(e)) return;
      const c = String.fromCharCode(e.keyCode).toLowerCase();
      if (c === 'n') {
        this.add = !this.add;
        if (this.add) {
          this.$nextTick(() => this.$refs.newPost.$refs.title.focus());
        }
      }
      else if (c === 'm') {
        if (this.canManageOrganization()) {
          this.$router.push(routes.organization(this.organization.slug))
        }
      }
      else if (e.altKey) {
        const num = parseInt(c);
        if (num >= 1 && num <= this.browsablePostTypes.length + 1) {
          this.filterTypes = num === 1 ? [] : [parseInt(c) - 2];
        }
      } else if (e.key == "ArrowLeft" || e.keyCode == 37) {
        if (this.page > 0) {
          this.loadPage(this.page-1);
        }
      } else if (e.key == "ArrowRight" || e.keyCode == 39) {
        if (this.hasMore) {
          this.loadPage(this.page+1);
        }
      }
    },

    canManageOrganization,
    canPostToOrganization,
    slugToName,
    fromNow,
  },

  watch: {
    all(index) {
      if (this.staging) return;
      this.changeTypes({});
    },
    filterTypes(indexes) {
      if (this.staging) return;
      const types = this.filterTypeNames.filter(x => x).sort().join(',');
      const allTypes = indexes.length === this.browsablePostTypes.length || indexes.length === 0;
      this.changeTypes(allTypes ? {} : types);
    },
    page(p) {
      this.refreshPosts();
    },
    query(qs) {
      this.initRoute(qs);
      this.refreshPosts();
    }
  },

  async mounted() {
    try {
      this.c = this.$route.query.c;
      this.$store.commit('latestOrganizationPostsQuery', null);
      this.initRoute(this.$route.query);
      await this.$store.dispatch("loadOrganizationBySlugIfNotExists", this.slug);
      await this.refreshPosts();
      this.$store.dispatch("loadUserPostActivity");
      this.$store.dispatch("loadTechnologyTiers");
    } catch(e) {
      console.log(e);
    }

    const notFound = this.organization == null && (this.latestOrganizationPosts || []).length == 0;
    if (notFound) {
      try {
        await Promise.all([
          this.$store.dispatch('loadTechnologyIfNotExists', this.slug),
          this.$store.dispatch('loadTechnologyStackIfNotExists', this.slug)
        ]);
      } catch(e) {}

      const tech = this.$store.getters.getTechnology(this.slug);
      if (tech != null) {
        this.$router.push(routes.tech(this.slug));
        return;
      }

      const stack = this.$store.getters.getTechnologyStack(this.slug);
      if (stack != null) {
        this.$router.push(routes.stack(this.slug));
        return;
      }      
      this.notFound = true;
    }
    
    window.addEventListener('keyup', this.handleKeyUp);
  },

  destroyed(){
    window.removeEventListener('keyup', this.handleKeyUp);
  },

  data: () => ({
    routes,
    types: null,
    c: null,
    staging: null,
    filterTypes: [],
    all: null,
    add: false,
    reportPostId: null,
    notFound: false,
    addOrganization: false,
  })
};
</script>

<style scoped>
.image-upload IMG {
  max-width: 200px;
  max-height: 200px;
}
.org-links {
  text-align: right;
}
.org-links a.btn {
  margin-top: 1px;
}
.org-links a.btn:last-child {
  margin-right: 15px;
}
</style>
