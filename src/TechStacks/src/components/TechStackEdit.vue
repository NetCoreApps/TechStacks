<template>
<v-container>
  <v-layout v-if="!isAuthenticated" fluid>
      <v-flex class="headline" style="text-align:center">Authentication is Required</v-flex>
  </v-layout>
  <v-layout v-if="isAuthenticated" fluid>
    <v-flex sm10 offset-sm1 :class="loading ? 'loading-body' : ''">
        <v-toolbar>
          <v-toolbar-title class="headline">{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-toolbar-items v-if="previousVersions.length > 0">
            <v-menu offset-y>
                <v-btn flat slot="activator">
                    Previous Versions &nbsp;
                    <v-icon>reply</v-icon>
                </v-btn>
                <v-list>
                    <v-list-tile v-for="version in previousVersions" :key="version.id" @click="loadVersion(version)">
                        <v-list-tile-title>Modified by {{ version.lastModifiedBy }} at {{ dateFmtHM(new Date(version.lastModified)) }}</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>                
          </v-toolbar-items>
        </v-toolbar>
        <v-card>
          <v-card-title primary-title>
            <v-form v-model="valid" ref="form" lazy-validation style="width:100%">
            <v-container>
              <v-alert outline color="error" icon="warning" :value="errorResponse()">{{ errorResponse() }}</v-alert>                  
              <v-layout>
                <v-flex xs6>
                    <v-text-field
                        label="Stack Name"
                        v-model="name"
                        required                        
                        :rules="nameRules"
                        :counter="nameCounter"
                        :error-messages="errorResponse('name')"
                        ></v-text-field>

                    <v-text-field
                        label="Vendor Name"
                        v-model="vendorName"
                        required                        
                        :rules="nameRules"
                        :counter="nameCounter"
                        :error-messages="errorResponse('vendorName')"
                        ></v-text-field>

                    <v-text-field
                        label="App URL"
                        v-model="appUrl"
                        required                        
                        :rules="urlRules"
                        :counter="urlCounter"
                        :error-messages="errorResponse('appUrl')"
                        ></v-text-field>
                </v-flex>

                <v-flex xs6 class="image-upload" style="text-align:right">
                  <v-layout style="text-align:center;margin:1em auto">
                      <v-alert outline color="error" icon="warning" :value="errorResponse('screenshotUrl')">{{ errorResponse('screenshotUrl') }}</v-alert>
                  </v-layout>
                  <small style="margin-right:2em;color:#999">(minimum 860 x 690)</small>
                  <file-input :value="screenshotUrl" accept="image/*" @input="onFileChange" ref="fileScreenshot" selectLabel="Add Screenshot"></file-input>
                </v-flex>
              </v-layout>

              <v-select
                label="Select Technologies"
                autocomplete
                :loading="loading"
                multiple
                chips
                required
                :items="technologySelectItems"
                :rules="[() => technologyIds.length > 0 || 'You must choose at least one']"
                v-model="technologyIds"
                ></v-select>

              <v-text-field
                label="Summary"
                v-model="description"
                :counter="740"
                multi-line
                :rows="6"
                required
                :rules="[v => !!v || 'Required', v => v.length >= 50 || 'Min 50 characters', v => v.length <= 740 || 'Max 740 characters']"
                :error-messages="errorResponse('description')"
                ></v-text-field>

              <v-text-field
                label="details (Markdown)"
                v-model="details"
                multi-line
                :rows="20"
                :counter="4000"
                :rules="[v => v.length <= 4000 || 'Max 4000 characters']"
                :error-messages="errorResponse('details')"
                ></v-text-field>

              <v-checkbox v-show="canChange"
                label="Prevent others from editing this Technology?"
                v-model="isLocked"
                ></v-checkbox>
            </v-container>
          </v-form>
        </v-card-title>
        <v-card-actions style="text-align:center">
            <v-layout>
                <v-flex>
                    <v-btn large @click="submit" :disabled="!valid || loading">{{ actionLabel }}</v-btn>
                </v-flex>
                <v-flex xs1 v-if="techstack && (techstack.ownerId == user.userAuthId || isAdmin)" style="margin:.5em -3em 0 3em">
                    <v-checkbox large label="confirm" v-model="allowDelete"></v-checkbox>
                </v-flex>
                <v-flex xs5 v-if="techstack && (techstack.ownerId == user.userAuthId || isAdmin)">
                    <v-btn large @click="remove" :disabled="!allowDelete" color="red" class="white--text">
                      Delete TechStack
                    </v-btn>                    
                </v-flex>
            </v-layout>
        </v-card-actions>
      </v-card>

    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import FileInput from "~/components/FileInput.vue";
import { mapGetters } from "vuex";
import { log, nameCounter, nameRules, urlCounter, urlRules } from "~/shared/utils";
import { toObject, errorResponse, dateFmtHM } from "@servicestack/client";
import { createTechStack, updateTechStack, deleteTechStack, getTechnologySelectItems, getTechStackPreviousVersions } from "~/shared/gateway";

const techstack = {
    name: "",
    vendorName: "",
    appUrl: "",
    description: "",
    details: "",
    isLocked: false,
    screenshot: null,
    screenshotUrl: "",
    technologyIds: [],
};

export default {
  props: ['techstack'],
  components: { FileInput },
  computed: { 
    canChange(){
      return !this.techstack || this.user.userAuthId == this.techstack.ownerId || this.isAdmin;
    },
    ...mapGetters(["loading", "isAuthenticated", "user", "isAdmin"])
  },

  methods: {
    onFileChange(imgFile) {
        this.screenshot = imgFile;
    },

    async submit() {
      if (this.$refs.form.validate()) {
          try {
            this.$store.commit('loading', true);
            const fields = toObject.call(this, Object.keys(techstack));
            
            const stack = !this.techstack
                ? await createTechStack(fields, this.screenshot)
                : await updateTechStack({ ...fields, id:this.id }, this.screenshot);
            
            this.$router.push(`/${stack.slug}`);

          } catch(e) {
              this.responseStatus = e.responseStatus || e;
          } finally {
              this.$store.commit('loading', false);
          }
      }
    },

    async remove() {
        try {
            this.$store.commit('loading', true);
            await deleteTechStack(this.id);
            this.$store.commit('removeTechStack', this.techstack);
            await this.$router.push('/stacks');
        } catch(e) {
            this.responseStatus = e.responseStatus || e;
        } finally {
            this.$store.commit('loading', false);
        }
    },

    loadVersion(version) {
        Object.assign(this, version, { id:this.id });
    },

    errorResponse,
    dateFmtHM,
  },

  async mounted() {
      if (this.techstack) {
        this.title = `Edit ${this.techstack.name}`;
        this.actionLabel = 'Update TechStack'; 
        Object.assign(this, this.techstack);
        this.technologyIds = (this.techstack.technologyChoices || []).map(x => x.technologyId);
        this.previousVersions = await getTechStackPreviousVersions(this.techstack.slug);
      }
      this.technologySelectItems = await getTechnologySelectItems();
  },
  
  data: () => ({
    ...techstack,
    title: 'Add a new TechStack',
    actionLabel: 'Add TechStack',
    valid: true,
    allowDelete: false,
    responseStatus: null,
    nameCounter,
    nameRules,
    urlRules,
    urlCounter,
    technologySelectItems: [],
    previousVersions: [],
  })
};
</script>

<style>
.image-upload IMG {
  max-width: 300px;
  max-height: 150px;
}
</style>
