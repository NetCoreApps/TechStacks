<template>
    <v-dialog v-model="open" max-width="700px">
        <v-card>
        <v-card-title>
            Please tell us what's wrong with this post?
        </v-card-title>
        <v-card-text>
            <v-form v-model="valid" ref="form" lazy-validation style="padding:0 0 0 2em">
                <v-alert outline color="error" icon="warning" :value="errorResponse()">{{ errorResponse() }}</v-alert>                  
                <v-radio-group v-model="type"
                    :rules="[v => !!v || 'Required']"
                    :error-messages="errorResponse('type')"
                    >
                    <v-radio
                        v-for="flagType in flagTypeSelectItems"
                        :key="flagType.text"
                        :label="flagType.text"
                        :value="flagType.value"
                    ></v-radio>
                </v-radio-group>

                <v-text-field
                    label="Notes"
                    v-model="notes"
                    :counter="400"
                    multi-line
                    :rows="3"
                    :error-messages="errorResponse('notes')"
                    ></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-layout>
                <v-flex style="text-align:center">
                <v-btn flat @click.stop="close">Close</v-btn>
                <v-btn flat large @click="submit" :disabled="!valid" color="primary">
                    Submit
                </v-btn>
                </v-flex>
            </v-layout>
        </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { errorResponse } from "@servicestack/client";
import { reportPost, reportPostComment } from "~/shared/gateway";

export default {
  props: {
    postId: {
      type:Number
    },
    commentId: {
      type:Number
    },
  },

  computed: mapGetters(["flagTypeSelectItems"]),

  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
          try {
              this.$store.commit('loading', true);
              if (this.postId) {
                  await reportPost(this.postId, this.type, this.notes);
              } else if (this.commentId) {
                  await reportPostComment(this.postId, this.commentId, this.type, this.notes);
              }
              this.type = this.notes = null;
              this.close();
          } catch(e) {
              this.responseStatus = e.responseStatus || e;
          } finally {
              this.$store.commit('loading', false);
          }
      }
    },

    close: function () {
        this.$emit('close');
    },
        
    errorResponse,
  },

  mounted() {
  },

  data: () => ({
      open: true,
      valid: false,
      type: null,
      notes: null,
  })

};
</script>

