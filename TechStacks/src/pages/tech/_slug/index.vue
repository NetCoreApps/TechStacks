<template>
  <div class="tech-page" style="width:100%">

    <div class="hero">
      <v-parallax :src="heroUrl">
        <v-layout align-center>

          <v-layout column align-center @click="handleCtrlClick">
            <v-flex
              fluid
              style="min-height: 0"
              grid-list-lg
            >
              <v-card>
                <v-card-title primary-title style="justify-content:center;min-height:220px;min-width:800px">

                  <h2 v-if="!technology && loading" class="svg-icon loading">Loading Technology {{slug}} ...</h2>

                  <div v-if="notFound" class="no-prerender">
                    <h2><v-icon color="red">error_outline</v-icon> Technology '{{slug}}' was not found</h2>
                    <v-btn large :to="routes.newTech">Add Technology</v-btn>
                  </div>

                  <v-layout v-else-if="technology" class="no-prerender">
                    <v-flex>
                      <h1>{{technology.name}}</h1>
                      <div class="subheading">
                          <a :href="technology.productUrl">{{ technology.productUrl }}</a>
                          <span>by {{ technology.vendorName }}</span>
                      </div>
                      <div v-if="technology" class="description">{{ technology.description }}</div>
                    </v-flex>
                    <v-flex if="technology.productUrl && technology.logoUrl" style="text-align:center">
                      <a :href="technology.productUrl">
                        <img :src="technology.logoUrl" style="max-width:400px;max-height:300px">
                      </a>
                    </v-flex>
                  </v-layout>
                </v-card-title>

                <v-card-actions v-if="technology" style="min-height:52px">
                  <v-flex xs11 class="viewcounts">
                    <div v-if="pageStats && pageStats.viewCount > 1">
                      <span>
                        <v-btn v-if="!hasFavorited" icon @click="addFavorite()" :title="!isAuthenticated ? 'Sign In to add to favorites' : 'add to favorites'">
                          <v-icon>favorite_border</v-icon>
                        </v-btn>
                        <v-btn v-if="hasFavorited" icon @click="removeFavorite()" title="remove from favorites"><v-icon color="pink">favorite</v-icon></v-btn>
                        <b v-if="pageStats.favCount > 0">{{ pageStats.favCount }}</b> /
                      </span>
                      <span><b>{{ pageStats.viewCount }}</b> views</span>
                    </div>
                  </v-flex>
                  <v-flex xs1>
                    <v-btn v-if="canChange" color="pink" dark absolute bottom center fab large
                      :to="routes.editTech(technology.slug)"
                      :title="`Edit ${technology.name}`">
                      <v-icon>edit</v-icon>
                    </v-btn>
                  </v-flex>
                  <v-flex xs12 style="text-align:right;margin-right:1em;color:gray;font-size:smaller;vertical-align:middle">
                    <span>added by <nuxt-link :to="routes.user(technology.ownerId)">{{ technology.ownerId }}</nuxt-link></span>
                  </v-flex>
                </v-card-actions>

              </v-card>
            </v-flex>
          </v-layout>

        </v-layout>
      </v-parallax>
    </div>

    <v-container v-if="technology" class="techstacks body" grid-list-md>
      <v-layout class="body" fluid column>

        <TechnologyPost type="Announcement" :technology="technology" @organizationCreated="loadTechnology" />

        <v-flex xs12 sm12>
          <v-card>
            <v-container fluid grid-list-md>
              <v-layout row wrap>
                <v-flex xs3 v-for="techstack in technology.technologyStacks" :key="techstack.id" v-if="techstack.screenshotUrl">
                  <v-card flat tile :to="routes.stack(techstack.slug)">
                    <v-card-media
                      :src="techstack.screenshotUrl"
                      height="270px"
                    >
                    </v-card-media>
                    <div class="tile-url">{{ prettifyUrl(techstack.appUrl) }}</div>
                  </v-card>
                </v-flex>
                <v-flex v-if="!technology.technologyStacks.length">
                  <v-card flat tile style="text-align:center">
                    <v-card-title>
                      <v-flex>
                        <div class="headline">There are currently no TechStacks using {{ technology.name }}</div>
                        <nuxt-link v-if="technology.organizationId" :to="routes.newsTech(technology.slug)"
                          style="display:block;margin-top:.5em;text-transform:lowercase">
                          latest {{ technology.name }} news
                        </nuxt-link>
                      </v-flex>
                    </v-card-title>
                    <v-card-actions>
                      <v-flex>
                        <v-btn :disabled="!isAuthenticated" :to="routes.newStack" large primary>Add TechStack</v-btn>
                      </v-flex>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>

      <TechnologyComments ref="techComments" :technology="technology" @organizationCreated="loadTechnology" />
    </v-container>


  </div>
</template>

<script>
import TechnologyPost from "~/components/TechnologyPost.vue";
import TechnologyComments from "~/components/TechnologyComments.vue";

import { mapGetters } from 'vuex';
import { heroes } from "@servicestack/images";
import { ignoreKeyPress, prettifyUrl } from "~/shared/utils";
import { routes } from "~/shared/routes";

export default {
  components: { TechnologyPost, TechnologyComments },
  computed: {
    slug() {
      return this.$route.params.slug;
    },
    heroUrl() {
      return heroes.static(this.slug);
    },
    technology(){
      return this.slug && this.getTechnology(this.slug);
    },
    canChange(){
      return this.technology && this.canChangeTechnology(this.technology);
    },
    hasFavorited(){
      return this.slug && this.isFavoriteTechnology(this.slug);
    },
    pageStats(){
      return this.slug && this.getPageStats("tech", this.slug);
    },
    ...mapGetters(['loading','canChangeTechnology','getTechnology','getPageStats','isFavoriteTechnology','isAuthenticated','getOrganizationSlug'])
  },

  methods: {
    async loadTechnology(){
      await this.$store.dispatch("loadTechnology", this.slug);
    },
    refreshPageStats() {
      this.$store.dispatch("getPageStats", { type: "tech", slug: this.slug, id:this.technology && this.technology.id });
    },
    async addFavorite() {
      if (!this.isAuthenticated) return;
      await this.$store.dispatch('addFavorite', { type:'tech', id:this.technology.id });
      this.refreshPageStats();
    },
    async removeFavorite() {
      if (!this.isAuthenticated) return;
      await this.$store.dispatch('removeFavorite', { type:'tech', id:this.technology.id });
      this.refreshPageStats();
    },

    handleCtrlClick(e) {
      if (e.ctrlKey && this.canChange) {
        this.$router.push(routes.editTech(this.technology.slug));
      }
    },

    handleKeyUp(e) {
      if (!this.isAuthenticated || ignoreKeyPress(e)) return;
      const c = String.fromCharCode(e.keyCode).toLowerCase();
      if (c === 'e') {
        this.$router.push(routes.editTech(this.technology.slug));
      }
      else if (c === 'f') {
        if (!this.hasFavorited) {
          this.addFavorite();
        } else {
          this.removeFavorite();
        }
      } else if (c === 'c') {
        const $txtComments = this.$refs.techComments.$refs.txtComments;
        $txtComments.$refs.editor.$refs.txt.focus();
        $txtComments.$el.scrollIntoView();
      }
    },

    prettifyUrl,
  },

  async mounted() {
    await this.$store.dispatch('loadTechnologyIfNotExists', this.slug);
    this.notFound = this.technology == null;
    this.refreshPageStats();

    window.addEventListener('keyup', this.handleKeyUp);
  },

  destroyed(){
    window.removeEventListener('keyup', this.handleKeyUp);
  },

  data: () => ({
    routes,
    notFound: false,
  })
};
</script>

<style scoped>
.subheading {
  line-height: 2em;
}
.subheading span {
  color: gray;
  padding-left: .5em;
}
</style>
