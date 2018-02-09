<template>
  <v-app>
    <v-toolbar fixed app :clipped-left="clipped" style="background:#24292e" dark>
      <nuxt-link to="/" exact>
        <img src="../static/img/logo-white.svg" width="42" height="42" />
      </nuxt-link>
      <nuxt-link to="/" exact style="color:#fff;text-decoration:none">
        <v-toolbar-title v-text="title" style="font-size:26px;"></v-toolbar-title>
      </nuxt-link>
      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/" exact><v-icon>home</v-icon></v-btn>
        <v-btn flat to="/stacks">Stacks</v-btn>
        <v-btn flat to="/tech">Technologies</v-btn>
        <v-btn v-if="isAuthenticated" flat to="/favorites" exact>Favorites</v-btn>
        <v-btn v-if="!isAuthenticated" @click="href(`/auth/twitter`)">
          <img src="../static/img/twitter.svg" width="50" height="50" style="backgroundd:#333" />
        </v-btn>
        <v-btn v-if="!isAuthenticated" @click="href(`/auth/github`)">
          <img src="../static/img/github.svg" width="30" height="30" style="backgroundd:#333" />
        </v-btn>
        <v-menu v-if="isAuthenticated">
          <v-btn flat slot="activator">
            <img :src="user.profileUrl" height="40" style="border-radius:50%" />
          </v-btn>
          <v-list dark style="margin-top:50px">
            <v-list-tile>
              <v-list-tile-title class="white--text">
                <nuxt-link :to="`/users/${user.userName}`">Profile</nuxt-link>
              </v-list-tile-title>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-title class="white--text">
                <a href="/auth/logout">Logout</a>
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>        
      </v-toolbar-items>
    </v-toolbar>

    <div v-if="!isAuthenticated" id="sign-text" style="position:absolute;top:70px;right:20px">sign in to add techstacks</div>

    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">

          <v-layout column align-center>
            <nuxt/>
          </v-layout>

        </v-slide-y-transition>
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app style="justify-content:center;">
      <div id="sig" style="font-size:12px;color:gray">
        made with <span>&#10084;</span> by <a target="_blank" href="https://servicestack.net" title="ServiceStack">ServiceStack</a>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    computed: mapGetters(['isAuthenticated','user']),

    methods: {
      href(url) {
        location.href = url;
      }
    },

    data () {
      return {
        clipped: true,
        drawer: false,
        fixed: true,
        items: [
          { icon: 'home', title: 'Home', to: '/' },
          { icon: 'dns', title: 'Stacks', to: '/stacks' },
          { icon: 'code', title: 'Technologies', to: '/tech' },
          { icon: 'star_border', title: 'Favorites', to: '/favorites' },
        ],
        title: 'TechStacks'
      }
    }
  }
</script>
