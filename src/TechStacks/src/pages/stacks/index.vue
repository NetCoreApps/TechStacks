<template>
  <div class="stacks-page" style="width:100%">

    <div class="hero">
      <v-parallax :src="heroUrl" >
        <v-layout align-center
          v-touch="{
            left: () => goNav(1),
            right: () => goNav(-1)
          }">

          <v-layout column align-center>
            <v-flex
              fluid
              style="min-height: 0"
              grid-list-lg
            >
              <v-card>
                <v-card-title primary-title>

                  <v-form style="width:100%">

                    <v-container>
                      <v-flex class="headline">Find Technology Stacks</v-flex>

                      <v-layout row wrap justify-space-between>
                        <v-flex xs4>
                          <v-text-field
                            label="Name"
                            v-model="name"
                          ></v-text-field>
                        </v-flex>

                        <v-flex xs4>
                          <v-text-field
                            label="Vendor"
                            v-model="vendor"
                          ></v-text-field>
                        </v-flex>

                        <v-flex xs3>
                          <v-btn large @click="reset()">reset</v-btn>
                        </v-flex>

                      </v-layout>

                      <v-layout row wrap justify-space-between>
                        <v-flex xs4>
                          <v-select
                            label="Order By"
                            :items="orderBy"
                            v-model="orderByField"
                          ></v-select>
                        </v-flex>

                        <v-flex xs4>
                          <v-checkbox 
                            :disabled="!orderByField || orderByField[0] == '-'"
                            label="Descending"
                            v-model="sortDesc"
                          ></v-checkbox>                        
                        </v-flex>

                        <v-flex xs3>
                          <v-btn large :disabled="!isAuthenticated" :to="routes.newStack" primary>Add TechStack</v-btn>
                        </v-flex>
                        
                      </v-layout>

                      <v-layout style="text-align:center;min-height:20px">
                        <v-flex class="title">
                          <span v-if="total > 0">Found {{total}} results...</span>
                        </v-flex>
                      </v-layout>
                    </v-container>

                  </v-form>


                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>

        </v-layout>
      </v-parallax>
    </div>

    <v-container v-if="!loading" class="techstacks body" grid-list-md>
      <v-layout class="body" fluid>
        <v-flex v-if="results.length > 0" xs12 sm12 class="no-prerender">
          <v-card>
            <v-container fluid grid-list-md>
              <v-layout row wrap>
                <v-flex xs3 v-for="techstack in results" :key="techstack.id">
                  <v-card flat tile :to="routes.stack(techstack.slug)">
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
        <v-flex v-else-if="!loading">
          <v-alert outline v-if="!querying" :value="true" color="info" icon="info">
            No results matched your query
          </v-alert>
        </v-flex>
      </v-layout>
    </v-container>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { heroes } from "@servicestack/images";
import { queryTechStacks } from "~/shared/gateway";
import { log, prettifyUrl } from "~/shared/utils";
import { routes } from "~/shared/routes";

export default {
  computed: {
    heroUrl() { 
      return heroes.hourly(new Date(), 10);
    },
    hasQuery() {
      return this.name || this.vendor || this.orderByField;
    },
    ...mapGetters(['loading','allTechStacks','allTechStacksTotal','isAuthenticated'])
  },

  methods: {
    reset() {
      this.name = this.vendor = this.orderByField = '';
      this.sortDesc = false;
      this.results = this.allTechStacks;
      this.total = this.allTechStacksTotal;
    },

    buildAutoQuery(){ 
      if (!this.hasQuery)
        return null;

      var q = { };
      if (this.name)
        q.nameContains = this.name;
      if (this.vendor)
        q.vendorNameContains = this.vendor;
      if (this.orderByField) 
        q.orderBy = (this.sortDesc && this.orderByField[0] != '-' ? '-' : '') + this.orderByField;
      return q;
    },

    async runQuery() {
      this.querying = true;
      const query = this.buildAutoQuery();
      this.$router.replace({ path: '/stacks', query });
      if (query != null) {
        const response = await queryTechStacks(query);
        this.results = response.results;
        this.total = response.total;
      } else {
        this.results = this.allTechStacks;
        this.total = this.allTechStacksTotal;
      }
      this.querying = false;
    }, 

    prettifyUrl
  },

  mounted() {
    const qs = this.$route.query;
    this.name = qs.nameContains;
    this.vendor = qs.vendorNameContains;

    const orderItem = qs.orderBy && this.orderBy.filter(x => x.value.indexOf(qs.orderBy) >= 0)[0];
    this.sortDesc = qs.orderBy && qs.orderBy[0] == '-' && (orderItem && orderItem.value[0] != '-');
    this.orderByField = orderItem && orderItem.value;

    const setResults = () => {
      if (this.hasQuery) {
        this.runQuery();
      } else {
        this.results = this.allTechStacks;
        this.total = this.allTechStacksTotal;
      }
    };

    if (this.$store.getters.allTechStacks.length == 0) {
      this.$store.dispatch("getAllTechStacks").then(r => setResults());
    } else {
      setResults();
    }

    this.$watch(vm => [vm.name, vm.vendor, vm.orderByField, vm.sortDesc].join(), async val => this.runQuery());
  },

  data () {
      return {
        routes,
        tier: '',
        name: '',
        vendor: '',
        orderByField: '',
        sortDesc: false,
        orderBy: [{text:'Most Views', value:'-ViewCount'}, 
                  {text:'Most Favorited', value:'-FavCount'}, 
                  {text:'Recently Updated', value:'-LastModified'}, 
                  {text:'Name', value:'Name'}, 
                  {text:'Vendor', value:'VendorName'}, 
                  {text:'Modified', value:'LastModified'},
                  {text:'Created', value:'Created'}],
        results: [],
        total: 0,
        querying: false,
      }
  }

};
</script>
