<template>
  <div class="news">
    <v-layout column>
      <v-flex>
          <v-layout>
            <div v-if="isAuthenticated">
              <v-btn v-if="!add" fab dark small color="pink" @click="add=true" title="Submit New Post">
                <v-icon dark>add</v-icon>
              </v-btn>
              <v-btn v-if="add" fab dark small color="pink" @click="add=false" title="Hide">
                <v-icon dark>remove</v-icon>
              </v-btn>
            </div>
            <div v-else>
              <v-btn fab dark small color="grey" title="Sign in to post">
                <v-icon dark>add</v-icon>
              </v-btn>
            </div>

            <h1>
              <span class="parent-organization">
                <nuxt-link :to="routes.homeNews" style="color:#333">news </nuxt-link>
              </span>
            </h1>
            <v-spacer></v-spacer>
            
            <v-btn-toggle v-model="all" style="margin-right:5px">
              <v-btn title="show ALL (ALT+1)">all</v-btn>
            </v-btn-toggle>

            <v-btn-toggle multiple v-if="allPostTypes.length > 0" v-model="filterTypes">
              <v-btn v-for="(postType,index) in allPostTypes" :key="postType.name" :title="`${postType.name} (ALT+${index+2})`">{{ postType.name }}</v-btn>
            </v-btn-toggle>
          </v-layout>
      </v-flex>

      <v-flex v-if="add">
        <v-card class="news-add">
          <v-card-title>
            <v-select ref="postOrg"
              label="Post to where?"
              autocomplete
              :spellcheck="false"
              :items="organizationsSelectItems"
              v-model="organizationSlug"
              ></v-select>

            <v-btn :disabled="!organizationSlug" color="primary" :to="routes.organizationNews(organizationSlug,{add:postType})">
              next
              <v-icon>chevron_right</v-icon>
            </v-btn>
            
          </v-card-title>
        </v-card>
      </v-flex>

      <v-flex v-if="latestNewsPosts.length > 0" style="margin:1em 0">
        <v-layout>

          <PostsList :posts="latestNewsPosts" :page="page" />

          <v-flex class="tech-organizations">
            <v-card>
              <v-card-title>
                <em v-for="org in technologyOrganizations" :key="org.refId" :class="['tag', { highlight: org.refId == technologyId }]">
                  <a @click.prevent="changeTechnology(org.slug)">
                    {{ org.name }}
                  </a>
                </em>
              </v-card-title>
            </v-card>

            <v-card style="margin-top:.5em">
              <v-card-title>
                <v-select ref="jumpOrg"
                  label="Jump to"
                  autocomplete
                  :spellcheck="false"
                  :items="organizationsSelectItems"
                  v-model="jumpToSlug"
                  ></v-select>
                  <v-btn :disabled="!jumpToSlug" color="primary" :to="routes.organizationNews(jumpToSlug)" title="Jump (J)">
                    Go!
                    <v-icon>chevron_right</v-icon>
                  </v-btn>
              </v-card-title>
            </v-card>

            <v-card style="margin-top:.5em">
              <v-card-title>
                <OrganizationAdd v-if="addOrganization" @done="organizationDone" />
                <div v-else style="color:#666">
                  Create your own space to collaborate with others who share similar interests.
                </div>
              </v-card-title>
              <v-card-actions v-if="!addOrganization">
                <v-layout align-center style="text-align:center">
                  <v-flex>
                    <v-btn flat large @click="addOrganization=true" :disabled="!isAuthenticated">Create your own Organization</v-btn>
                  </v-flex>
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-flex>

        </v-layout>

          <v-flex style="margin-top:5px;">
            <v-btn v-if="page > 0" color="primary" @click="loadPage(page-1)" title="View Previous (←)">
              <v-icon>chevron_left</v-icon>
              prev
            </v-btn>
            <v-btn v-if="hasMore" color="primary" @click="loadPage(page+1)" title="View Next (→)">
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
import PostsList from "~/components/PostsList.vue";
import OrganizationAdd from "~/components/OrganizationAdd.vue";

import { mapGetters } from "vuex";
import { appendQueryString } from "@servicestack/client";
import { POSTS_PER_PAGE } from "~/shared/post";
import { ignoreKeyPress } from "~/shared/utils";
import { routes } from "~/shared/routes";

const TechnologySource = 'Technology';

export default {
  components: { PostsList, OrganizationAdd },

  computed: {
    page(){
      return parseInt(this.$route.query.p || 0);
    },
    hasMore() {
      return this.latestNewsPosts.length >= POSTS_PER_PAGE;
    },
    technologyId(){
      const org = this.allOrganizations.find(x => x.slug === this.t && x.refSource === TechnologySource);
      return org && parseInt(org.refId) || null;
    },
    organizationsSelectItems() {
      return this.allOrganizations.map(x => ({ text:x.name, value:x.slug }));
    },
    technologyOrganizations(){
      return this.allOrganizations.filter(x => x.refSource === TechnologySource)
        .sort((a,b) => a.rank - b.rank);
    },
    postType(){
      return this.filterTypes.length === 0 
        ? 'Post'
        : (this.allPostTypes[this.filterTypes[0]] || {}).name || 'Post';
    },
    filterTypeNames() {
      return this.filterTypes.map(i => this.allPostTypes[i].name);
    },
    ...mapGetters(["loading","isAuthenticated","allOrganizations","allPostTypes","latestNewsPosts"])
  },

  methods: {
    async refreshPosts() {
      await this.$store.dispatch({
        type: "latestNewsPosts",
        page: this.page,
        types: this.types,
        technologyIds: [this.technologyId],
      });
    },
    loadPage(p) {
      let qs = Object.assign({}, this.$route.query, { p });
      if (qs.p == 0) delete qs["p"];
      this.$router.push(appendQueryString(this.$route.path, qs));
    },
    initRoute(qs) {
      this.t = qs.t;
      this.types = qs.types;
      const types = (this.types || "").split(",");
      const filterIndexes = types.map(name =>
        this.allPostTypes.findIndex(x => x.name == name)
      ).filter(x => x >= 0);
      this.stageChanges({ filterTypes: filterIndexes, all: filterIndexes.length == 0 ? 0 : null });
    },
    updateUrl(args) {
      let { p, ...qs } = this.$route.query; //strip ?p=
      for (let k in args) {
        qs[k] = args[k];
        if (qs[k] === undefined) delete qs[k];
      }
      this.$router.push(appendQueryString(this.$route.path, qs));
    },
    resetQuery(){
      this.c = undefined;
      this.changeTypes({});
    },
    changeTechnology(orgSlug){
      this.t = orgSlug;
      this.updateUrl({ t:this.t });
    },
    changeTypes(types) {
      if (Object.keys(types).length == 0) {
        this.initRoute({ types: undefined });
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
    organizationDone(createdSlug) {
      if (createdSlug) {
        this.$router.push(`/organizations/${createdSlug}`);
      } else {
        this.addOrganization = false;
      }
    },

    handleKeyUp(e) {
      if (ignoreKeyPress(e)) return;
      const c = String.fromCharCode(e.keyCode).toLowerCase();
      if (c === 'n') {
        this.add = !this.add;
        if (this.add) {
          this.$nextTick(() => this.$refs.postOrg.$refs.input.focus());
        }
      }
      else if (c === 'j') {
        this.$refs.jumpOrg.$refs.input.focus();
      }
      else if (e.altKey) {
        const num = parseInt(c);
        if (num >= 1 && num <= this.allPostTypes.length + 1) {
          this.filterTypes = num === 1 ? [] : [parseInt(c) - 2];
        }
      } else if (e.keyCode == 13) {
        if (this.add && this.organizationSlug) {
          this.$router.push(routes.organizationNews(this.organizationSlug,{add:this.postType}));
        } else if (this.jumpToSlug) {
          this.$router.push(routes.organizationNews(this.jumpToSlug));
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

  },

  watch: {
    all(index) {
      if (this.staging) return;
      this.changeTypes({});
    },
    filterTypes(indexes) {
      if (this.staging) return;
      const types = this.filterTypeNames.filter(x => x).sort().join(',');
      const allTypes = indexes.length === this.allPostTypes.length || indexes.length === 0;
      this.changeTypes(allTypes ? {} : types);
    },
    page(p) {
      this.refreshPosts();
    },
  },

  beforeRouteUpdate(to,from,next){
    this.initRoute(to.query);
    this.refreshPosts();
    next();
  },

  async mounted() {
    this.initRoute(this.$route.query);
    this.refreshPosts();
    this.$store.dispatch("loadUserPostActivity");
    
    window.addEventListener('keyup', this.handleKeyUp);
  },

  destroyed(){
    window.removeEventListener('keyup', this.handleKeyUp);
  },

  data: () => ({
    routes,
    types: null,
    t: null,
    add: false,
    addOrganization: false,
    all: null,
    filterTypes:[],
    staging: null,
    organizationSlug: null,
    jumpToSlug: null,
  }),
}
</script>

<style>
.news-add {
  max-width: 500px;
}
.tech-organizations {
  max-width: 330px;
  margin-left: 1em
}
.tech-organizations .tag, .tech-organizations .tag a {
  font-size: 13px;
  color: #333;
}
.tech-organizations .tag {
  margin: 2px; 
  background: #f1f1f1;
  padding: 2px 6px;
}
.news .organization-add {
 min-width: 300px;
}
</style>
