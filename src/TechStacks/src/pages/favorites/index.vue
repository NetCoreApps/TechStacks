<template>
  <div class="favorites-page no-prerender" style="width:100%">

    <div class="hero">
      <v-parallax :src="heroUrl" >
        <v-layout align-center>

          <v-layout column align-center>
            <v-flex
              fluid
              style="min-height: 0"
              grid-list-lg
            >
              <v-card>
                <v-card-title primary-title>

                  <h2 v-if="!user && loading" class="svg-icon loading">Loading My Feed...</h2>

                  <h2 v-if="!user"><v-icon color="red">error_outline</v-icon> Please Sign In to view your User Feed</h2>

                  <v-container v-else-if="user" fluid>
                    <v-layout column align-center>
                      <v-flex if="user.profileUrl">
                        <div class="avatarbox">
                          <nuxt-link :to="routes.user(user.userName)"><img :src="user.profileUrl"></nuxt-link>
                        </div>
                      </v-flex>
                      <v-flex style="text-align:center">
                        <div class="headline" style="margin-top:.5em">Personalized feeds using my favorite technologies</div>
                        <div style="color:gray;margin-top:.5em">
                            Favorite <nuxt-link :to="routes.homeTech">technologies</nuxt-link> for more results.
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-container>


                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>

        </v-layout>
      </v-parallax>
    </div>

    <v-container v-if="user" class="body" grid-list-md>

      <v-layout row>
        <v-flex xs12>
          <v-tabs v-model="tab">
            <v-tab title="News (ALT+1)">News</v-tab>
            <v-tab title="TechStacks (ALT+2)">TechStacks</v-tab>
            <v-tab title="Favorited (ALT+3)">Favorited Posts</v-tab>
          </v-tabs>
        </v-flex>
      </v-layout>

      <v-layout row wrap>

        <v-flex v-if="tab == 0" xs9>
          <PostsList :posts="latestNewsPosts" :page="page" />

          <v-flex style="margin-top:5px;">
            <v-btn v-if="page > 0" color="primary" :to="getPageUrl(page-1)" title="View Previous (←)">
              <v-icon>chevron_left</v-icon>
              prev
            </v-btn>
            <span class="page-num" v-if="page > 0">{{ page }}</span>
            <v-btn v-if="hasMore" color="primary" :to="getPageUrl(page+1)" title="View Next (→)">
              more
              <v-icon>chevron_right</v-icon>
            </v-btn>
          </v-flex>

        </v-flex>
        
        <v-flex v-if="tab == 1" xs9>
          <v-layout row wrap>
            <v-flex xs12 
              v-for="techstack in sessionFeed"
              :key="techstack.name"
            >
              <nuxt-link :to="routes.stack(techstack.slug)">
                <v-toolbar color="orange" style="width:100%">
                  <v-toolbar-title class="white--text" style="width:100%">
                      <v-layout>
                        <v-flex>
                            {{ techstack.name }}
                        </v-flex>
                        <v-flex style="text-align:right;font-weight:normal;font-size:smaller;margin-right:1em">
                            {{ prettifyUrl(techstack.appUrl) }}
                        </v-flex>
                      </v-layout>
                  </v-toolbar-title>
                </v-toolbar>
              </nuxt-link>
              <v-card class="techstack-card">
                <v-card-title>
                  <v-container fluid grid-list-sm>
                    <v-layout row>
                      <v-flex>
                          {{ techstack.description }}
                      </v-flex>
                    </v-layout>
                    <v-flex>&nbsp;</v-flex>
                    <v-layout wrap>
                      <v-flex v-for="tech in techstack.technologyChoices" :key="tech.name" xs3>
                        <nuxt-link :to="routes.tech(tech.slug)"><img :src="tech.logoUrl" height="48"></nuxt-link>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-title>
                <v-card-actions class="white">
                  <v-spacer></v-spacer>
                  <v-btn flat :to="routes.stack(techstack.slug)">view</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex v-if="tab == 2" xs9>
          
          <PostsList :posts="favoritedPosts" :page="page" />          

          <v-flex v-if="favoritedPosts.length > POSTS_PER_PAGE" style="margin-top:5px;">
            <v-btn v-if="page > 0" color="primary" :to="getPageUrl(page-1)" title="View Previous (←)">
              <v-icon>chevron_left</v-icon>
              prev
            </v-btn>
            <span class="page-num" v-if="page > 0">{{ page }}</span>
            <v-btn v-if="hasMore" color="primary" :to="getPageUrl(page+1)" title="View Next (→)">
              more
              <v-icon>chevron_right</v-icon>
            </v-btn>
          </v-flex>

          <div style="text-align:center;color:#666;margin-top:1em">
            posts you've favorited will appear here.
          </div>
        </v-flex>

        <v-flex xs3>
          <v-layout column>

            <v-flex class="favorite-techs">
              <nuxt-link :to="routes.homeTech">
                <v-toolbar color="pink">
                    <v-toolbar-title class="white--text">Favorite Technologies</v-toolbar-title>
                </v-toolbar>
              </nuxt-link>
              <v-card>
                <v-card-title>
                  <v-container fill-height fluid>
                    <v-layout row>
                      <v-flex>
                        <v-flex v-for="tech in favoriteTechnologies" :key="tech.name">
                          <v-btn icon style="margin:0 .5em 0 0" @click="removeFavorite('tech',tech.id)"><v-icon color="pink">favorite</v-icon></v-btn>
                          <nuxt-link :to="routes.tech(tech.slug)">{{ tech.name }}</nuxt-link>
                        </v-flex>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-title>
                <v-card-actions>
                  <v-flex d-flex>
                      <v-btn flat :to="routes.newTech">Add Technology</v-btn>
                  </v-flex>
                </v-card-actions>
              </v-card>
            </v-flex>

            <v-flex class="favorite-stacks">
              <nuxt-link :to="routes.homeStacks">
                <v-toolbar color="pink">
                  <v-toolbar-title class="white--text">Favorite TechStacks</v-toolbar-title>
                </v-toolbar>
              </nuxt-link>
              <v-card>
                <v-card-title>
                  <v-container fill-height fluid>
                    <v-layout row>
                      <v-flex>
                        <v-flex v-for="techstack in favoriteTechStacks" :key="techstack.name">
                          <v-btn icon style="margin:0 .5em 0 0" @click="removeFavorite('stack',techstack.id)"><v-icon color="pink">favorite</v-icon></v-btn>
                          <nuxt-link :to="routes.stack(techstack.slug)">{{ techstack.name }}</nuxt-link>
                        </v-flex>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-title>
                <v-card-actions>
                  <v-flex d-flex>
                      <v-btn flat :to="routes.newStack">Add TechStack</v-btn>
                  </v-flex>
                </v-card-actions>
              </v-card>
            </v-flex>

          </v-layout>
        </v-flex>
      
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import PostsList from "~/components/PostsList.vue";

import { mapGetters } from "vuex";
import { heroes } from "@servicestack/images";
import { appendQueryString } from "@servicestack/client";

import { routes } from "~/shared/routes";
import { queryPosts } from "~/shared/gateway";
import { ignoreKeyPress, prettifyUrl } from "~/shared/utils";
import { POSTS_PER_PAGE } from "~/shared/post";

export default {
  components: { PostsList },
  computed: {
    heroUrl() {
      return heroes.static(this.user && this.user.userName, 10);
    },
    hasMore() {
      return this.latestNewsPosts.length >= POSTS_PER_PAGE;
    },
    ...mapGetters([
      "loading",
      "isAuthenticated",
      "user",
      "sessionFeed",
      "favoriteTechnologies",
      "favoriteTechStacks",
      "latestNewsPosts",
      "userPostActivity"
    ])
  },

  methods: {
    async refreshPosts() {
      await this.$store.dispatch({
        type: "latestNewsPosts",
        page: this.page,
        technologyIds: this.favoriteTechnologies.map(x => x.id),
      });
    },
    getPageUrl(p){
      let qs = Object.assign({}, this.$route.query, { p });
      if (qs.p == 0) delete qs["p"];
      return appendQueryString(this.$route.path, qs);
    },
    loadPage(p) {
      this.$router.push(this.getPageUrl(p));
    },
    initRoute(qs) {
      this.stageChanges({ 
        tab: parseInt(qs.t) || 0, 
        page: parseInt(qs.p) || 0 
      });
    },
    stageChanges(changes) {
      this.staging = changes;
      for (let key in changes) {
        this[key] = changes[key];
      }
      this.$nextTick(() => (this.staging = null));
    },
    removeFavorite(type, id) {
      this.$store.dispatch('removeFavorite', { type, id });
    },

    handleKeyUp(e) {
      if (ignoreKeyPress(e)) return;
      const c = String.fromCharCode(e.keyCode).toLowerCase();
      if (e.altKey) {
        const num = parseInt(c);
        if (num >= 1 && num <= 3) {
          this.tab = num - 1;
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

    prettifyUrl,
  },

  watch: {
    tab(to,from) {
      if (this.staging) return;
      this.$router.push(this.$route.path + (to > 0 ? `?t=${to}` : ''));
    }
  },

  beforeRouteUpdate(to,from,next){
    this.initRoute(to.query);
    if (this.tab == 0) {
      this.refreshPosts();
    }
    next();
  },

  async mounted() {
    this.initRoute(this.$route.query);
    this.refreshPosts();
    this.$store.dispatch("loadUserFeed");
    await this.$store.dispatch("loadUserPostActivity");
    const ids = this.userPostActivity.favorited;
    if (ids.length > 0) {
      this.favoritedPosts = (await queryPosts({ ids, orderBy:'rank' })).results;
    }

    window.addEventListener('keyup', this.handleKeyUp);
  },

  destroyed(){
    window.removeEventListener('keyup', this.handleKeyUp);
  },

  data: () => ({
    routes,
    tab: 0,
    page: 0,
    favoritedPosts: [],
    POSTS_PER_PAGE
  })
};
</script>

<style>
.favorite-techs, .favorite-stacks {
  font-size: 20px;
}
</style>
