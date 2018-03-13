<template>

    <v-card class="post-edit" :flat="edit" :class="{ edit:edit, add:!edit }">
        <v-card-title primary-title>
        <v-form v-model="valid" ref="form" lazy-validation style="width:100%">
            <v-container>
            <v-alert outline color="error" icon="warning" :value="errorResponse()">{{ errorResponse() }}</v-alert>                  
            <v-layout>
                <v-flex xs8>
                    <v-select
                        label="Type"
                        :items="allowablePostTypeSelectItems"
                        v-model="type"
                        ></v-select>

                    <v-text-field
                        label="Title"
                        v-model="title"
                        required
                        :rules="titleRules"
                        :counter="titleCounter"
                        :error-messages="errorResponse('title')"
                        ></v-text-field>

                </v-flex>
                <v-flex xs4 class="image-upload" style="text-align:right">
                    <v-layout>
                        <v-alert outline color="error" icon="warning" :value="errorResponse('imageUrl')">{{ errorResponse('imageUrl') }}</v-alert>
                    </v-layout>
                    <small style="color:#999">(minimum 500 x 500)</small>
                    <file-input :value="imageUrl" accept="image/*" @input="onFileChange" ref="fileIcon" selectLabel="Add Image"></file-input>
                </v-flex>
            </v-layout>
            <v-layout>

                <v-flex>
                    <v-text-field
                        label="URL"
                        v-model="url"
                        :spellcheck="false"
                        :rules="urlRulesOptional"
                        :counter="urlCounter"
                        :error-messages="errorResponse('url')"
                        ></v-text-field>

                    <v-text-field
                        label="Text (markdown)"
                        v-model="content"
                        :counter="contentCounter"
                        multi-line
                        auto-grow
                        :rows="6"
                        :rules="contentRules"
                        :error-messages="errorResponse('content')"
                        ></v-text-field>

                    <a class="help-fmt" v-if="valid" target="_blank" href="https://guides.github.com/features/mastering-markdown/">formatting help</a>

                    <v-select v-if="categorySelectItems.length > 0"
                        label="Category"
                        autocomplete
                        :items="categorySelectItems"
                        v-model="categoryId"
                        ></v-select>

                    <v-select
                        label="Technologies (optional, 5 max)"
                        autocomplete
                        multiple
                        chips
                        :items="technologySelectItems"
                        :rules="[v => !v || v.length <= 5 || 'Maximum exceeded']"
                        v-model="technologyIds"
                        ></v-select>

                    <v-flex v-if="edit && isOrganizationModerator" style="text-align:right">
                        <v-layout>
                            <v-btn small @click="lockPost(!locked)" class="white--text" :color="locked ? 'green' : 'red'">
                                {{ locked ? 'Unlock' : 'Lock' }}
                            </v-btn>
                            <span v-if="lockedBy" style="line-height:40px;padding-right:10px;color:#999">locked By @{{lockedBy}}</span>
                        </v-layout>
                    </v-flex>
                </v-flex>

            </v-layout>
            </v-container>
        </v-form>

    </v-card-title>
    <v-card-actions>
      <v-layout>
        <v-btn @click="submit" :disabled="!valid || loading" color="primary">
            Submit
        </v-btn>
        <v-btn v-if="edit" @click="reset(false)">
            Close
        </v-btn>

        <v-spacer></v-spacer>

        <v-flex v-if="post && canUpdatePost(post)" style="max-width:200px; text-align:right">
            <v-layout>
                <v-checkbox style="width:100px" label="confirm" v-model="allowDelete"></v-checkbox>
                <v-btn @click="deletePost" :disabled="!allowDelete" color="red" class="white--text">Delete</v-btn>
            </v-layout>
        </v-flex>
      </v-layout>
    </v-card-actions>
    </v-card>
</template>

<script>
import FileInput from "~/components/FileInput.vue";
import { mapGetters } from "vuex";
import { toObject, errorResponse } from "@servicestack/client";
import { createPost, updatePost, deletePost, lockPost } from "~/shared/gateway";
import { titleCounter, titleRules, urlCounter, urlRulesOptional, contentCounter, contentRules } from "~/shared/utils";
import { canUpdatePost } from "~/shared/post";

const post = {
    organizationId: null,
    categoryId: null,
    type: null,
    title: null,
    url: null,
    imageUrl: null,
    content: null,
    locked: null,
    lockedBy: null,
    technologyIds: [],
};

export default {
  components: { FileInput },

  props: [
    'org','initialTypes','initialCategoryId', //add
    'post'                                   //edit
  ],

  computed: {
    edit(){
      return !!this.post;
    },
    ...mapGetters(["loading", "isAuthenticated", "isOrganizationModerator", "allowablePostTypes",
                   "allowablePostTypeSelectItems", "technologySelectItems", "categorySelectItems"])
  },

  methods: {

    onFileChange(imgFile) {
        this.image = imgFile;
    },

    reset(changed, deleted) {
        this.responseStatus = this.title = this.content = this.url = this.imageUrl = this.image = null;
        this.technologyIds = [];
        this.$emit('done', changed, deleted);
    },

    async lockPost(lock) {
        await lockPost(this.post.id, lock);
        this.reset(true, true);
    },

    async deletePost(){
        await deletePost(this.post.id);
        this.reset(true, true);
    },

    async submit() {
      if (this.$refs.form.validate()) {
          try {
            this.$store.commit('loading', true);
            const fields = toObject.call(this, Object.keys(post));

            const response = this.edit
              ? await updatePost({ ...fields, id:this.post.id }, this.image)
              : await createPost(fields, this.image);

            this.reset(true);

          } catch(e) {
              this.responseStatus = e.responseStatus || e;
          } finally {
              this.$store.commit('loading', false);
          }
      }
    },
    
    canUpdatePost,
    errorResponse,
  },

  async mounted() {
    const types = [...(this.initialTypes || '').split(','), 'Post'];
    this.type = types.filter(x => x && this.allowablePostTypes.indexOf(x) >= 0)[0];

    if (this.initialCategoryId)
      this.categoryId = this.initialCategoryId;
    
    this.$store.dispatch('loadTechnologyTiers');

    if (this.org) {
      this.organizationId = this.org.id;
    }
    if (this.post) {
      Object.assign(this, this.post);
    }
  },

  data: () => ({
    valid: true,
    allowDelete: false,
    disposing: false,
    titleCounter,
    titleRules,
    urlCounter,
    urlRulesOptional,
    contentCounter,
    contentRules,
    ...post,
    image: null,
  })
};
</script>
