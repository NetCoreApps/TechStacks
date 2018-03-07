<template>
  <v-card flat>
    <v-card-title>New Organization</v-card-title>
    <v-form v-model="valid" ref="form" lazy-validation class="organization-add">
      <v-container>
        <v-alert outline color="error" icon="warning" :value="errorSummary">{{ errorSummary }}</v-alert>                  
        <v-layout column>

          <v-text-field
              label="Name"
              v-model="name"
              required                        
              :rules="nameRules"
              :counter="nameCounter"
              :error-messages="errorResponse('name')"
              ></v-text-field>

          <v-text-field
              label="Slug"
              v-model="slug"
              required
              :rules="slugRules"
              :counter="slugCounter"
              :error-messages="errorResponse('slug')"
              ></v-text-field>

          <v-text-field
            label="Summary"
            v-model="description"
            :counter="summaryCounter"
            multi-line
            :rows="3"
            :rules="summaryRulesOptional"
            :error-messages="errorResponse('description')"
            ></v-text-field>

        </v-layout>
      </v-container>              
    </v-form>
    <v-card-actions>
      <v-flex>
      <v-btn @click="reset()">Close</v-btn>
      </v-flex>
      <v-flex style="text-align:right">
        <v-btn color="primary" @click="submit" :disabled="!valid || loading">Create Organization</v-btn>
      </v-flex>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import { toObject, errorResponse, errorResponseExcept } from "@servicestack/client";
import { createOrganization } from "~/shared/gateway";
import { nameCounter, nameRules, slugCounter, slugRules, toSlug, summaryCounter, summaryRulesOptional } from "~/shared/utils";

const organization = {
  id: null,
  name: "",
  slug: "",
  description: "",
};

export default {
  computed: {
    errorSummary(){ 
      return errorResponseExcept.call(this,Object.keys(organization));
    },
    ...mapGetters(["loading", "isAuthenticated"])
  },

  watch: {
    name(name) {
      this.slug = toSlug(name);
    }
  },

  methods: {
    reset(createdSlug){
        this.responseStatus = this.id = this.name = this.slug = this.description = null;
        this.valid = true;
        this.$emit('done', createdSlug);
    },

    async submit() {
      if (this.$refs.form.validate()) {
          try {
            this.$store.commit('loading', true);
            
            const response = await createOrganization(this.name, this.slug, this.description);

            this.reset(response.slug);

          } catch(e) {
              this.responseStatus = e.responseStatus || e;
          } finally {
              this.$store.commit('loading', false);
          }
      }
    },

    errorResponse,
  },

  data: () => ({
    ...organization,
    valid: true,
    nameCounter, nameRules, slugCounter, slugRules, summaryCounter, summaryRulesOptional,
    responseStatus: null,
  }),

}
</script>

<style>
.organization-add {
 min-width: 500px;
}
</style>
