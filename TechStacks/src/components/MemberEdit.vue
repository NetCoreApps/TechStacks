<template>
  <div style="margin-bottom:1em">
      <v-layout>
          <v-card>
            <v-card-title>
              <v-form v-model="valid" ref="form" lazy-validation style="width:700px">
                <v-container>
                  <v-alert outline color="error" icon="warning" :value="errorSummary">{{ errorSummary }}</v-alert>
                  <v-layout column>

                    <v-text-field v-if="!isUpdate"
                      label="Username"
                      v-model="userName"
                      required
                      :rules="nameRules"
                      :counter="nameCounter"
                      :error-messages="errorResponse('userName')"
                      ></v-text-field>

                    <v-layout v-else style="margin-bottom:1em">
                      <v-flex>
                        <nuxt-link :to="routes.user(userId)">
                          @{{ userId }}
                        </nuxt-link>
                      </v-flex>
                    </v-layout>

                    <v-checkbox label="Is Owner" v-model="isOwner"
                      :disabled="!isOrganizationOwner"
                      ></v-checkbox>

                    <v-checkbox label="Is Moderator" v-model="isModerator"
                      :disabled="!isOrganizationOwner"
                      ></v-checkbox>

                    <v-checkbox label="Deny all contributions from user" v-model="denyAll"
                      :disabled="member && member.isOwner && !isOrganizationOwner"
                      ></v-checkbox>

                    <v-checkbox label="Deny user from submitting posts" v-model="denyPosts"
                      :disabled="member && member.isOwner && !isOrganizationOwner"
                      ></v-checkbox>

                    <v-checkbox label="Deny user from submitting Comments" v-model="denyComments"
                      :disabled="member && member.isOwner && !isOrganizationOwner"
                      ></v-checkbox>

                    <v-text-field
                      label="Notes"
                      v-model="notes"
                      multi-line
                      :rows="4"
                      :error-messages="errorResponse('notes')"
                      ></v-text-field>

                  </v-layout>
                </v-container>
              </v-form>
            </v-card-title>
            <v-card-actions style="text-align:center">
              <v-layout>
                  <v-flex xs2>
                      <v-btn small @click="submit" color="primary" :disabled="!valid || loading">
                        {{ isUpdate ? 'Update' : 'Add Member' }}
                      </v-btn>
                  </v-flex>
                  <v-flex xs2>
                      <v-btn small @click="reset()">Close</v-btn>
                  </v-flex>
                  <v-flex xs4></v-flex>
                  <v-flex v-if="isUpdate && (isOrganizationOwner || !member.isOwner && !member.isModerator)">
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
import { routes } from "~/shared/routes";
import { addMember, updateMember, removeMember } from "~/shared/gateway";
import { nameCounter, nameRules } from "~/shared/utils";

const member = {
  organizationId: null,
  userName: null,
  userId: null,
  isOwner: false,
  isModerator: false,
  denyAll: false,
  denyPosts: false,
  denyComments: false,
  notes: "",
};

export default {
  props: ['orgId','member','isOrganizationOwner'],
  computed: {
    errorSummary(){
      return errorResponseExcept.call(this,Object.keys(member));
    },
    isUpdate(){
        return this.member != null;
    },
    ...mapGetters(["loading", "isAuthenticated", "isAdmin", "user"])
  },

  methods: {

    reset(changed, deleted) {
      this.responseStatus = this.organizationId = this.userId = null;
      this.isOwner = this.isModerator = this.denyAll = this.denyPosts = this.denyComments = false;
      this.$emit('done', changed, deleted);
    },

    async remove() {
      try {
        this.$store.commit('loading', true);

        const response = await removeMember(this.organizationId, this.userId);

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

            const fields = toObject.call(this, Object.keys(member));

            const response = !this.isUpdate
              ? await addMember(fields)
              : await updateMember(fields);

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
        Object.assign(this, this.member);
      } else {
        this.organizationId = this.orgId;
      }
  },

  data: () => ({
    routes,
    ...member,
    valid: true,
    allowDelete: false,
    nameCounter, nameRules,
    responseStatus: null,
  }),

}
</script>
