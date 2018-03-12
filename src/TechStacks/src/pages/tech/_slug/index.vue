<template>
  <div style="width:100%">

    <div class="hero">
      <v-parallax :src="heroUrl" >
        <v-layout align-center>

          <v-layout column align-center>
            <v-flex
              fluid
              style="min-height: 0"
              grid-list-lg
            >
              <v-card style="max-width:1200px">
                <v-card-title primary-title style="justify-content:center;min-height:220px;min-width:800px">

                  <h2 v-if="!technology && loading" class="svg-icon loading">Loading Technology {{slug}} ...</h2>

                  <h2 v-if="!technology && !loading"><v-icon color="red">error_outline</v-icon> Technology '{{slug}}' was not found</h2>

                  <v-layout v-else-if="technology">
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
                    <span>added by <nuxt-link :to="routes.user(technology.createdBy)">{{ technology.createdBy }}</nuxt-link></span>
                  </v-flex>
                </v-card-actions>

              </v-card>
            </v-flex>
          </v-layout>

        </v-layout>
      </v-parallax>
    </div>

    <v-container v-if="technology" class="body" grid-list-md>
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

      <TechnologyComments :technology="technology" @organizationCreated="loadTechnology" />
    </v-container>


  </div>
</template>

<script>
import TechnologyPost from "~/components/TechnologyPost.vue";
import TechnologyComments from "~/components/TechnologyComments.vue";

import { mapGetters } from 'vuex';
import { heroes } from "@servicestack/images";
import { log, prettifyUrl } from "~/shared/utils";
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
      return this.getTechnology(this.slug);
    },
    canChange(){
      return this.canChangeTechnology(this.technology);
    },
    hasFavorited(){
      return this.isFavoriteTechnology(this.slug);
    },
    pageStats(){
      return this.getPageStats("tech", this.slug);
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
    prettifyUrl,
  },

  async mounted() {
    await this.loadTechnology();
    this.refreshPageStats();
  },

  data: () => ({
    routes,
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
