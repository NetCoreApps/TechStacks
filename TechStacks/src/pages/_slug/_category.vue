<template>
  <NewsPosts class="news-cateogry-page" :slug="$route.params.slug" :query="{ c: $route.params.category }" view="category"></NewsPosts>
</template>

<script>
import NewsPosts from "~/components/NewsPosts.vue";

export default {
  components: { NewsPosts },
}
</script>
