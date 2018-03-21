<template>
  <v-container>
      <TechStackEdit v-if="techstack" :techstack="techstack" />
      
      <v-card v-if="!techstack && !loading">
        <v-alert color="error subheading" icon="warning" :value="true" style="min-width:800px;text-align:center">
          TechStack '{{slug}}' was not found
        </v-alert>

        <v-card-actions style="text-align:center">
          <v-flex>
            <v-btn :to="routes.homeStacks" exact>View TechStacks</v-btn>
            <v-btn :to="routes.newStack" color="primary">Add TechStack</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
  </v-container>
</template>

<script>
import TechStackEdit from "~/components/TechStackEdit.vue";
import { mapGetters } from 'vuex';
import { routes } from "~/shared/routes";

export default {
  components: { TechStackEdit },
  computed: {
    slug() {
      return this.$route.params.slug;
    },
    ...mapGetters(['loading','getTechnologyStack','isAuthenticated'])
  },

  async mounted() {
    await this.$store.dispatch("loadTechnologyStack", this.slug);
    this.techstack = this.getTechnologyStack(this.slug);
  },

  data: () => ({ 
    routes,
    techstack: null 
  }),
}
</script>
