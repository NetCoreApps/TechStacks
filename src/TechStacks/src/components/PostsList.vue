<template>
  <v-flex>
    <v-card v-for="(post, index) in posts" :key="post.id" :class="['post', votedClass(post.id)]">
      <v-card-title>
        <v-container fluid grid-list-sm>
          <v-layout row align-center>
            <v-flex class="post-rank" :style="{ maxWidth }">
              <span class="rank">{{startIndex + index}}</span>
            </v-flex>
            <v-flex class="post-votes" style="max-width:52px">
              <v-layout column style="text-align:center">
                <v-btn icon class="vote-btn up" @click="votePost(post,1)" :disabled="!canVotePost(post)">
                  <v-icon>arrow_drop_up</v-icon>
                </v-btn>
                <h4 class="votes">{{post.points}}</h4>
                <v-btn icon class="vote-btn down" @click="votePost(post,-1)" :disabled="!canVotePost(post)">
                  <v-icon>arrow_drop_down</v-icon>
                </v-btn>
              </v-layout>
            </v-flex>
            <v-flex class="post-body">
              <v-layout column>
                <div>
                  <nuxt-link v-if="!post.url" class="post-link" :to="routes.post(post.id,post.slug)">{{ post.title }}</nuxt-link>
                  <a v-if="post.url" class="post-link external" :href="post.url">{{ post.title }}</a>

                  <span v-if="post.labels && post.labels.length > 0" class="list-labels">
                    <nuxt-link v-if="post.status" :class="`label ${post.status}`" :to="toUrl({ is: post.status })">{{ post.status }}</nuxt-link>
                    <nuxt-link class="label" :style="labelStyle(label,getOrganization(post.organizationId))" :to="toUrl({ is: label })" 
                               v-for="label in post.labels" :key="label">{{ label }}</nuxt-link>
                  </span>
                </div>
                
                <PostInfo :organization="getOrganization(post.organizationId)" :post="post" />

                <div class="post-actions">
                <nuxt-link :to="routes.post(post.id,post.slug)">{{ post.commentsCount || '' }} {{ post.commentsCount > 1 ? 'comments' : 'comment' }}</nuxt-link>
                  <a @click="hidePost(post.id)">hide</a>
                  <a v-if="canFavoritePost(post)" @click="favoritePost(post)">{{ favoriteLabel(post) }}</a>
                  <a v-if="canReportPost(post)" @click="reportPostId=post.id">report</a>
                </div>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-title>
    </v-card>

    <ReportDialog :postId="reportPostId" v-if="reportPostId" @close="reportPostId=null"></ReportDialog>
  </v-flex>
</template>

<script>
import PostInfo from "~/components/PostInfo.vue";
import ReportDialog from "~/components/ReportDialog.vue";

import { mapGetters } from "vuex";
import { routes } from "~/shared/routes";
import { appendQueryString } from "@servicestack/client";

import {
  POSTS_PER_PAGE,
  votedClass,
  votePost,
  favoritePost,
  favoriteLabel,
  hidePost,
  canVotePost,
  canFavoritePost,
  canReportPost,
  labelStyle,
} from "~/shared/post";

export default {
  components: { PostInfo, ReportDialog },
  props: ['posts','page'],

  computed: {
    startIndex() {
      return 1 + this.page * POSTS_PER_PAGE;
    },
    maxWidth() {
      return (this.startIndex + POSTS_PER_PAGE).toString().length * 12 + "px";
    },
  },

  methods: {
    getOrganization(organizationId){
      return this.$store.getters.getOrganization(organizationId);
    },

    toUrl(args) {
      const qs = Object.assign({}, this.$route.query, args);
      delete qs.p;
      return appendQueryString(this.$route.path, qs);
    },

    votedClass,
    votePost,
    favoritePost,
    favoriteLabel,
    hidePost,
    canVotePost,
    canFavoritePost,
    canReportPost,
    labelStyle,
  },

  data: () => ({
    routes,
    reportPostId: null,
  })
}
</script>
