<template>
<div class="comment">
    <v-card class="comment-parent">
        <v-card-title>
            <v-layout>
                <v-flex class="comment-info">
                    <v-icon v-if="pinned" style="font-size:50px;color:#4caf50;margin-bottom:10px;" title="Pinned Comment">place</v-icon>
                    <nuxt-link :to="routes.user(comment.createdBy)"><img class="comment-avatar" :src="routes.userAvatar(comment.createdBy)" :alt="`${comment.createdBy} profile`"></nuxt-link>
                    <div class="comment-karma"><b>{{ getUsersKarma(comment.userId) }}</b></div>
                </v-flex>
                <v-flex>
                    <div v-if="!editId" class="comment-content" v-html="comment.contentHtml"></div>

                    <div v-if="editId" class="comment-edit">
                        <CommentEdit :post="post" :comment="comment" @done="commentDone"></CommentEdit>
                    </div>

                    <div v-if="replyId" class="comment-reply">
                        <CommentEdit :post="post" :replyId="replyId" @done="commentDone"></CommentEdit>
                    </div>

                    <div v-if="reportCommentId">
                        <ReportDialog :postId="post.id" :commentId="reportCommentId" v-if="reportCommentId" @close="reportCommentId=null"></ReportDialog>
                    </div>

                    <v-layout v-if="!(editId || replyId)" :class="['comment-actions', votedCommentClass(comment.id)]">
                        <div v-if="canVoteComment(post,comment)" class="comment-vote">
                            <a class="vote-comment up" @click="votePostComment(post.id, comment, 1)" title="vote up"></a>
                            <a class="vote-comment down" @click="votePostComment(post.id, comment, -1)" title="vote down"></a>
                        </div>
                        <span class="points">{{commentKarmaLabel(comment)}}</span>
                        
                        <nuxt-link :to="routes.comment(post.id,comment.id)" class="submitted">{{fromNow(comment.created)}}</nuxt-link>

                        <a v-if="!pinned && canReplyComment(post,comment)" @click.prevent="replyId=comment.id">reply</a>
                        <a v-if="canReportComment(post,comment)" @click.prevent="reportCommentId=comment.id">report</a>
                        <a v-if="canUpdateComment(post,comment)" @click.prevent="editId=comment.id">edit</a>
                        <a v-if="!isHidden('pin') && !post.pinCommentId && canPinComment(post,comment)" @click.prevent="pinComment(comment,true)">pin</a>
                        <a v-if="!isHidden('pin') && post.pinCommentId == comment.id && canPinComment(post,comment)"  @click.prevent="pinComment(comment,false)">unpin</a>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-card-title>
    </v-card>
    <div v-if="!pinned" class="comment-children">
        <div class="comment-child" v-for="comment in childComments()" :key="comment.id">
            <post-comment :post="post" :comment="comment" :hide="hide"></post-comment>
        </div>
    </div>
</div>  
</template>

<script>
import { mapGetters } from "vuex";
import CommentEdit from "~/components/CommentEdit.vue";
import ReportDialog from "~/components/ReportDialog.vue";
import { sortComments, canReplyComment, canUpdateComment, canReportComment, canPinComment, canVoteComment, votedCommentClass, commentKarmaLabel, votePostComment } from "~/shared/post";
import { routes } from "~/shared/routes";
import { fromNow } from "~/shared/utils";

export default {
  components: { CommentEdit, ReportDialog },
  name: "post-comment",
  props: ['post', 'comment', 'pinned', 'hide'],

  computed: {
    ...mapGetters(["getUsersKarma", "userId", "userPostCommentVotes"])
  },

  methods: {
    isHidden(name) {
        return this.hide && this.hide.indexOf(name) >= 0;
    },
    commentDone(changed) {
      this.replyId = this.editId = null;
      if (changed) {
        this.$store.dispatch("loadPost", this.post.id);
      }
    },

    childComments() {
      return sortComments(this.post.comments.filter(x => x.replyId === this.comment.id));
    },

    pinComment(comment, pin) {
      return this.$store.dispatch('pinPostComment', { postId: this.post.id, commentId:comment.id, pin });
    },

    canReplyComment,
    canUpdateComment,
    canReportComment,
    canPinComment,
    canVoteComment,
    votedCommentClass,
    commentKarmaLabel, 
    votePostComment,
    fromNow,
  },

  data: () => ({
    routes,
    replyId: null,
    reportCommentId: null,
    editId: null,
  }),
}
</script>
