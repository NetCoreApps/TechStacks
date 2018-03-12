<template>
  <div style="width:100%">

    <div class="hero">
      <v-parallax :src="heroUrl">
        <v-layout align-center>
          <v-flex xs12 sm12>
            <v-container grid-list-md style="max-width:1000px">

              <v-card>
                <v-card-title primary-title>
                  <v-flex style="text-align:center">
                      <v-card flat color="transparent">
                        <p>
                          Discover what technologies were used to create popular Websites and Apps, for example here's what 
                          <nuxt-link :to="routes.stack('techstacks')">TechStacks was created</nuxt-link> with.
                        </p>
                        <p>
                          Missing your favorite Tech or TechStack? Sign-in to add it now! 
                          and customize this page to see who else uses your favorite technology.
                        </p>
                      </v-card>
                      <v-container id="badges" grid-list-sm>
                        <v-layout row wrap align-center>
                          <v-flex>
                              <a href="https://github.com/ServiceStackApps/TechStacksApp">
                                  <img src="../../static/img/swift-logo.svg" height="25" width="87">
                              </a>
                          </v-flex>
                          <v-flex>
                              <a href="https://itunes.apple.com/us/app/webstacks/id1176797617?ls=1&amp;mt=8">
                                  <img src="../../static/img/appstore-badge.png" height="50" width="162">
                              </a>
                          </v-flex>
                          <v-flex>
                              <a href="https://github.com/ServiceStackApps/TechStacksAndroidApp">
                                  <img src="../../static/img/java-logo.svg" height="42" width="80">
                              </a>
                          </v-flex>
                          <v-flex>
                              <a href="https://play.google.com/store/apps/details?id=servicestack.net.techstacks">
                                  <img alt="Android app on Google Play" src="../../static/img/en_app_rgb_wo_60.png" height="50" width="143">
                              </a>
                          </v-flex>
                          <v-flex>
                              <a href="https://github.com/ServiceStackApps/TechStacksKotlinApp">
                                  <img src="../../static/img/kotlin-logo.svg" height="25" width="113">
                              </a>
                          </v-flex>
                          <v-flex>
                              <a href="https://play.google.com/store/apps/details?id=test.servicestack.net.techstackskotlin">
                                  <img alt="Android app on Google Play" src="../../static/img/en_app_rgb_wo_60.png" height="50" width="143">
                              </a>
                          </v-flex>
                          <v-flex>
                              <a href="https://github.com/ServiceStackApps/HelloMobile">
                                  <img src="../../static/img/csharp-logo.svg" height="40" width="58">
                              </a>
                          </v-flex>
                        </v-layout>
                      </v-container>
                  </v-flex>
                </v-card-title>
              </v-card>

            </v-container>
          </v-flex>
        </v-layout>
      </v-parallax>
    </div>

    <v-container class="body" grid-list-md>
      <v-layout row>
        
        <v-flex xs8>
          <v-layout row wrap>
            <v-flex xs6 
              v-for="tier in allTiers"
              :key="tier.name"
            >
              <nuxt-link :to="routes.techTier(tier.name)">
                <v-toolbar color="blue">
                  <v-toolbar-title class="white--text">
                    {{ tier.title }}
                  </v-toolbar-title>
                </v-toolbar>
              </nuxt-link>
              <v-card>
                <v-card-title>
                  <v-container fill-height fluid>
                    <v-layout row>
                      <v-flex>
                        <v-flex v-for="tech in topTechnologiesByTier(tier.name)" :key="tech.name">
                          <v-layout align-center>
                            <v-flex xs2 class="headline" style="min-width:50px">
                              <em>({{ tech.stacksCount }})</em>
                            </v-flex>
                            <v-flex>
                              <nuxt-link :to="routes.tech(tech.slug)"><img :src="tech.logoUrl" height="44"></nuxt-link>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-title>
                <v-card-actions class="white">
                  <v-spacer></v-spacer>
                  <v-btn flat :to="routes.techTier(tier.name)">view all</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex xs4>
          <v-layout column>

            <v-flex>
              <nuxt-link :to="routes.homeTech">
                <v-toolbar>
                  <v-toolbar-title>
                    Browse by Technology
                  </v-toolbar-title>
                </v-toolbar>
              </nuxt-link>
              <v-card>
                <v-card-title>
                  <v-container fill-height fluid>
                    <v-layout row>
                      <v-flex>
                        <v-flex class="headline" v-for="tech in topTechnologies" :key="tech.name">
                          <nuxt-link :to="routes.tech(tech.slug)"><em>({{ tech.stacksCount }})</em> {{ tech.name }}</nuxt-link>
                        </v-flex>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-title>
              </v-card>
            </v-flex>

            <v-flex>
              <v-toolbar>
                <v-toolbar-title>Browse by Users</v-toolbar-title>
              </v-toolbar>
              <v-card>
                <v-card-title>
                  <v-container fill-height fluid>
                    <v-layout row>
                      <v-flex>
                        <v-flex class="headline" v-for="user in topUsers" :key="user.userName">
                          <nuxt-link :to="routes.user(user.userName)"><em>({{ user.stacksCount }})</em> {{ user.userName }}</nuxt-link>
                        </v-flex>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-title>
              </v-card>
            </v-flex>

          </v-layout>
        </v-flex>
      
      </v-layout>
    </v-container>
  
  </div>
</template>

<script>
import { heroes } from "@servicestack/images";

import { mapGetters } from 'vuex';
import { routes } from "~/shared/routes";

export default {

  computed: mapGetters([
    'allTiers',
    'topTechnologiesByTier',
    'topTechnologies',
    'topUsers'
  ]),
    
  data: () => ({
    routes,
    name: '',
    result: ' ',
    heroUrl: heroes.hourly()
  })
}
</script>
