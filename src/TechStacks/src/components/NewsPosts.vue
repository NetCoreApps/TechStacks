<template>
    <div class="news">
        <h2 v-if="!organization && loading" class="svg-icon loading">Loading {{slug}} News ...</h2>

        <h2 v-if="!organization && !loading"><v-icon color="red">error_outline</v-icon> '{{slug}}' was not found</h2>

        <v-layout column v-else-if="organization">
            <v-flex>
                <v-layout>
                    <div v-if="canPostToOrganization()">
                      <v-btn v-if="!add" fab dark small color="pink" @click="open" title="Submit New Post">
                        <v-icon dark>add</v-icon>
                      </v-btn>
                      <v-btn v-if="add" fab dark small color="pink" @click="close" title="Hide">
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
                        <nuxt-link :to="`/news`" style="color:#333">news </nuxt-link>
                        <em>/</em>
                      </span>
                      
                      <nuxt-link v-if="view == 'category'" :to="`/news/${organization.slug}`" style="color:#333">
                        {{ organization.name }}
                      </nuxt-link>
                      <a v-else @click.prevent="resetQuery()" style="color:#333">
                        {{ organization.name }}
                      </a>
                    </h1>
                    <v-spacer></v-spacer>
                    
                    <span v-if="canManageOrganization()" class="org-manage-info">
                      <nuxt-link :to="`/organizations/${organization.slug}`">manage</nuxt-link>
                    </span>

                    <v-btn-toggle v-model="all" style="margin-right:5px">
                      <v-btn>all</v-btn>
                    </v-btn-toggle>

                    <v-btn-toggle multiple v-if="browsablePostTypes.length > 0" v-model="filterTypes">
                      <v-btn v-for="label in visibleTypeLabels" :key="label">{{ label }}</v-btn>
                    </v-btn-toggle>
                </v-layout>
            </v-flex>

            <v-flex v-if="add">
              <PostEdit :org="organization" :initialTypes="types" :initialCategoryId="categoryId" @done="postDone"></PostEdit>
            </v-flex>

            <v-flex v-if="latestOrganizationPosts.length > 0" style="margin:1em 0">
                <v-layout>
                  <PostsList :posts="latestOrganizationPosts" :page="page" />

                  <v-flex v-if="view != 'category' && organization.categories.length > 1" style="max-width:300px;margin-left:1em">
                    <v-toolbar>
                      <v-toolbar-title>Categories</v-toolbar-title>
                    </v-toolbar>
                    <v-card v-for="category in organization.categories" :key="category.slug" :class="['category', { highlight: c == category.slug }]">
                      <v-card-title style="padding:10px">
                        <a @click.prevent="changeCategory(category)">
                          {{ category.name }}
                        </a>
                      </v-card-title>
                    </v-card>
                  </v-flex>
                </v-layout>

                <v-flex style="margin-top:5px;">
                  <v-btn v-if="page > 0" color="primary" @click="loadPage(page-1)">
                    <v-icon>chevron_left</v-icon>
                    prev
                  </v-btn>
                  <v-btn v-if="hasMore" color="primary" @click="loadPage(page+1)">
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
import DebugInfo from "~/components/DebugInfo.vue";

import { mapGetters } from "vuex";
import { fromNow } from "~/shared/utils";
import { POSTS_PER_PAGE, canManageOrganization, canPostToOrganization } from "~/shared/post";
import { appendQueryString } from "@servicestack/client";

export default {
  components: { PostEdit, PostsList, DebugInfo },
  props: ["slug","query","view"],
  computed: {
    page() {
      return parseInt(this.$route.query.p || 0);
    },
    hasMore() {
      return this.latestOrganizationPosts.length >= POSTS_PER_PAGE;
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
      "latestOrganizationPosts"
    ])
  },

  methods: {
    open() {
      this.add = true;
    },
    close() {
      this.add = false;
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
    loadPage(p) {
      let qs = Object.assign({}, this.$route.query, { p });
      if (qs.p == 0) delete qs["p"];
      this.$router.push(appendQueryString(this.$route.path, qs));
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

    canManageOrganization,
    canPostToOrganization,
    fromNow
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
    this.c = this.$route.query.c;
    this.$store.commit('latestOrganizationPostsQuery', null);
    this.initRoute(this.$route.query);
    await this.$store.dispatch("loadOrganizationBySlugIfNotExists", this.slug);
    this.refreshPosts();
    this.$store.dispatch("loadUserPostActivity");
    this.$store.dispatch("loadTechnologyTiers");
  },

  data: () => ({
    types: null,
    c: null,
    staging: null,
    filterTypes: [],
    all: null,
    add: false,
    reportPostId: null,
  })
};
</script>

<style scoped>
.image-upload IMG {
  max-width: 200px;
  max-height: 200px;
}
.org-manage-info a {
  font-size: 16px;
  line-height: 36px;
  vertical-align: middle;
  margin-right: 20px;
}
</style>
