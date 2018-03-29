<template>

    <v-card class="post-edit" :flat="edit" :class="{ edit:edit, add:!edit }">
        <v-card-title primary-title>
        <v-form v-model="valid" ref="form" lazy-validation style="width:100%">
            <v-container>
            <v-alert outline color="error" icon="warning" :value="errorResponse()">{{ errorResponse() }}</v-alert>                  
            <v-layout>
                <v-flex xs8>
                    <v-select ref="type"
                        label="Type"
                        :items="allowablePostTypeSelectItems"
                        v-model="type"
                        ></v-select>

                    <v-text-field ref="title"
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

                    <Editor 
                        label=""
                        v-model="content"
                        :counter="contentCounter"
                        :rules="contentRules"
                        :error-messages="errorResponse('content')"
                        :lang="getLangByOrganizationId(organizationId)"
                        @save="submit"
                        @close="reset()"
                        />

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
                        :error-messages="errorResponse('technologyIds')"
                        ></v-select>

                    <div v-if="isOrganizationModerator" class="moderator-section">
                        <span>moderators section</span>

                        <v-select
                            label="Labels"
                            multiple
                            chips
                            :items="labelsSelectItems"
                            v-model="labels"
                            :error-messages="errorResponse('labels')"
                            ></v-select>

                        <div v-if="org && labelsSelectItems.length <= 2" style="text-align:center">
                            Add more post labels for the <nuxt-link :to="routes.organization(org.slug)">{{ org.name }} Organization</nuxt-link>
                        </div>

                        <v-flex v-if="edit" style="text-align:right">
                            <v-layout>
                                <v-btn small @click="lockPost(!locked)" class="white--text" :color="locked ? 'green' : 'red'">
                                    {{ locked ? 'Unlock' : 'Lock' }}
                                </v-btn>
                                <span v-if="lockedBy" style="line-height:40px;padding-right:10px;color:#999">locked By @{{lockedBy}}</span>

                                <v-btn small @click="hidePost(!hidden)" class="white--text" :color="hidden ? 'green' : 'red'">
                                    {{ hidden ? 'Un-hide' : 'Hide' }}
                                </v-btn>
                                <span v-if="hiddenBy" style="line-height:40px;padding-right:10px;color:#999">hidden By @{{hiddenBy}}</span>
                            </v-layout>
                        </v-flex>
                    </div>
                </v-flex>

            </v-layout>
            </v-container>
        </v-form>

    </v-card-title>
    <v-card-actions>
      <v-layout>
        <v-btn v-if="edit" @click="reset(false)" title="Close (ESC)">
          Close
        </v-btn>
        <v-btn @click="submit" :disabled="!valid || loading" color="primary" title="Save (S)">
          Submit
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
import Editor from "~/components/Editor.vue";

import { mapGetters } from "vuex";
import { toObject, errorResponse } from "@servicestack/client";
import { createPost, updatePost, deletePost, lockPost, hidePost } from "~/shared/gateway";
import { ignoreKeyPress, titleCounter, titleRules, urlCounter, urlRulesOptional, contentCounter, contentRules } from "~/shared/utils";
import { canUpdatePost } from "~/shared/post";
import { routes } from "~/shared/routes";

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
    hidden: null,
    hiddenBy: null,
    technologyIds: [],
    labels: [],
};

export default {
  components: { FileInput, Editor },

  props: [
    'org','initialTypes','initialCategoryId', //add
    'post'                                    //edit
  ],

  computed: {
    edit(){
      return !!this.post;
    },
    ...mapGetters(["loading", "isAuthenticated", "isOrganizationModerator", "allowablePostTypes", "getLangByOrganizationId",
                   "allowablePostTypeSelectItems", "technologySelectItems", "categorySelectItems", "labelsSelectItems"])
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

    async hidePost(hide) {
        await hidePost(this.post.id, hide);
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
    
    handleKeyUp(e) {
      if (ignoreKeyPress(e)) return;
      const c = String.fromCharCode(e.keyCode).toLowerCase();
      if (e.key === "Escape" || e.keyCode === 27) {
        this.reset();
      }
      else if (c === 's') {
        this.submit();
        return false;
      }
    },

    canUpdatePost,
    errorResponse,
  },

  async mounted() {
    const defaultPostType = this.org && this.org.defaultPostType || 'Post';
    const types = [...(this.initialTypes || '').split(','), defaultPostType];
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
    
    window.addEventListener('keyup', this.handleKeyUp);
  },

  destroyed(){
    window.removeEventListener('keyup', this.handleKeyUp);
  },

  data: () => ({
    routes,
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
