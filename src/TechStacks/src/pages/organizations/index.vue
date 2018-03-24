<template>
<v-container class="organizations-page">
  <v-layout fluid>
    <v-flex sm10 offset-sm1 :class="loading ? 'loading-body' : ''">
      <i v-if="allOrganizations.length > 0" class="no-prerender"></i>
      <v-toolbar>
        <v-toolbar-title class="headline">Organizations</v-toolbar-title>
      </v-toolbar>
      <v-card v-for="organization in allOrganizations" :key="organization.id">
        <v-card-title primary-title>
          <v-flex>
            <nuxt-link :to="routes.organization(organization.slug)">
              {{ organization.name }}
            </nuxt-link>
          </v-flex>
          <v-flex v-if="organization.userName" style="color:#999;text-align:right">
            by <nuxt-link :to="routes.user(organization.userName)">@{{organization.userName}}</nuxt-link>
          </v-flex>
        </v-card-title>
      </v-card>

      <v-card>
        <v-card-title>
          <OrganizationAdd v-if="add" @done="organizationDone" />
        </v-card-title>
        <v-card-actions v-if="!add">
          <v-layout>
            <v-flex>
              <v-btn large @click="add=true" :disabled="!isAuthenticated">New Organization</v-btn>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>

    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import OrganizationAdd from "~/components/OrganizationAdd.vue";

import { mapGetters } from "vuex";
import { routes } from "~/shared/routes";

export default {
  components: { OrganizationAdd },
  computed: {
    ...mapGetters(["loading", "isAuthenticated", "allOrganizations"])
  },

  methods: {
    organizationDone(createdSlug) {
      if (createdSlug) {
        this.$router.push(`/organizations/${createdSlug}`);
      } else {
        this.add = false;
      }
    }
  },

  async mounted(){
    await this.$store.dispatch('loadOrganizations');
  },

  data: () => ({
    routes,
    add: false,
  }),
};
</script>
