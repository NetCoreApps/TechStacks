<template>
  <v-container>
      <TechnologyEdit v-if="technology" :technology="technology" />
      
      <v-card v-if="!technology && !loading">
        <v-alert color="error subheading" icon="warning" :value="true" style="min-width:800px;text-align:center">
          Technology '{{slug}}' was not found
        </v-alert>

        <v-card-actions style="text-align:center">
          <v-flex>
            <v-btn :to="routes.homeTech" exact>View Technologies</v-btn>
            <v-btn :to="routes.newTech" color="primary">Add Technology</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
  </v-container>
</template>

<script>
import TechnologyEdit from "~/components/TechnologyEdit.vue";
import { mapGetters } from 'vuex';
import { routes } from "~/shared/routes";

export default {
  components: { TechnologyEdit },
  computed: {
    slug() {
      return this.$route.params.slug;
    },
    ...mapGetters(['loading','getTechnology','isAuthenticated'])
  },

  async mounted() {
    await this.$store.dispatch("loadTechnology", this.slug);
    this.technology = this.getTechnology(this.slug);
  },

  data: () => ({ 
    routes,
    technology: null 
  }),
}
</script>
