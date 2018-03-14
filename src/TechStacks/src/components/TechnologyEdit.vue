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
              <v-alert outline color="error" icon="warning" :value="errorSummary">{{ errorSummary }}</v-alert>                  
              <v-layout>
                <v-flex xs6>
                    <v-text-field
                        label="Technology Name"
                        v-model="name"
                        required                        
                        :rules="nameRules"
                        :counter="nameCounter"
                        :error-messages="errorResponse('name')"
                        ></v-text-field>

                    <v-text-field
                        :disabled="isUpdate"
                        label="Slug"
                        v-model="slug"
                        required
                        :rules="slugRules"
                        :counter="slugCounter"
                        :error-messages="errorResponse('slug')"
                        ></v-text-field>

                    <v-text-field
                        label="Vendor Name"
                        v-model="vendorName"
                        required                        
                        :rules="nameRules"
                        :counter="nameCounter"
                        :error-messages="errorResponse('vendorName')"
                        ></v-text-field>

                    <v-select
                        label="Add to Category"
                        :items="allTiers"
                        item-text="title"
                        item-value="name"
                        autocomplete
                        v-model="tier"
                        required                        
                        :rules="[v => !!v || 'Required']"
                        :error-messages="errorResponse('tier')"
                        ></v-select>
                </v-flex>

                <v-flex xs6 class="image-upload" style="text-align:right">
                  <v-layout style="text-align:center;margin:1em auto">
                      <v-alert outline color="error" icon="warning" :value="errorResponse('logoUrl')">{{ errorResponse('logoUrl') }}</v-alert>
                  </v-layout>
                  <small style="color:#999">(minimum 150 x 100)</small>
                  <file-input :value="logoUrl" accept="image/*" @input="onFileChange" ref="fileLogo" selectLabel="Add Logo"></file-input>
                </v-flex>
              </v-layout>

              <v-text-field
                label="Description"
                v-model="description"
                :counter="descriptionCounter"
                multi-line
                :rows="6"
                required                        
                :rules="descriptionRules"
                :error-messages="errorResponse('description')"
                ></v-text-field>

              <v-text-field
                label="Product URL"
                v-model="productUrl"
                required                        
                :rules="urlRules"
                :counter="urlCounter"
                :error-messages="errorResponse('productUrl')"
                ></v-text-field>

              <v-text-field
                label="Vendor URL"
                v-model="vendorUrl"
                :counter="urlCounter"
                :error-messages="errorResponse('vendorUrl')"
                ></v-text-field>

              <v-checkbox 
                label="Prevent others from editing this Technology?"
                v-model="isLocked"
                ></v-checkbox>
            </v-container>
          </v-form>
        </v-card-title>
        <v-card-actions style="text-align:center">
            <v-layout>
                <v-flex>
                    <v-btn large @click="done" title="Close (ESC)">Close</v-btn>
                </v-flex>
                <v-flex>
                    <v-btn large @click="submit" :disabled="!valid || loading" color="primary" title="Save (S)">{{ actionLabel }}</v-btn>
                </v-flex>
                <v-flex v-if="technology" xs1 style="margin:.5em -3em 0 3em">
                    <v-checkbox large label="confirm" v-model="allowDelete"></v-checkbox>
                </v-flex>
                <v-flex v-if="technology" xs5>
                    <v-btn large @click="remove" :disabled="!allowDelete" color="red" class="white--text">
                      Delete Technology
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
import { routes } from "~/shared/routes";
import { ignoreKeyPress, nameCounter, nameRules, slugCounter, slugRules, toSlug, urlCounter, urlRules, descriptionCounter, descriptionRules } from "~/shared/utils";
import { toObject, errorResponse, errorResponseExcept, dateFmtHM } from "@servicestack/client";
import { createTechnology, updateTechnology, deleteTechnology, getTechnologyPreviousVersions } from "~/shared/gateway";

const technology = {
    name: "",
    slug: "",
    vendorName: "",
    tier: "",
    description: "",
    logoUrl: "",
    productUrl: "",
    vendorUrl: "",
    isLocked: false,
    logo: null,
    logoUrl: null,
};

export default {
  props: ['technology'],
  components: { FileInput },
  computed: {
      isUpdate() { 
          return this.technology != null;
      },
      errorSummary() {
          return errorResponseExcept.call(this, Object.keys(technology));
      },
      ...mapGetters(["loading", "isAuthenticated", "allTiers"])
  },

  watch: {
    name(name) {
      this.slug = toSlug(name);
    }
  },

  methods: {
    done() {
      this.$router.push(routes.tech(this.slug));
    },

    onFileChange(imgFile) {
        this.logo = imgFile;
    },

    async submit() {
      if (this.$refs.form.validate()) {
          try {
            this.$store.commit('loading', true);
            const fields = toObject.call(this, Object.keys(technology));
            
            const tech = !this.technology
                ? await createTechnology(fields, this.logo)
                : await updateTechnology({ ...fields, id:this.id }, this.logo);
            
            this.$router.push(routes.tech(this.slug));

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
            await deleteTechnology(this.id);
            this.$store.commit('removeTechnology', this.technology);
            await this.$router.push(routes.homeTech);
        } catch(e) {
            this.responseStatus = e.responseStatus || e;
        } finally {
            this.$store.commit('loading', false);
        }
    },

    loadVersion(version) {
      Object.assign(this, version, { id:this.id });
    },

    handleKeyUp(e) {
      if (ignoreKeyPress(e)) return;
      const c = String.fromCharCode(e.keyCode).toLowerCase();
      if (e.key === "Escape" || e.keyCode === 27) {
        this.done();
      }
      else if (c === 's') {
        this.submit();
        return false;
      }
    },

    errorResponse,
    dateFmtHM,
  },

  async mounted() {
    if (this.technology) {
        this.title = `Edit ${this.technology.name}`;
        this.actionLabel = 'Update Technology'; 
        Object.assign(this, this.technology);
        this.previousVersions = await getTechnologyPreviousVersions(this.technology.slug);
    }

    window.addEventListener('keyup', this.handleKeyUp);
  },

  destroyed(){
    window.removeEventListener('keyup', this.handleKeyUp);
  },
  
  data: () => ({
    routes,
    ...technology,
    title: 'Add a new Technology',
    actionLabel: 'Add Technology',
    valid: true,
    allowDelete: false,
    responseStatus: null,
    nameCounter, nameRules,
    slugCounter, slugRules,
    urlCounter, urlRules, 
    descriptionCounter, descriptionRules,
    previousVersions: [],
  })
};
</script>
