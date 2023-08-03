<template>
<div class="comments-page">
  <div v-if="post && comment" class="no-prerender">
    <PostAlerts :organization="organization" :post="post"></PostAlerts>

    <div class="comments-info">
      <nuxt-link v-if="comment.replyId" :to="routes.comment(postId,comment.replyId)">parent</nuxt-link>
      from <nuxt-link :to="routes.post(postId,post.slug)">{{ post.title }}</nuxt-link>
    </div>

    <v-layout column>
        <v-flex class="post-comments">
          <PostComment :post="post" :comment="comment"></PostComment>
        </v-flex>
    </v-layout>
    
  </div>
  
  <h2 v-if="notFound"><v-icon color="red">error_outline</v-icon> Comment was not found</h2>

</div>
</template>


<script>
import PostComment from "~/components/PostComment.vue";
import PostAlerts from "~/components/PostAlerts.vue";

import { mapGetters } from "vuex";
import { routes } from "~/shared/routes";

export default {
  components: { PostComment, PostAlerts },

computed: {
    postId() {
      return this.$route.params.postid;
    },
    commentId() {
      return this.$route.params.id;
    },
    post() {
      return this.getPost(this.postId);
    },
    comment() {
      return this.post && this.post.comments.find(x => x.id == this.commentId);
    },

    ...mapGetters(["getPost", "organization"])
  },

  methods: {
    async loadPost() {
      try {
          await this.$store.dispatch("loadPost", this.postId);
      } catch(e) {
        this.notFound = true;
      }
    },
  },

  async mounted() {
    this.$store.dispatch('loadUserPostActivity');
    this.$store.dispatch('loadUserPostCommentVotes', this.postId);
    await this.loadPost();
    this.$store.dispatch('loadTechnologyTiers');
    if (this.post) {
      this.$store.dispatch("loadOrganizationByIdIfNotExists", this.post.organizationId);
    }
  },

  data: () => ({
    routes,
    notFound: false,
  }),
}
</script>
