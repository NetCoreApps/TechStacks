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
                      label="Slug"
                      v-model="slug"
                      required
                      :rules="slugRules"
                      :counter="slugCounter"
                      :error-messages="errorResponse('slug')"
                      ></v-text-field>

                    <v-text-field
                      label="Color"
                      v-model="color"
                      required                        
                      :rules="colorRules"
                      :error-messages="errorResponse('color')"
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

                  </v-layout>
                </v-container>              
              </v-form>
            </v-card-title>
            <v-card-actions style="text-align:center">
              <v-layout>
                  <v-flex xs2>
                    <v-btn small @click="submit" color="primary" :disabled="!valid || loading">{{ label ? 'Update' : 'Add' }}</v-btn>
                  </v-flex>
                  <v-flex xs2>
                    <v-btn small @click="reset()">Close</v-btn>
                  </v-flex>
                  <v-flex xs4></v-flex>
                  <v-flex>
                    <v-layout style="width:200px">
                      <v-checkbox small label="confirm" v-model="allowDelete"></v-checkbox>
                      <v-btn small @click="remove" :disabled="!allowDelete" color="red" class="white--text">
                        Remove
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
import { addLabel, updateLabel, removeLabel } from "~/shared/gateway";
import { toSlug, slugCounter, slugRules, summaryCounter, summaryRulesOptional, colorRules } from "~/shared/utils";

const label = {
  organizationId: null,
  slug: null,
  description: "",
  color: ""
};

export default {
  props: ['orgId','label'],
  computed: {
    errorSummary(){ 
      return errorResponseExcept.call(this,'slug,description,color'.split(','));
    },
    isUpdate(){
        return this.label != null;
    },
    ...mapGetters(["loading", "isAuthenticated", "isAdmin", "user"])
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
        this.responseStatus = this.slug = this.description = this.color = null;
        this.$emit('done', changed, deleted);
    },

    async remove() {
      try {
        this.$store.commit('loading', true);
        
        const response = await removeLabel(this.organizationId, this.slug);

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
            
            const fields = toObject.call(this, Object.keys(label));

            const response = this.isUpdate
                ? await updateLabel(fields)
                : await addLabel(fields);
              
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
    console.log('label', this.label)
    if (this.isUpdate) {
      Object.assign(this, this.label);
    } else {
      this.organizationId = this.orgId;
    }
  },

  data: () => ({
      ...label,
      valid: true,
      allowDelete: false,
      slugCounter, slugRules, summaryCounter, summaryRulesOptional, colorRules,
      responseStatus: null,
  }),

}
</script>
