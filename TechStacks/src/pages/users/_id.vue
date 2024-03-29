<template>
  <div class="user-page" style="width:100%">

    <div class="hero">
      <v-parallax :src="heroUrl" >
        <v-layout align-center>

          <v-layout column align-center>
            <v-flex
              fluid
              style="min-height: 0"
              grid-list-lg
            >
              <v-card>
                <v-card-title primary-title>

                  <h2 v-if="!user && loading" class="svg-icon loading">Loading User {{id}} ...</h2>

                  <h2 v-if="!user && !loading"><v-icon color="red">error_outline</v-icon> User '{{id}}' was not found</h2>

                  <v-container v-else-if="user" fluid class="no-prerender">
                    <v-layout column align-center>
                      <v-flex if="user.avatarUrl">
                        <div class="avatarbox">
                          <img :src="user.avatarUrl">
                        </div>
                      </v-flex>
                      <v-flex>
                        <div class="headline">{{user.id}}</div>
                      </v-flex>
                      <v-flex xs12 class="py-2" style="margin-top:1em">
                        <v-btn-toggle mandatory v-model="tab">
                          <v-btn title="TechStacks Created (ALT+1)">
                            TechStacks Created
                          </v-btn>
                          <v-btn title="Favorite Technologies (ALT+2)">
                            Favorite Technologies
                          </v-btn>
                          <v-btn title="Favorite TechStacks (ALT+3)">
                            Favorite TechStacks
                          </v-btn>
                          <v-btn title="Posts (ALT+4)">
                            Posts
                          </v-btn>
                          <v-btn title="Comments (ALT+5)">
                            Comments
                          </v-btn>
                        </v-btn-toggle>
                      </v-flex>
                    </v-layout>
                  </v-container>

                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>

        </v-layout>
      </v-parallax>
    </div>

    <v-container v-if="user && tab == 0" class="body" grid-list-md>
      <v-layout class="body techstacks" fluid>
        <v-flex v-if="user.techStacks.length > 0" xs12 sm12>
          <v-toolbar dark>
            <v-toolbar-title class="headline white--text">TechStacks created by @{{ user.id }}</v-toolbar-title>
          </v-toolbar>
          <v-card>
            <v-container fluid grid-list-md>
              <v-layout row wrap>
                <v-flex xs3 v-for="techstack in user.techStacks" :key="techstack.id">
                  <v-card flat tile :to="routes.stack(techstack.slug)">
                    <v-card-media
                      :src="techstack.screenshotUrl"
                      height="270px"
                    >
                    </v-card-media>
                    <div class="tile-url">{{ prettifyUrl(techstack.appUrl) }}</div>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
        <v-flex v-else>
           <v-alert color="info" outline :value="true" style="text-align:center">
             has not created any TechStacks yet
           </v-alert>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container v-if="user && tab == 1" class="body" grid-list-md>
      <v-layout row>
        <v-flex v-if="user.favoriteTechnologies.length > 0">

          <v-toolbar>
            <v-toolbar-title class="headline">favorite technologies</v-toolbar-title>
          </v-toolbar>
          <v-card>
            <v-data-table
                :headers="headers"
                :pagination.sync="pagination"
                :items="user.favoriteTechnologies"
                hide-actions
                class="elevation-1 tech-results"
              >
              <template slot="items" slot-scope="props">
                <tr @click="$router.push(`/tech/${props.item.slug}`)">
                  <td class="nowrap">{{ props.item.name }}</td>
                  <td>{{ props.item.description }}</td>
                  <td class="nowrap" style="text-align:center">
                    <img :src="props.item.logoUrl" :alt="props.item.name" style="max-width:220px;max-height:120px;padding:1em 0">
                    <div>{{ props.item.vendorName }}</div>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card>

        </v-flex>
        <v-flex v-else>
           <v-alert color="info" outline :value="true" style="text-align:center">
             has not favorited any Technologies yet
           </v-alert>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container v-if="user && tab == 2" class="body" grid-list-md>
      <v-layout class="body techstacks" fluid>
        <v-flex v-if="user.favoriteTechStacks.length > 0" xs12 sm12>
          <v-toolbar dark>
            <v-toolbar-title class="headline white--text">favorite TechStacks</v-toolbar-title>
          </v-toolbar>
          <v-card>
            <v-container fluid grid-list-md>
              <v-layout row wrap>
                <v-flex xs3 v-for="techstack in user.favoriteTechStacks" :key="techstack.id">
                  <v-card flat tile :to="routes.stack(techstack.slug)">
                    <v-card-media
                      :src="techstack.screenshotUrl"
                      height="270px"
                    >
                    </v-card-media>
                    <div class="tile-url">{{ prettifyUrl(techstack.appUrl) }}</div>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
        <v-flex v-else>
           <v-alert color="info" outline :value="true" style="text-align:center">
             has not favorited any Technologies yet
           </v-alert>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container v-if="posts && tab == 3" class="body" grid-list-md>
      <v-layout class="body" fluid>
        <v-flex v-if="posts.length > 0" xs12 sm12>
          <v-toolbar>
            <v-toolbar-title>posts</v-toolbar-title>
          </v-toolbar>
          <v-card>
            <v-container fluid grid-list-md>
              <v-layout row wrap>

                <v-flex>
                  <v-card flat v-for="(post, index) in posts" :key="post.id" :class="['post', votedClass(post.id)]">
                    <v-card-title>
                        <v-container fluid grid-list-sm >
                            <v-layout row align-center>
                                <v-flex style="max-width:25px">
                                    <span class="rank">{{index + 1}}</span>
                                </v-flex>
                                <v-flex style="max-width:52px">
                                  <v-layout column style="text-align:center">
                                    <v-btn icon class="vote-btn up" :disabled="true">
                                        <v-icon>arrow_drop_up</v-icon>
                                    </v-btn>
                                    <h4 class="votes">{{post.points}}</h4>
                                    <v-btn icon class="vote-btn down" :disabled="true">
                                        <v-icon>arrow_drop_down</v-icon>
                                    </v-btn>
                                </v-layout>
                              </v-flex>
                              <v-flex class="post-body">
                                  <v-layout column>
                                    <nuxt-link v-if="!post.url" class="post-link" :to="routes.post(post.id,post.slug)">{{ post.title }}</nuxt-link>
                                    <a v-if="post.url" class="post-link external" :href="post.url">{{ post.title }}</a>
                                    <div class="post-info">
                                        submitted {{fromNow(post.created)}}

                                      <span v-if="(post.technologyIds || []).length > 0 && technologyTiers.length > 0">
                                        tags
                                        <nuxt-link class="tag" v-for="techId in post.technologyIds" :key="techId"
                                          :to="routes.tech(getTechnologySlug(techId))">
                                          {{ getTechnologySlug(techId) }}
                                        </nuxt-link>
                                      </span>
                                    </div>
                                    <div class="post-actions">
                                        <nuxt-link :to="routes.post(post.id,post.slug)">{{ post.commentsCount || '' }} {{ post.commentsCount > 1 ? 'comments' : 'comment' }}</nuxt-link>
                                    </div>
                                  </v-layout>
                              </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-title>
                  </v-card>
                </v-flex>

              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
        <v-flex v-else>
           <v-alert color="info" outline :value="true" style="text-align:center">
             has not submitted any posts yet
           </v-alert>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container v-if="comments && tab == 4" class="body" grid-list-md>
      <v-layout class="body" fluid>
        <v-flex v-if="comments.length > 0" xs12 sm12>
          <v-toolbar>
            <v-toolbar-title>comments</v-toolbar-title>
          </v-toolbar>

          <div class="comment" v-for="comment in comments" :key="comment.id">
              <v-card class="comment-parent">
                  <v-card-title>
                      <v-layout>
                          <v-flex class="comment-info">
                              <nuxt-link :to="routes.user(comment.createdBy)"><img class="comment-avatar" :src="routes.userAvatar(comment.userId)" :alt="`${comment.createdBy} profile`"></nuxt-link>
                              <div class="comment-karma"><b>{{ getUsersKarma(comment.userId) }}</b></div>
                          </v-flex>
                          <v-flex>
                              <div class="comment-content" v-html="comment.contentHtml"></div>

                              <v-layout :class="['comment-actions', votedCommentClass(comment.id)]">
                                  <span class="points">{{commentKarmaLabel(comment)}}</span>

                                  <nuxt-link :to="routes.comment(comment.postId,comment.id)" class="submitted">{{fromNow(comment.created)}}</nuxt-link>
                              </v-layout>
                          </v-flex>
                      </v-layout>
                  </v-card-title>
              </v-card>
          </div>

        </v-flex>
        <v-flex v-else>
           <v-alert color="info" outline :value="true" style="text-align:center">
             has not submitted any comments yet
           </v-alert>
        </v-flex>
      </v-layout>
    </v-container>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { heroes } from "@servicestack/images";

import { routes } from "~/shared/routes";
import { ignoreKeyPress, prettifyUrl, fromNow } from "~/shared/utils";
import { queryPosts, queryPostComments } from "~/shared/gateway";
import { votedClass, commentKarmaLabel, votedCommentClass } from "~/shared/post";

export default {
  computed: {
    id() {
      return this.$route.params.id;
    },
    heroUrl() {
      return heroes.static(this.id);
    },
    user(){
      return this.getUserInfo(this.id);
    },
    ...mapGetters(['loading','getUserInfo','getTechnologySlug','getUsersKarma','technologyTiers'])
  },

  methods: {

    handleKeyUp(e) {
      if (ignoreKeyPress(e)) return;
      const c = String.fromCharCode(e.keyCode).toLowerCase();
      if (e.altKey) {
        const num = parseInt(c);
        if (num >= 1 && num <= 5) {
          this.tab = num - 1;
        }
      }
    },

    prettifyUrl,
    votedClass,
    commentKarmaLabel,
    votedCommentClass,
    fromNow,
  },

  watch: {
    tab: function(newTab) {
      const query = newTab === 0 ? {} : { tab: newTab };
      this.$router.replace({ query });
    }
  },

  async mounted() {
    this.tab = parseInt(this.$route.query.tab || 0);

    await this.$store.dispatch("getUserInfo", this.id);
    if (!this.$route.query.tab) {
      this.tab = this.user.techStacks.length > 0 ?
          0
        : this.user.favoriteTechnologies.length > 0 ?
          1
        : this.user.favoriteTechStacks.length > 0 ?
          2
        : -1;
    }

    this.posts = (await queryPosts({ userId: this.user.id, orderBy:"-id" })).results;
    this.comments = (await queryPostComments({ userId: this.user.id, orderBy:"-id" })).results;

    window.addEventListener('keyup', this.handleKeyUp);
  },

  destroyed(){
    window.removeEventListener('keyup', this.handleKeyUp);
  },

  data() {
    return {
      routes,
      tab: -1,
      posts: null,
      comments: null,
      pagination: {
        sortBy: null,
        rowsPerPage: -1
      },
      headers: [
        { text: 'Name', align: 'left', value: 'name' },
        { text: 'Description', align: 'left', sortable: false, value: 'description' },
        { text: 'Vendor', align: 'left', value: 'vendorName' }
      ],
    }
  }
};
</script>
