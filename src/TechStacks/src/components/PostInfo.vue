<template>
  <div v-if="organization" class="post-info" style="text-transform:lowercase">submitted {{fromNow(post.created)}} by
      <nuxt-link :to="`/users/${post.createdBy}`">@{{ post.createdBy }}</nuxt-link>
      to <nuxt-link :to="toUrl">{{ toLabel }}</nuxt-link>
      <span v-if="(post.technologyIds || []).length > 0 && technologyTiers.length > 0">
        with
        <nuxt-link class="tag" v-for="techId in post.technologyIds" :key="techId" 
            :to="`/tech/${getTechnologySlug(techId)}`">
        {{ getTechnologySlug(techId) }}
        </nuxt-link>
      </span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { appendQueryString } from "@servicestack/client";
import { fromNow } from "~/shared/utils";

export default {
  props: ['organization','post'],

  computed: {
    category(){
      return this.post.categoryId && (this.organization.categories || []).filter(x => x.id == this.post.categoryId)[0];
    },
    toLabel(){
      return this.category 
        ? `${this.category.name} ${this.post.type}s`
        : `${this.post.type}s`;
    },
    toUrl() {
      const qs = { types: this.post.type };
      if (this.category)
        qs.c = this.category.slug;
      
      return appendQueryString(`/news/${this.organization.slug}`, qs);
    },

    ...mapGetters(['getTechnologySlug','technologyTiers'])
  },

  methods: {
    fromNow,
  },

  data: () => ({

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
