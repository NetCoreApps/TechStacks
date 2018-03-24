<template>
<div>

  <div v-if="post" class="post-page no-prerender">
      <v-layout @click="handleCtrlClick">
          <v-card :class="['post', votedClass(post.id), { deleted: post.deleted }]">
              <v-card-title>
                  <v-container fluid grid-list-sm>
                      <v-layout row>
                          <v-flex class="page-votes" style="max-width:52px">
                              <v-layout column style="text-align:center">
                                <v-btn icon class="vote-btn up" @click="votePost(post,1)" :disabled="!canVotePost(post)">
                                  <v-icon>arrow_drop_up</v-icon>
                                </v-btn>
                                <h4 class="votes">{{ post.points }}</h4>
                                <v-btn icon class="vote-btn down" @click="votePost(post,-1)" :disabled="!canVotePost(post)">
                                  <v-icon>arrow_drop_down</v-icon>
                                </v-btn>
                              </v-layout>                                        
                          </v-flex>

                          <v-flex class="post-body">
                            <v-layout column>
                              <h2 v-if="!post.url" class="post-title">{{ post.title }}</h2>

                              <a v-if="post.url" class="post-title post-link external" :href="post.url">{{ post.title }}</a>

                              <PostInfo :organization="organization" :post="post"/>

                              <div v-if="!edit">
                                <div class="post-image" v-if="post.imageUrl">
                                  <a :href="post.url || post.imageUrl"><img :src="post.imageUrl" alt="post image"></a>
                                </div>
                                <div v-if="post.contentHtml" class="post-content details-html">
                                  <div v-html="post.contentHtml"></div>
                                  <div class="continue" v-if="post.url">
                                    <a :href="post.url">continue reading</a>
                                  </div>
                                </div>

                                <div class="post-actions">
                                    <a v-if="canFavoritePost(post)" @click="favoritePost(post)" title="Favorite Post (F)">{{ favoriteLabel(post) }}</a>
                                    <a v-if="canReportPost(post)" @click="reportPostId=post.id" title="Report Post (P)">report</a>
                                    <a v-if="canUpdatePost(post)" @click="edit=true" title="Edit Post (E)">edit</a>
                                </div>
                              </div>
                              <div v-else>
                                <PostEdit :post="post" @done="postDone"></PostEdit>
                              </div>

                            </v-layout>
                          </v-flex>

                      </v-layout>
                  </v-container>
              </v-card-title>
          </v-card>
      </v-layout>
  
    <v-layout column>

        <PostAlerts :organization="organization" :post="post"></PostAlerts>

        <v-flex class="post-features">

            <div v-if="pinnedComment" style="margin-bottom:15px">
              <PostComment :post="post" :comment="pinnedComment" :pinned="true" @votePostCommentDone="votePostDone"></PostComment>
            </div>

            <h2 v-if="post.comments.length > 1" class="comments-title">All {{post.comments.length || ''}} comments</h2>
            <h2 v-else class="comments-title">{{ post.comments.length == 1 ? '1 Comment' : 'No Comments' }}</h2>

            <CommentEdit ref="txtComment" v-if="canCommentPost(post)" :post="post" @done="commentDone"></CommentEdit>    
            
            <div v-if="!isAuthenticated">Please Sign In to comment</div>

        </v-flex>
        <v-flex class="post-comments">
            <PostComment v-for="comment in parentComments" :key="comment.id" :post="post" :comment="comment" @votePostCommentDone="votePostDone"></PostComment>
        </v-flex>
    </v-layout>

    <ReportDialog :postId="reportPostId" v-if="reportPostId" @close="reportPostId=null"></ReportDialog>
  </div>
  
  <h2 v-if="notFound"><v-icon color="red">error_outline</v-icon> Post was not found</h2>

</div>
</template>

<script>
import ReportDialog from "~/components/ReportDialog.vue";
import PostEdit from "~/components/PostEdit.vue";
import PostComment from "~/components/PostComment.vue";
import CommentEdit from "~/components/CommentEdit.vue";
import PostAlerts from "~/components/PostAlerts.vue";
import PostInfo from "~/components/PostInfo.vue";
import DebugInfo from "~/components/DebugInfo.vue";

import { mapGetters } from "vuex";
import {
  ignoreKeyPress,
  titleCounter,
  titleRules,
  urlCounter,
  urlRulesOptional,
  contentCounter,
  contentRules,
  fromNow,
} from "~/shared/utils";
import { postKarma, sortComments, canUpdatePost, canFavoritePost, canReportPost, canCommentPost, organizationMember,
         favoritePost, favoriteLabel, votedClass, votePost, votePostComment, votedCommentClass, canVotePost } from "~/shared/post";
import { errorResponse, splitOnFirst, combinePaths } from "@servicestack/client";

const post = {
  id: null,
  userId: null,
  title: null,
  url: null,
  imageUrl: null,
  content: null,
  contentHtml: null,
  createdBy: null
};

export default {
  components: { ReportDialog, PostEdit, PostComment, CommentEdit, PostAlerts, PostInfo, DebugInfo },

  props: {
    postId: {
      type: Number
    },
  },

  computed: {
    post(){
      return this.getPost(this.postId);
    },
    parentComments() {
        return sortComments(this.post.comments.filter(x => x.replyId == null));
    },
    pinnedComment() {
      if (!this.post || !this.post.pinCommentId || !this.post.comments)
        return null;
      return this.post.comments.find(x => x.id === this.post.pinCommentId);
    },
    ...mapGetters(["loading", "isAuthenticated", "organization", "getPost"])
  },

  methods: {
    async commentDone(changed){
      if (changed) {
        await this.loadPost();
      }
    },
    async loadPost() {
      try {
          await this.$store.dispatch("loadPost", this.postId);
          if (this.post) {
            Object.assign(this, this.post);
            await this.$store.dispatch('loadOrganizationByIdIfNotExists', this.post.organizationId);
          }
      } catch(e) {
        this.notFound = true;
      }
    },
    async postDone(changed,deleted){
      this.edit = false;
      if (changed) {
        this.loadPost();
      }
    },
    async votePostDone(id){
      await this.loadPost();
    },
    
    handleCtrlClick(e){
        if (!this.edit && e.ctrlKey && this.canUpdatePost(this.post)) {
            this.edit = true;
        }
    },

    handleKeyUp(e) {
      if (ignoreKeyPress(e)) return;
      const c = String.fromCharCode(e.keyCode).toLowerCase();
      if (e.key === "Escape" || e.keyCode === 27) {
        this.edit = false;
        this.reportPostId = null;
      }
      else if (c === 'e' && this.canUpdatePost(this.post)) {
        this.edit = true;
      }
      else if (c === 'f' && this.canFavoritePost(this.post)) {
        this.favoritePost(this.post);
      }
      else if (c === 'p' && this.canReportPost(this.post)) {
        this.reportPostId=this.post.id
      }      
      else if (c === 'c' && this.canCommentPost(this.post)) {
        const $txt = this.$refs.txtComment.$refs.editor.$refs.txt;
        $txt.focus();
        this.$refs.txtComment.$el.scrollIntoView();
      }      
    },

    postKarma, 
    organizationMember,
    canUpdatePost, 
    canFavoritePost,
    canReportPost, 
    canCommentPost, 
    votedClass, 
    votePost, 
    favoritePost, 
    favoriteLabel, 
    votePostComment, 
    votedCommentClass, 
    canVotePost,
    fromNow,
    errorResponse,
  },

  async mounted() {
    const task = this.loadPost();
    this.$store.dispatch('loadUserPostActivity');
    this.$store.dispatch('loadUserPostCommentVotes', this.postId);
    this.$store.dispatch('loadTechnologyTiers');

    this.$on(['votePostCommentDone','votePostDone'], (id) => {
      this.votePostDone(id)
    })

    await task;
    window.addEventListener('keyup', this.handleKeyUp);
  },

  destroyed(){
    window.removeEventListener('keyup', this.handleKeyUp);
  },

  data: () => ({
    valid: true,
    edit: false,
    notFound: false,
    allowDelete: false,
    reportPostId: null,
    ...post,
  })
};
</script>

<style>
.continue::before {
  content: "..."
}
.continue {
  margin-top: 1em;
  font-size: 16px;
}
.post-features textarea
{
  min-height: 223px; /* fixes autoscroll issue in Chrome/Opera: https://github.com/vuetifyjs/vuetify/issues/3082#issuecomment-373969674 */
}
</style>
