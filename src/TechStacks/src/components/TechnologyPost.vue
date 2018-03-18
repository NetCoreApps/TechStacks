<template>

  <v-layout column align-center v-if="tech && isAuthenticated">
    <v-flex v-if="organizationId" style="min-height:92px">
      <div v-if="latestPost">
        <blockquote class="post-quote">
          <nuxt-link :to="routes.post(latestPost.id,latestPost.slug)">{{ latestPost.title }}</nuxt-link>
          <cite v-if="organizationSlug">
            <nuxt-link :to="routes.organizationNews(organizationSlug,{types:type})">more {{ type }}s</nuxt-link>
          </cite>
        </blockquote>
      </div>
      <div v-else>
          <blockquote class="post-quote">
            <nuxt-link :to="routes.organizationNews(organizationSlug)">{{ tech.name }} {{ type }}s</nuxt-link>
          </blockquote>
      </div>
    </v-flex>
    <v-flex v-else-if="!add" style="text-align:center">
      <v-btn color="primary" @click="add=true">Post {{ type }}</v-btn>
    </v-flex>
    <v-flex v-else>
      <v-card class="post-announcement">
        <v-card-title>
          <v-form v-model="valid" ref="form" lazy-validation style="width:100%">
            <v-container>
              <v-alert outline color="error" icon="warning" :value="errorSummary">{{ errorSummary }}</v-alert>                  
              <v-layout>
                <v-flex>

                  <v-text-field
                      label="Title"
                      v-model="title"
                      required
                      :rules="titleRules"
                      :counter="titleCounter"
                      :autofocus="true"
                      :error-messages="errorResponse('title')"
                      ></v-text-field>

                  <Editor 
                      label=""
                      v-model="content"
                      :counter="contentCounter"
                      :rules="contentRules"
                      :error-messages="errorResponse('content')"
                      @save="submit"
                      @close="reset(false)"
                      />

                  <v-text-field
                      label="URL"
                      v-model="url"
                      :spellcheck="false"
                      :rules="urlRulesOptional"
                      :counter="urlCounter"
                      :error-messages="errorResponse('url')"
                      ></v-text-field>

                </v-flex>
              </v-layout>
              </v-container>
            </v-form>
        </v-card-title>

        <v-card-actions>
          <v-layout column align-center>
            <v-flex>
              <v-btn flat large @click="submit" :disabled="!valid || loading">
                  Submit
              </v-btn>
              <v-btn flat large @click="reset(false)">
                  Close
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>

    </v-flex>
  </v-layout>
</template>

<script>
import Editor from "~/components/Editor.vue";

import { mapGetters } from "vuex";
import { toObject, errorResponse, errorResponseExcept } from "@servicestack/client";
import { routes } from "~/shared/routes";
import { createOrganizationForTechnology, createOrganizationForTechStack, createPost, queryLatestOrganizationsPosts } from "~/shared/gateway";
import { titleRules, titleCounter, contentRules, contentCounter, urlRulesOptional, urlCounter } from "~/shared/utils";

const post = {
  title: "",
  content: "",
  url: "",
};

export default {
  components: { Editor },
  props: ["type", "technology", "techstack"],
  computed: {
    errorSummary(){
      return errorResponseExcept.call(this, Object.keys(post));
    },
    tech(){
      return this.technology || this.techstack;
    },
    organizationSlug(){
      return this.organization && this.organization.slug;
    },
    ...mapGetters(["loading", "isAuthenticated", "organization"])
  },

  methods: {
    async loadOrganization(){
      this.organizationId = this.tech && this.tech.organizationId;
      if (this.organizationId) {
        await this.$store.dispatch('loadOrganizationByIdIfNotExists', this.tech.organizationId);
        await this.loadLatestPost();
      }
    },
    async loadLatestPost(){
      const response = await queryLatestOrganizationsPosts(this.organizationId, this.type, null, 0, 1);
      this.latestPost = response[0];
    },

    reset(changed){
      this.title = this.content = this.url = null;
      this.add = false;
    },

    async submit() {
      if (this.$refs.form.validate()) {
        try {
          this.$store.commit('loading', true);

          if (this.organizationId == null){
            const orgResponse = this.technology
              ? await createOrganizationForTechnology(this.technology.id)
              : await createOrganizationForTechStack(this.techstack.id);
            
            this.organizationId = orgResponse.organizationId;
            this.$store.dispatch('loadOrganizationBySlugIfNotExists', orgResponse.organizationSlug);
            this.$store.commit('latestOrganizationPostsQuery', null);
            this.$emit('organizationCreated', orgResponse);
          }

          const fields = toObject.call(this, Object.keys(post));
          fields.organizationId = this.organizationId;
          fields.type = this.type;
          fields.refId = this.tech.id;
          fields.refSource = this.technology ? 'Technology' : 'TechnologyStack';
          fields.refUrn = `urn:${fields.refSource}:${fields.refId}`;

          const response = await createPost(fields);

          this.reset(true);
          await this.loadLatestPost();

        } catch(e) {
            this.responseStatus = e.responseStatus || e;
        } finally {
            this.$store.commit('loading', false);
        }
      }
    },

    errorResponse,
  },

  watch: {
    async tech(v){
      await this.loadOrganization();
    },
  },

  async mounted() {
    await this.loadOrganization();
  },

  data: () => ({
    routes,
    ...post,
    organizationId: null,
    add: false,
    valid: true,
    responseStatus: null,
    latestPost: null,
    titleRules, titleCounter, contentRules, contentCounter, urlRulesOptional, urlCounter,
  })
};
</script>

<style>
.post-announcement {
  width: 750px;
}

blockquote.post-quote {
  font-family: Georgia, serif;
  font-size: 18px;
  font-style: italic;
  max-width: 1000px;
  margin: 0;
  padding: 0.4em 20px 0.4em 50px;
  line-height: 1.45;
  position: relative;
  color: #383838;
  border: none;
  background: none;
}
blockquote.post-quote a {
  color: #383838;
}

blockquote.post-quote:before {
  display: block;
  padding-left: 0;
  content: "\201C";
  font-size: 80px;
  position: absolute;
  left: 0;
  top: -20px;
  color: #7a7a7a;
}

blockquote.post-quote cite {
  color: #999999;
  font-size: 14px;
  display: block;
  margin-top: 5px;
  text-transform: lowercase;
}
 
blockquote.post-quote cite:before {
  content: "\2014 \2009";
}
</style>
