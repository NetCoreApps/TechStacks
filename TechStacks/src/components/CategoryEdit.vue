<template>
  <div style="margin-bottom:1em">
      <v-layout>
          <v-card>
            <v-card-title>
              <v-form v-model="valid" ref="form" lazy-validation style="width:700px">
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
                      :rows="2"
                      :rules="summaryRulesOptional"
                      :error-messages="errorResponse('description')"
                      ></v-text-field>

                    <v-select
                      label="Select Technologies"
                      autocomplete
                      :loading="loading"
                      multiple
                      chips
                      :error-messages="errorResponse('technologyIds')"
                      :items="technologySelectItems"
                      v-model="technologyIds"
                      ></v-select>

                  </v-layout>
                </v-container>              
              </v-form>
            </v-card-title>
            <v-card-actions style="text-align:center">
              <v-layout>
                  <v-flex xs2>
                    <v-btn small @click="submit" color="primary" :disabled="!valid || loading">{{ category ? 'Update' : 'Add' }}</v-btn>
                  </v-flex>
                  <v-flex xs2>
                    <v-btn small @click="reset()">Close</v-btn>
                  </v-flex>
                  <v-flex xs4></v-flex>
                  <v-flex>
                    <v-layout style="width:200px">
                      <v-checkbox small label="confirm" v-model="allowDelete"></v-checkbox>
                      <v-btn small @click="remove" :disabled="!allowDelete" color="red" class="white--text">
                          Delete
                      </v-btn>                    
                    </v-layout>
                  </v-flex>
              </v-layout>
            </v-card-actions>
          </v-card>
      </v-layout>
      
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { toObject, errorResponse, errorResponseExcept } from "@servicestack/client";
import { addCategory, updateCategory, deleteCategory } from "~/shared/gateway";
import { toSlug, nameCounter, nameRules, slugCounter, slugRules, summaryCounter, summaryRulesOptional } from "~/shared/utils";

const category = {
  organizationId: null,
  id: null,
  name: "",
  slug: "",
  description: "",
  technologyIds: [],
};

export default {
  props: ['orgId','category'],
  computed: {
    errorSummary(){ 
      return errorResponseExcept.call(this,'name,slug,description,technologyIds'.split(','));
    },
    isUpdate(){
        return this.category != null;
    },
    ...mapGetters(["loading", "isAuthenticated", "isAdmin", "user", "technologySelectItems"])
  },

  watch: {
    name(name) {
      if (!this.isUpdate) {
        this.slug = toSlug(name);
      }
    }
  },

  methods: {

    reset(changed, deleted) {
        this.responseStatus = this.name = this.slug = this.description = this.id = null;
        this.technologyIds = [];
        this.$emit('done', changed, deleted);
    },

    async remove() {
      try {
        this.$store.commit('loading', true);
        
        const response = await deleteCategory(this.organizationId, this.id);

        this.reset(true,true);

      } catch(e) {
          this.responseStatus = e.responseStatus || e;
      } finally {
          this.$store.commit('loading', false);
      }
    },

    async submit() {
      if (this.$refs.form.validate()) {
          try {
            this.$store.commit('loading', true);
            
            const fields = toObject.call(this, Object.keys(category));

            const response = this.isUpdate
                ? await updateCategory(fields)
                : await addCategory(fields);
              
            this.reset(true);

          } catch(e) {
              this.responseStatus = e.responseStatus || e;
          } finally {
              this.$store.commit('loading', false);
          }
      }
    },

    errorResponse,
  },

  mounted() {
      if (this.isUpdate) {
        Object.assign(this, this.category);
      } else {
        this.organizationId = this.orgId;
      }
  },

  data: () => ({
      ...category,
      valid: true,
      allowDelete: false,
      nameCounter, nameRules, slugCounter, slugRules, summaryCounter, summaryRulesOptional,
      responseStatus: null,
  }),

}
</script>
