<template>
    <v-form v-model="valid" ref="form" lazy-validation>
        <v-card :flat="!!comment" style="margin-top:.5em;">
            <v-card-text style="padding-top:0">
                <v-alert outline color="error" icon="warning" :value="errorMessage()">{{ errorMessage() }}</v-alert>                  

                    <Editor ref="editor"
                        style="padding-top:10px"
                        label="Comment"
                        v-model="content"
                        :rows="commentRows"
                        :counter="contentCounter"
                        :rules="contentRulesOptional"
                        :error-messages="errorResponse('content')"
                        :lang="getLangByOrganizationId(post.organizationId)"
                        @save="submit"
                        />

            </v-card-text>
            <v-card-actions>
                <v-layout>
                    <v-btn flat @click="submit">Submit</v-btn>
                    <v-btn v-if="replyId || comment" flat @click="reset(false)">Close</v-btn>
                </v-layout>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script>
import Editor from "~/components/Editor.vue";
import { errorResponse } from "@servicestack/client";
import { mapGetters } from "vuex";
import { createPostComment, updatePostComment } from "~/shared/gateway";
import { contentCounter, contentRulesOptional } from "~/shared/utils";

const comment = {
    postId: null,
    content: null
};

export default {
    components: { Editor },
    props: ['post', 'comment', 'replyId', 'rows'],

    computed: {
        ...mapGetters(['getLangByOrganizationId'])
    },

    methods: {
        errorMessage() {
            return this.errorResponse() || this.errorResponse('postId');
        },
        reset(added){
            this.responseStatus = this.content = null;
            this.valid = true;
            this.$emit('done', added);
        },

        async submit() {
            if (this.$refs.form.validate()) {
                try {
                    this.$store.commit('loading', true);
                    
                    const response = this.comment != null
                        ? await updatePostComment(this.comment.id, this.post.id, this.content)
                        : await createPostComment(this.postId, this.content, this.replyId);

                    this.reset(true);

                } catch(e) {
                    this.valid = false;
                    this.responseStatus = e.responseStatus || e;
                } finally {
                    this.$store.commit('loading', false);
                }
            }
        },
        
        errorResponse,
    },

    mounted() {
        if (this.rows) {
            this.commentRows = this.rows;
        }
        if (this.post) {
            this.postId = this.post.id;
        }
        if (this.comment) {
            this.content = this.comment.content;
        }
    },

    data: () => ({
        ...comment,
        commentRows: 6,
        valid: true,
        allowDelete: false,
        contentCounter, contentRulesOptional,
        responseStatus: null,
    }),
}
</script>
