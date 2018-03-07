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
                <v-card-title primary-title style="justify-content:center;min-height:220px;min-width:900px">

                  <v-form style="width:100%">

                    <v-container>
                      <v-flex class="headline">Find Technologies</v-flex>

                      <v-layout row wrap justify-space-between>
                        <v-flex xs3>
                          <v-text-field
                            label="Name"
                            v-model="name"
                          ></v-text-field>
                        </v-flex>

                        <v-flex xs3>
                          <v-text-field
                            label="Vendor"
                            v-model="vendor"
                          ></v-text-field>
                        </v-flex>

                        <v-flex xs5>
                          <v-select
                            label="Technology Tier"
                            :items="allTiers"
                            item-text="title"
                            item-value="name"
                            v-model="tier"
                          ></v-select>
                        </v-flex>

                      </v-layout>

                      <v-layout row wrap justify-space-between>
                        <v-flex xs3>
                          <v-select
                            label="Order By"
                            :items="orderBy"
                            v-model="orderByField"
                          ></v-select>
                        </v-flex>

                        <v-flex xs3>
                          <v-checkbox 
                            :disabled="!orderByField || orderByField[0] == '-'"
                            label="Descending"
                            v-model="sortDesc"
                          ></v-checkbox>                        
                        </v-flex>

                        <v-flex xs5>
                          <v-btn large @click="reset()">reset</v-btn>
                          <v-btn large :disabled="!isAuthenticated" to="/tech/new" primary>Add Technology</v-btn>
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

    <v-container v-if="!loading" class="body" grid-list-md>
      <v-layout row>
        <v-flex v-if="results.length > 0">

              <v-card>
                <v-data-table
                    :headers="headers"
                    :items="results"
                    :pagination.sync="pagination"
                    :loading="loading"
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
import { queryTechnology } from "~/shared/gateway";
import { log } from "~/store";

export default {
  computed: {
    heroUrl() { 
      return heroes.hourly(new Date(), 20); 
    },
    hasQuery() {
      return this.name || this.vendor || this.tier || this.orderByField;
    },
    ...mapGetters(['loading','allTiers','allTechnologies','allTechnologiesTotal','isAuthenticated'])
  },

  methods: {
    reset() {
      this.name = this.vendor = this.tier = this.orderByField = '';
      this.sortDesc = false;
      this.pagination.sortBy = null;
      this.results = this.allTechnologies;
      this.total = this.allTechnologiesTotal;
    },
    buildAutoQuery(){ 
      if (!this.hasQuery)
        return null;

      var q = { };
      if (this.name)
        q.nameContains = this.name;
      if (this.vendor)
        q.vendorNameContains = this.vendor;
      if (this.tier)
        q.tier = this.tier;
      if (this.orderByField) 
        q.orderBy = (this.sortDesc && this.orderByField[0] != '-' ? '-' : '') + this.orderByField;
      return q;
    },
    async runQuery() {
      this.querying = true;
      const query = this.buildAutoQuery();
      this.$router.replace({ path: '/tech', query })
      if (query != null) {
        const response = await queryTechnology(query);
        this.results = response.results;
        this.total = response.total;
      } else {
        this.results = this.allTechnologies;
        this.total = this.allTechnologiesTotal;
      }
      this.querying = false;
    }
  },

  mounted() {
    const qs = this.$route.query;
    this.name = qs.nameContains;
    this.vendor = qs.vendorNameContains;
    this.tier = qs.tier;

    const orderItem = qs.orderBy && this.orderBy.filter(x => x.value.indexOf(qs.orderBy) >= 0)[0];
    this.sortDesc = qs.orderBy && qs.orderBy[0] == '-' && (orderItem && orderItem.value[0] != '-');
    this.orderByField = orderItem && orderItem.value;

    const setResults = () => {
      if (this.hasQuery) {
        this.runQuery();
      } else {
        this.results = this.allTechnologies;
        this.total = this.allTechnologiesTotal;
      }
    };
    if (this.$store.getters.allTechnologies.length == 0) {
      this.$store.dispatch("getAllTechnologies").then(r => setResults());
    } else {
      setResults();
    }

    this.$watch(vm => [vm.name, vm.vendor, vm.tier, vm.orderByField, vm.sortDesc].join(), async val => this.runQuery());
  },

  data () {
      return {
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

<style>
table.datatable tbody td {
  font-size: 14px;
}
table.datatable tbody tr {
  cursor: pointer;
}
</style>
