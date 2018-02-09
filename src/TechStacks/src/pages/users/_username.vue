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

                  <h2 v-if="!user && loading" class="svg-icon loading">Loading User {{userName}} ...</h2>

                  <h2 v-if="!user && !loading"><v-icon color="red">error_outline</v-icon> User '{{userName}}' was not found</h2>

                  <v-container v-else-if="user" fluid>
                    <v-layout column align-center>
                      <v-flex if="user.avatarUrl">
                        <div class="avatarbox">
                          <img :src="user.avatarUrl">
                        </div>
                      </v-flex>
                      <v-flex>
                        <div class="headline">{{user.userName}}</div>
                      </v-flex>
                      <v-flex xs12 class="py-2" style="margin-top:1em">
                        <v-btn-toggle mandatory v-model="tab">
                          <v-btn 
                            :disabled="user.techStacks.length === 0"
                          >
                            {{ user.techStacks.length }} TechStacks Created
                          </v-btn>
                          <v-btn 
                            :disabled="user.favoriteTechnologies.length === 0"
                          >
                            {{ user.favoriteTechnologies.length }} Favorite Technologies
                          </v-btn>
                          <v-btn 
                            :disabled="user.favoriteTechStacks.length === 0"
                          >
                            {{ user.favoriteTechStacks.length }} Favorite TechStacks
                          </v-btn>
                        </v-btn-toggle>
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

    <v-container v-if="user && tab == 0" class="body" grid-list-md>
      <v-layout class="body" fluid>
        <v-flex xs12 sm12>
          <v-toolbar dark>
            <v-toolbar-title class="headline white--text">TechStacks created by @{{ user.userName }}</v-toolbar-title>
          </v-toolbar>
          <v-card>
            <v-container fluid grid-list-md>
              <v-layout row wrap>
                <v-flex xs3 v-for="techstack in user.techStacks" :key="techstack.id">
                  <v-card flat tile :to="`/${techstack.slug}`">
                    <v-card-media
                      :src="techstack.screenshotUrl"
                      height="270px"
                    >
                    </v-card-media>
                    <div class="tile-url">{{ prettifyUrl(techstack.appUrl) }}</div>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    
    <v-container v-if="user && tab == 1" class="body" grid-list-md>
      <v-layout row>
        <v-flex>

          <v-toolbar>
            <v-toolbar-title class="headline">@{{ user.userName }} favorite Technologies</v-toolbar-title>
          </v-toolbar>
          <v-card>
            <v-data-table
                :headers="headers"
                :pagination.sync="pagination"
                :items="user.favoriteTechnologies"
                hide-actions
                class="elevation-1"
              >
              <template slot="items" slot-scope="props">
                <tr @click="$router.push(`/tech/${props.item.slug}`)">
                  <td class="nowrap">{{ props.item.name }}</td>
                  <td>{{ props.item.description }}</td>
                  <td class="nowrap" style="text-align:center">
                    <img :src="props.item.logoUrl" :alt="props.item.name" style="max-width:220px;max-height:120px;padding:1em 0">
                    <div>{{ props.item.vendorName }}</div>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card>

        </v-flex>
      </v-layout>
    </v-container>

    <v-container v-if="user && tab == 2" class="body" grid-list-md>
      <v-layout class="body" fluid>
        <v-flex xs12 sm12>
          <v-toolbar dark>
            <v-toolbar-title class="headline white--text">@{{ user.userName }} favorite TechStacks</v-toolbar-title>
          </v-toolbar>
          <v-card>
            <v-container fluid grid-list-md>
              <v-layout row wrap>
                <v-flex xs3 v-for="techstack in user.favoriteTechStacks" :key="techstack.id">
                  <v-card flat tile :to="`/${techstack.slug}`">
                    <v-card-media
                      :src="techstack.screenshotUrl"
                      height="270px"
                    >
                    </v-card-media>
                    <div class="tile-url">{{ prettifyUrl(techstack.appUrl) }}</div>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { heroes } from "@servicestack/images";
import { log, prettifyUrl } from "~/shared/utils";

export default {  
  computed: {
    userName() {
      return this.$route.params.username;
    },
    heroUrl() { 
      return heroes.static(this.userName); 
    },
    user(){
      return this.getUserInfo(this.userName);
    },
    ...mapGetters(['loading','getUserInfo'])
  },

  methods: {
    prettifyUrl,
  },
  
  mounted() {
    this.tab = parseInt(this.$route.query.tab || 0);

    this.$store.dispatch("getUserInfo", this.userName)
      .then(x => {
        if (!this.$route.query.tab) {
          this.tab = this.user.techStacks.length > 0 ? 
              0 
            : this.user.favoriteTechnologies.length > 0 ?
              1
            : this.user.favoriteTechStacks.length > 0 ?
              2 
            : -1;
        }
      });
  },

  watch: {
    tab: function(newTab) {
      const query = newTab === 0 ? {} : { tab: newTab };
      this.$router.replace({ query });
    }
  },

  data() {
    return {
      tab: -1,
      pagination: {
        sortBy: null,
        rowsPerPage: -1
      },
      headers: [
        { text: 'Name', align: 'left', value: 'name' },
        { text: 'Description', align: 'left', sortable: false, value: 'description' },
        { text: 'Vendor', align: 'left', value: 'vendorName' }
      ],
    }
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
