<template>
  <div v-if="organization" class="post-info" style="text-transform:lowercase">
      <nuxt-link :to="routes.user(post.userId)">submitted</nuxt-link>
      {{fromNow(post.created)}}
      to <nuxt-link :to="toUrl">{{ toLabel }}</nuxt-link>
      <span v-if="(post.technologyIds || []).length > 0 && technologyTiers.length > 0">
        with
        <nuxt-link class="tag" v-for="techId in post.technologyIds" :key="techId"
            :to="routes.techTag(getTechnologySlug(techId),getTechnologyOrganization(techId))">
        {{ getTechnologySlug(techId) }}
        </nuxt-link>
      </span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { routes } from "~/shared/routes";
import { fromNow } from "~/shared/utils";

export default {
  props: ['organization','post'],

  computed: {
    category(){
      return this.post.categoryId && (this.organization.categories || []).filter(x => x.id == this.post.categoryId)[0];
    },
    toLabel(){
      const catName = this.category && this.category.name || '';
      const orgName = catName && (this.organization.name.indexOf(catName) >= 0 || catName.indexOf(this.organization.name) >= 0)
        ? ''
        : this.organization.name + ' ';
      return catName
        ? `${orgName}${catName} ${this.post.type}s`
        : `${orgName}${this.post.type}s`;
    },
    toUrl() {
      const qs = { types: this.post.type };
      if (this.category)
        qs.c = this.category.slug;

      return routes.organizationNews(this.organization.slug, qs);
    },

    ...mapGetters(['loading','getTechnologySlug','technologyTiers','getTechnologyOrganization'])
  },

  methods: {
    fromNow,
  },

  mounted(){
    this.$store.dispatch('loadTechnologyTiersIfNotExists');
  },

  data: () => ({
    routes,
  }),
}
</script>

<style>
.post-info {
  opacity: .6;
  font-size: 11px;
  white-space: nowrap;
}
</style>
