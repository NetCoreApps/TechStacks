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
                <v-card-title primary-title style="justify-content:center;min-height:250px;min-width:800px">

                  <h2 v-if="!user && loading" class="svg-icon loading">Loading My Feed...</h2>

                  <h2 v-if="!user"><v-icon color="red">error_outline</v-icon> Please Sign In to view your User Feed</h2>

                  <v-container v-else-if="user" fluid>
                    <v-layout column align-center>
                      <v-flex if="user.profileUrl">
                        <div class="avatarbox">
                          <nuxt-link :to="`/users/${user.userName}`"><img :src="user.profileUrl"></nuxt-link>
                        </div>
                      </v-flex>
                      <v-flex style="text-align:center">
                        <div class="headline" style="margin-top:.5em">TechStacks built using my favorite technologies</div>
                        <div style="color:gray;margin-top:.5em">
                            Favorite <nuxt-link to="/tech">technologies</nuxt-link> to see more TeckStacks in your feed
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
        
        <v-flex xs8>
          <v-layout row wrap>
            <v-flex xs12 
              v-for="techstack in sessionFeed"
              :key="techstack.name"
            >
              <nuxt-link :to="`/${techstack.slug}`">
                <v-toolbar color="orange" style="width:100%">
                  <v-toolbar-title class="white--text" style="width:100%">
                      <v-layout>
                        <v-flex>
                            {{ techstack.name }}
                        </v-flex>
                        <v-flex style="text-align:right;font-weight:normal;font-size:smaller">
                            {{ prettifyUrl(techstack.appUrl) }}
                        </v-flex>
                      </v-layout>
                  </v-toolbar-title>
                </v-toolbar>
              </nuxt-link>
              <v-card>
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
                        <nuxt-link :to="`/tech/${tech.slug}`"><img :src="tech.logoUrl" height="48"></nuxt-link>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-title>
                <v-card-actions class="white">
                  <v-spacer></v-spacer>
                  <v-btn flat :to="`/${techstack.slug}`">view</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex xs4>
          <v-layout column>

            <v-flex>
              <nuxt-link to="/stacks">
                <v-toolbar color="pink">
                  <v-toolbar-title class="white--text">Favorite TechStacks</v-toolbar-title>
                </v-toolbar>
              </nuxt-link>
              <v-card>
                <v-card-title>
                  <v-container fill-height fluid>
                    <v-layout row>
                      <v-flex>
                        <v-flex class="headline" v-for="techstack in favoriteTechStacks" :key="techstack.name">
                          <v-btn icon style="margin:0 .5em 0 0" @click="removeFavorite('stack',techstack.id)"><v-icon color="pink">favorite</v-icon></v-btn>
                          <nuxt-link :to="`/${techstack.slug}`">{{ techstack.name }}</nuxt-link>
                        </v-flex>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-title>
                <v-card-actions>
                  <v-flex d-flex>
                      <v-btn large to="/stacks/new">Add TechStack</v-btn>
                  </v-flex>
                </v-card-actions>
              </v-card>
            </v-flex>

            <v-flex>
              <nuxt-link to="/tech">
                <v-toolbar color="pink">
                    <v-toolbar-title class="white--text">Favorite Technologies</v-toolbar-title>
                </v-toolbar>
              </nuxt-link>
              <v-card>
                <v-card-title>
                  <v-container fill-height fluid>
                    <v-layout row>
                      <v-flex>
                        <v-flex class="headline" v-for="tech in favoriteTechnologies" :key="tech.name">
                          <v-btn icon style="margin:0 .5em 0 0" @click="removeFavorite('tech',tech.id)"><v-icon color="pink">favorite</v-icon></v-btn>
                          <nuxt-link :to="`/tech/${tech.slug}`">{{ tech.name }}</nuxt-link>
                        </v-flex>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-title>
                <v-card-actions>
                  <v-flex d-flex>
                      <v-btn large to="/tech/new">Add Technology</v-btn>
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
import { mapGetters } from "vuex";
import { heroes } from "@servicestack/images";
import { log, prettifyUrl } from "~/shared/utils";

export default {
  computed: {
    heroUrl() {
      return heroes.static(this.user && this.user.userName, 10);
    },
    ...mapGetters([
      "loading",
      "isAuthenticated",
      "user",
      "sessionFeed",
      "favoriteTechnologies",
      "favoriteTechStacks"
    ])
  },

  methods: {
    prettifyUrl,
    removeFavorite(type, id) {
      this.$store.dispatch('removeFavorite', { type, id });
    },
  },

  mounted() {
    this.$store.dispatch("getUserFeed");
  },

  data() {
    return {};
  }
};
</script>

<style scoped>
.avatarbox {
  text-align: center;
  display: inline-block;
  border: 1px solid #ddd;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  width: 60px;
  height: 60px;
}
.avatarbox img {
  margin: 4px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  height: 50px;
  width: 50px;
}
</style>
