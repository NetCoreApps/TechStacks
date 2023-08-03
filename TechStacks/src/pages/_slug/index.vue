<template>
  <NewsPosts class="news-page" :slug="$route.params.slug" :query="$route.query"></NewsPosts>
</template>

<script>
import NewsPosts from "~/components/NewsPosts.vue";

export default {
  components: { NewsPosts },
}
</script>
