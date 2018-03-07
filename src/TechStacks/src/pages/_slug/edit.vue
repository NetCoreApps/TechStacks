<template>
  <v-container>
      <TechStackEdit v-if="techstack" :techstack="techstack" />
      
      <v-card v-if="!techstack && !loading">
        <v-alert color="error subheading" icon="warning" :value="true" style="min-width:800px;text-align:center">
          TechStack '{{slug}}' was not found
        </v-alert>

        <v-card-actions style="text-align:center">
          <v-flex>
            <v-btn to="/stacks" exact>View TechStacks</v-btn>
            <v-btn to="/stacks/new" color="primary">Add TechStack</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
  </v-container>
</template>

<script>
import TechStackEdit from "~/components/TechStackEdit.vue";
import { mapGetters } from 'vuex';

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
    techstack: null 
  }),
}
</script>
