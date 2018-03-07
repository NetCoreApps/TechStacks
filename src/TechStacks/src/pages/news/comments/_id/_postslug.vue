<template>
  <v-container class="body">
      <PostComments :postId="parseInt($route.params.id)"></PostComments>
  </v-container>
</template>

<script>
import PostComments from "~/components/PostComments.vue";

export default {
  components: { PostComments },
}
</script>
