<template>
  <NewsPosts :slug="$route.params.slug" :query="$route.query"></NewsPosts>
</template>

<script>
import NewsPosts from "~/components/NewsPosts.vue";

export default {
  components: { NewsPosts },
  
  mounted(){ this.$store.commit('mounted', true); }
}
</script>
