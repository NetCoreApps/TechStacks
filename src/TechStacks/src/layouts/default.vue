<template>
  <v-app>
    <div v-if="prerenderedHtml" v-html="prerenderedHtml"></div>
    <div v-else>
      <Shortcuts v-if="showDialog == 'Shortcuts'" />
      <span v-if="$store.getters.mounted" id="__mounted"></span>

      <v-toolbar fixed app :clipped-left="clipped" style="background:#24292e" dark @click="click"
        v-touch="{
          left: () => goNav(1),
          right: () => goNav(-1)
        }">
        <nuxt-link class="logo" :to="routes.homeNews" exact>
          <img src="../static/img/logo-white.svg" width="42" height="42" />
        </nuxt-link>
        <nuxt-link :to="routes.homeNews" exact style="color:#fff;text-decoration:none">
          <v-toolbar-title v-text="title" style="font-size:26px;"></v-toolbar-title>
        </nuxt-link>
        <nuxt-link class="slogan" :to="routes.post(5944,'welcome')">no noise, just tech!</nuxt-link>
        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat :to="routes.homeNews" exact title="Home (1 or H)"><v-icon>home</v-icon></v-btn>
          <v-btn flat :to="routes.homeTop" title="Top Technologies (2)">Top</v-btn>
          <v-btn flat :to="routes.homeStacks" title="Technology Stacks (3)">Stacks</v-btn>
          <v-btn flat :to="routes.homeTech" title="Technologies (4)">Technologies</v-btn>
          <v-btn v-if="isAuthenticated" flat :to="routes.homeFavorites" title="Favorites (5)">Favorites</v-btn>
          <v-btn v-if="!isAuthenticated" @click="href(`/auth/twitter`)" title="User Profile (6)">
            <img src="../static/img/twitter.svg" width="50" height="50" style="background:#333" />
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
                  <nuxt-link :to="routes.user(user.userName)">Profile</nuxt-link>
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
    </div>
  </v-app>
</template>

<script>
import Shortcuts from "~/components/Shortcuts.vue";

import { mapGetters } from "vuex";
import { routes } from "~/shared/routes";
import { globalNavShortcuts, goNav } from "~/shared/utils";

export default {
  components: { Shortcuts },
  computed: {
    ...mapGetters(['isAuthenticated','user','showDialog'])
  },

  methods: {
    href(url) {
      location.href = url;
    },

    async getPrerenderedHtml() {
      try {
        const host = location.host;
        const prerenderUrl = "/prerender";
        const log = console.log && true;

        const path = location.pathname + location.search;
        const getPreRender = async path =>
          (await fetch(`${prerenderUrl}${path || "/"}`)).text();

        //pages can add <i class="no-prerender"></i> to indicate pages rendered correctly
        const hasData = () => {
          if (window.__PRERENDERED) {
            if (log) console.log('already prerendered, skipping');
            return true;
          }
          const ret = document.getElementsByClassName("no-prerender")[0] != null;
          if (ret && log) console.log("no-prerender, skipping...");
          return ret;
        };

        let html = await getPreRender(path);
        if (!html || html.trim().length == 0) {
          if (log) console.log("empty html, skipping prerendering...");
          return;
        }
        if (html.trim().indexOf("<") == -1) {
          if (log) console.log("invalid html, skipping prerendering... " + html.trim().substring(0,100));
          return;
        }
        if (hasData()) return;

        if (log) console.log(`injecting prerendered content: ${html.length} chars`);
        return html;
      } catch(e) {
        console.log("ERROR getPrerenderedHtml: ", e.message, e.stack);
        return null;        
      }
    },

    click(e) {
      // this.goNav(e.ctrlKey ? -1 : 1);
    },

    goNav,
  },

  async mounted(){
    try {
      const isBot = /bot|crawl|spider/i.test(navigator.userAgent);
      if (isBot) {
        this.prerenderedHtml = await this.getPrerenderedHtml();
      } else {
        setTimeout(async () => {          
          //still fetch for non-bots when no no-prerender, only happens on initial load
          this.prerenderedHtml = await this.getPrerenderedHtml();
        }, 2000);
      }
    } catch(e) {
      console.log('getPrerenderedHtml()', e.message, e.stack);
    }
    window.onkeydown = globalNavShortcuts.bind(this);
  },

  data () {
    return {
      routes,
      clipped: true,
      drawer: false,
      fixed: true,
      title: 'TechStacks',
      prerenderedHtml: null,
    }
  }
}
</script>
