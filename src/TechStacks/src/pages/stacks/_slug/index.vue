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
                <v-card-title primary-title style="justify-content:center;min-height:300px;min-width:800px">

                  <h2 v-if="!techstack && loading" class="svg-icon loading">Loading Technology Stack {{slug}} ...</h2>

                  <h2 v-if="!techstack && !loading"><v-icon color="red">error_outline</v-icon> Technology Stack '{{slug}}' was not found</h2>

                  <v-layout v-else-if="techstack">
                    <v-flex>
                      <h1>{{techstack.name}}</h1>
                      <div v-if="techstack.vendorName != techstack.name" class="vendor">{{ techstack.vendorName }}</div>
                      <div v-if="techstack" class="description">{{ techstack.description }}</div>          
                    </v-flex>
                    <v-flex v-if="techstack.screenshotUrl && techstack.appUrl" style="text-align:center">
                      <a :href="techstack.appUrl">
                        <img :src="techstack.screenshotUrl" style="max-width:400px;max-height:300px">
                        <div>{{ techstack.appUrl }}</div>
                      </a>
                    </v-flex>
                  </v-layout>

                </v-card-title>

                <v-card-actions v-if="techstack" style="min-height:52px">
                  <v-flex xs11 class="viewcounts">
                    <div v-if="pageStats && pageStats.viewCount > 1">
                      <span>
                        <v-btn v-if="!hasFavorited" icon @click="addFavorite()" :title="!isAuthenticated ? 'Sign In to add to favorites' : 'add to favorites (F)'">
                          <v-icon>favorite_border</v-icon>
                        </v-btn>  
                        <v-btn v-if="hasFavorited" icon @click="removeFavorite()" title="remove from favorites (F)"><v-icon color="pink">favorite</v-icon></v-btn>  
                        <b v-if="pageStats.favCount > 0">{{ pageStats.favCount }}</b> /
                      </span>
                      <span><b>{{ pageStats.viewCount }}</b> views</span>
                    </div>
                  </v-flex>
                  <v-flex xs1>
                    <v-btn v-if="canChange" color="pink" dark absolute bottom center fab large
                      :to="routes.editStack(techstack.slug)"
                      :title="`Edit ${techstack.name} (E)`">
                      <v-icon>edit</v-icon>
                    </v-btn>
                  </v-flex>
                  <v-flex xs12 style="text-align:right;margin-right:1em;color:gray;font-size:smaller;vertical-align:middle">
                    <span v-if="techstack.lastModifiedBy && techstack.lastModifiedBy != techstack.createdBy">
                      updated {{ dateFmt(new Date(techstack.lastModified)) }} by <nuxt-link :to="routes.user(techstack.lastModifiedBy)">{{ techstack.lastModifiedBy }}</nuxt-link>
                    </span>
                    <span>
                      added by <nuxt-link :to="routes.user(techstack.createdBy)">{{ techstack.createdBy }}</nuxt-link>
                    </span>
                  </v-flex>
                </v-card-actions>

              </v-card>
            </v-flex>
          </v-layout>

        </v-layout>
      </v-parallax>
    </div>

    <v-container v-if="techstack" class="body" grid-list-md>
      <v-layout row wrap>
        <v-flex>
          <TechnologyPost type="Announcement" :techstack="techstack" @organizationCreated="loadTechStack" style="margin-bottom:1em" />

              <v-toolbar>
                <v-toolbar-title>Technologies used by {{ techstack.name }}</v-toolbar-title>
              </v-toolbar>

              <v-card>

                <v-layout class="tech-info" v-for="tier in stackTiers" :key="tier.name">
                  <v-flex>
                      
                      <v-flex>
                        <h2>{{tier.title}}</h2>
                      </v-flex>

                      <v-container fluid grid-list-sm>
                        <v-layout row wrap align-center>

                          <v-flex v-for="tech in tier.techChoices" :key="tech.id" style="max-width:300px">
                            <nuxt-link :to="routes.tech(tech.slug)" :title="tech.name">
                              <img v-if="tech.logoApproved" :src="tech.logoUrl" style="max-width:300px;max-height:80px;padding:0 1em 0 .5em" />
                            </nuxt-link>
                          </v-flex>
                        </v-layout>
                      </v-container>
                  </v-flex>
                </v-layout>

              </v-card>

        </v-flex>
      </v-layout>
    </v-container>

    <section v-if="techstack && techstack.detailsHtml" class="block block1">
      <v-container id="stack-details" class="body" grid-list-md style="padding-bottom:2em">
        <v-card>
          <v-card-title>
            <div class="details-html" v-html="techstack.detailsHtml" style="padding:1em"></div>
          </v-card-title>
        </v-card>
      </v-container>
    </section>

    <v-container v-if="techstack" class="body" grid-list-md>
      <TechnologyComments ref="techComments" :techstack="techstack" @organizationCreated="loadTechStack" />
    </v-container>
    
  </div>
</template>

<script>
import TechnologyPost from "~/components/TechnologyPost.vue";
import TechnologyComments from "~/components/TechnologyComments.vue";

import { mapGetters } from 'vuex';
import { dateFmt } from '@servicestack/client';
import { heroes } from "@servicestack/images";
import { ignoreKeyPress } from '~/shared/utils';
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
    techstack(){
      return this.getTechnologyStack(this.slug);
    },
    canChange(){
      return this.canChangeTechStack(this.techstack);
    },
    hasFavorited(){
      return this.isFavoriteTechStack(this.slug);
    },
    pageStats(){
      return this.getPageStats("stack", this.slug);
    },
    stackTiers(){
      const to = [];
      this.allTiers.forEach(tier => {
        const techChoices = this.techstack.technologyChoices.filter(techChoice => techChoice.tier === tier.name);
        if (techChoices.length > 0) {
          to.push({ title: tier.title, techChoices });
        }
      });
      return to;
    },
    ...mapGetters(['loading','canChangeTechStack','allTiers','getTechnologyStack','getPageStats','isFavoriteTechStack','isAuthenticated'])
  },

  methods: {
    async loadTechStack(){
      await this.$store.dispatch("loadTechnologyStack", this.slug);
    },
    refreshPageStats() {
      this.$store.dispatch("getPageStats", { type: "stack", slug: this.slug, id:this.techstack && this.techstack.id });
    },
    async addFavorite() {
      if (!this.isAuthenticated) return;
      await this.$store.dispatch('addFavorite', { type:'stack', id:this.techstack.id });
      this.refreshPageStats();
    },
    async removeFavorite() {
      if (!this.isAuthenticated) return;
      await this.$store.dispatch('removeFavorite', { type:'stack', id:this.techstack.id });
      this.refreshPageStats();
    },

    handleKeyUp(e) {
      if (!this.isAuthenticated || ignoreKeyPress(e)) return;
      const c = String.fromCharCode(e.keyCode).toLowerCase();
      if (c === 'e') {
        this.$router.push(routes.editStack(this.techstack.slug));
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

    dateFmt,
  },
  
  async mounted() {
    await this.loadTechStack();
    this.refreshPageStats();

    window.addEventListener('keyup', this.handleKeyUp);
  },

  destroyed(){
    window.removeEventListener('keyup', this.handleKeyUp);
  },

  data: () => ({
    routes,
  }),
};
</script>

<style>
.tech-info {
  padding: 0 2em;
}
.tech-info h2 {
  font-size: 24px;
  font-weight: normal;
  color: #8eacbb;
  padding: 1em 0;
}
.vendor {
  line-height: 2em;
  font-size: 24px;
  color: gray;
}

</style>
