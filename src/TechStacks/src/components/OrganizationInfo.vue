<template>
  <div class="org-info">

    <v-card v-if="organization.descriptionHtml" class="org-description">
      <v-card-title v-html="organization.descriptionHtml"></v-card-title>
    </v-card>

    <v-card v-if="isAuthenticated" class="org-subscribe">
      <v-card-title>

        <v-layout v-if="!showOptions" justify-center>
          <v-btn v-if="postTypes.length == 0" @click="showOptions=true" color="primary">
            Subscribe to {{ organization.name.length > 15 ? 'Organization' : organization.name }}
          </v-btn>
          <v-btn v-else @click="showOptions=true">
            Subscribed
          </v-btn>
        </v-layout>

        <v-layout v-if="showOptions" column>
          <p>
            Receive notifications for new:
          </p>
          <v-checkbox v-model="postTypes" v-for="postType in browsablePostTypes" :key="postType"
                      :label="postTypeLabel(postType)" :value="postType"></v-checkbox>

          <v-btn v-if="showOptions" @click="showOptions=false">Update Subscription</v-btn>
        </v-layout>

      </v-card-title>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: [''],
  computed: {

    ...mapGetters([
      "loading",
      "isAuthenticated",
      "organization",
      "browsablePostTypes",
      "postTypeLabelsMap"
    ])
  },

  methods: {
    postTypeLabel(postType) {
      return this.postTypeLabelsMap[postType];
    },
  },
  
  data: () => ({
    showOptions: false,
    postTypes: []
  })
}
</script>

<style>
.org-description .gfm, .org-description .gfm p, .org-description .gfm blockquote, .org-description .gfm ul, .org-description .gfm ol, .org-description .gfm dl, .org-description .gfm table {
  font-size: 14px !important;
}
.org-info {
  margin: 0 0 .5em 0;
}
</style>
