<template>
  <div style="width:100%">

    <div class="hero">
      <v-parallax :src="heroUrl" >
        <v-layout align-center>

          <v-layout column align-center>
            <v-flex
              fluid
              style="min-height: 0"
              grid-list-lg
            >
              <v-card style="max-width:1200px">
                <v-card-title primary-title style="justify-content:center;min-height:250px;min-width:800px">

                  <h2 v-if="!user && loading" class="svg-icon loading">Loading User {{userName}} ...</h2>

                  <h2 v-if="!user && !loading"><v-icon color="red">error_outline</v-icon> User '{{userName}}' was not found</h2>

                  <v-container v-else-if="user" fluid>
                    <v-layout column align-center>
                      <v-flex if="user.avatarUrl">
                        <div class="avatarbox">
                          <img :src="user.avatarUrl">
                        </div>
                      </v-flex>
                      <v-flex>
                        <div class="headline">{{user.userName}}</div>
                      </v-flex>
                      <v-flex xs12 class="py-2" style="margin-top:1em">
                        <v-btn-toggle mandatory v-model="tab">
                          <v-btn>
                            TechStacks Created
                          </v-btn>
                          <v-btn>
                            Favorite Technologies
                          </v-btn>
                          <v-btn>
                            Favorite TechStacks
                          </v-btn>
                          <v-btn>
                            Posts
                          </v-btn>
                          <v-btn>
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
      <v-layout class="body" fluid>
        <v-flex v-if="user.techStacks.length > 0" xs12 sm12>
          <v-toolbar dark>
            <v-toolbar-title class="headline white--text">TechStacks created by @{{ user.userName }}</v-toolbar-title>
          </v-toolbar>
          <v-card>
            <v-container fluid grid-list-md>
              <v-layout row wrap>
                <v-flex xs3 v-for="techstack in user.techStacks" :key="techstack.id">
                  <v-card flat tile :to="`/${techstack.slug}`">
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
             @{{ user.userName }} has not created any TechStacks yet
           </v-alert>
        </v-flex>
      </v-layout>
    </v-container>
    
    <v-container v-if="user && tab == 1" class="body" grid-list-md>
      <v-layout row>
        <v-flex v-if="user.favoriteTechnologies.length > 0">

          <v-toolbar>
            <v-toolbar-title class="headline">@{{ user.userName }} favorite technologies</v-toolbar-title>
          </v-toolbar>
          <v-card>
            <v-data-table
                :headers="headers"
                :pagination.sync="pagination"
                :items="user.favoriteTechnologies"
                hide-actions
                class="elevation-1"
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
             @{{ user.userName }} has not favorited any Technologies yet
           </v-alert>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container v-if="user && tab == 2" class="body" grid-list-md>
      <v-layout class="body" fluid>
        <v-flex v-if="user.favoriteTechStacks.length > 0" xs12 sm12>
          <v-toolbar dark>
            <v-toolbar-title class="headline white--text">@{{ user.userName }} favorite TechStacks</v-toolbar-title>
          </v-toolbar>
          <v-card>
            <v-container fluid grid-list-md>
              <v-layout row wrap>
                <v-flex xs3 v-for="techstack in user.favoriteTechStacks" :key="techstack.id">
                  <v-card flat tile :to="`/${techstack.slug}`">
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
             @{{ user.userName }} has not favorited any Technologies yet
           </v-alert>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container v-if="posts && tab == 3" class="body" grid-list-md>
      <v-layout class="body" fluid>
        <v-flex v-if="posts.length > 0" xs12 sm12>
          <v-toolbar>
            <v-toolbar-title>@{{ user.userName }} posts</v-toolbar-title>
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
                                    <h4 class="votes">{{postKarma(post)}}</h4>
                                    <v-btn icon class="vote-btn down" :disabled="true">
                                        <v-icon>arrow_drop_down</v-icon>
                                    </v-btn>
                                </v-layout>
                              </v-flex>
                              <v-flex class="post-body">
                                  <v-layout column>
                                    <nuxt-link v-if="!post.url" class="post-link" :to="postCommentsLink(post)">{{ post.title }}</nuxt-link>
                                    <a v-if="post.url" class="post-link external" :href="post.url">{{ post.title }}</a>
                                    <div class="post-info">
                                        submitted {{fromNow(post.created)}}

                                      <span v-if="(post.technologyIds || []).length > 0 && technologyTiers.length > 0">
                                        tags
                                        <nuxt-link class="tag" v-for="techId in post.technologyIds" :key="techId" 
                                          :to="`/tech/${getTechnologySlug(techId)}`">
                                          {{ getTechnologySlug(techId) }}
                                        </nuxt-link>
                                      </span>
                                    </div>
                                    <div class="post-actions">
                                        <nuxt-link :to="postCommentsLink(post)">{{ post.commentsCount || '' }} {{ post.commentsCount > 1 ? 'comments' : 'comment' }}</nuxt-link>
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
             @{{ user.userName }} has not submitted any posts yet
           </v-alert>
        </v-flex>
      </v-layout>
    </v-container>
    
    <v-container v-if="comments && tab == 4" class="body" grid-list-md>
      <v-layout class="body" fluid>
        <v-flex v-if="comments.length > 0" xs12 sm12>
          <v-toolbar>
            <v-toolbar-title>@{{ user.userName }} comments</v-toolbar-title>
          </v-toolbar>

          <div class="comment" v-for="comment in comments" :key="comment.id">
              <v-card class="comment-parent">
                  <v-card-title>
                      <v-layout>
                          <v-flex class="comment-info">
                              <nuxt-link :to="`/users/${comment.createdBy}`"><img class="comment-avatar" :src="`/users/${comment.createdBy}/avatar`" :alt="`${comment.createdBy} profile`"></nuxt-link>
                              <div class="comment-karma"><b>{{ getUsersKarma(comment.userId) }}</b></div>
                          </v-flex>
                          <v-flex>
                              <div class="comment-content" v-html="comment.contentHtml"></div>

                              <v-layout :class="['comment-actions', votedCommentClass(comment.id)]">
                                  <span class="points">{{commentKarmaLabel(comment)}}</span>
                                  
                                  <nuxt-link :to="`/comments/${comment.postId}/${comment.id}`" class="submitted">{{fromNow(comment.created)}}</nuxt-link>
                              </v-layout>
                          </v-flex>
                      </v-layout>
                  </v-card-title>
              </v-card>
          </div>  

        </v-flex>
        <v-flex v-else>
           <v-alert color="info" outline :value="true" style="text-align:center">
             @{{ user.userName }} has not submitted any comments yet
           </v-alert>
        </v-flex>
      </v-layout>
    </v-container>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { heroes } from "@servicestack/images";
import { log, prettifyUrl, fromNow } from "~/shared/utils";
import { queryPosts, queryPostComments } from "~/shared/gateway";
import { postKarma, votedClass, postCommentsLink, commentKarmaLabel, votedCommentClass } from "~/shared/post";

export default {  
  computed: {
    userName() {
      return this.$route.params.username;
    },
    heroUrl() { 
      return heroes.static(this.userName); 
    },
    user(){
      return this.getUserInfo(this.userName);
    },
    ...mapGetters(['loading','getUserInfo','getTechnologySlug','getUsersKarma','technologyTiers'])
  },

  methods: {
    prettifyUrl,
    postKarma, 
    votedClass, 
    postCommentsLink,
    commentKarmaLabel,
    votedCommentClass,
    fromNow,
  },
  
  async mounted() {
    this.tab = parseInt(this.$route.query.tab || 0);

    await this.$store.dispatch("getUserInfo", this.userName);
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
  },

  watch: {
    tab: function(newTab) {
      const query = newTab === 0 ? {} : { tab: newTab };
      this.$router.replace({ query });
    }
  },

  data() {
    return {
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
