<template>
  <div class="no-prerender form-sm" style="margin:1em 0 0 0">
      <v-toolbar color="pink">
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title class="white--text" style="margin-right:2em">Login to {{ provider }}</v-toolbar-title>
    </v-toolbar>
    <v-card>
      <v-form v-model="valid" ref="form" lazy-validation @keyup.native.enter="submit">
        <v-container>
          <v-alert outline color="error" icon="warning" :value="errorSummary">{{ errorSummary }}</v-alert>                  
          <v-layout column>

            <v-text-field
                label="Email"
                v-model="userName"
                required                        
                :error-messages="errorResponse('userName')"
                ></v-text-field>

            <v-text-field
                label="Password"
                v-model="password"
                type="password"
                required
                :error-messages="errorResponse('password')"
                ></v-text-field>

          </v-layout>
        </v-container>              
      </v-form>
      <v-card-actions>
        <v-flex style="text-align:right">
          <v-btn color="primary" @click="submit" :disabled="!valid || loading">Login</v-btn>
        </v-flex>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { toObject, errorResponse, errorResponseExcept } from "@servicestack/client";
import { login } from "~/shared/gateway";

export default {
  computed: {
    provider(){
      return this.$route.params.provider;
    },
    errorSummary(){ 
      return errorResponseExcept.call(this,Object.keys('userName,password'.split()));
    },
    ...mapGetters(["loading"])
  },

  methods: {

    async submit() {
      if (this.$refs.form.validate()) {
          try {
            this.$store.commit('loading', true);
            
            const redirectUrl = await login(this.provider, this.userName, this.password);

            location.href = redirectUrl;            

          } catch(e) {
              this.responseStatus = e.responseStatus || e;
          } finally {
              this.$store.commit('loading', false);
          }
      }
    },

    errorResponse,
  },

  mounted(){
  },

  data: () => ({
    valid: true,
    userName: "",
    password: "",
    responseStatus: null,
  }),

}
</script>
