<template>
  <v-card v-if="organization" style="margin-bottom:1em">
    <v-card-title>
      <v-layout column>
        <v-alert outline color="error" icon="warning" :value="errorSummary">{{ errorSummary }}</v-alert>
        <v-flex v-for="member in owners" :key="member.userName">
            <nuxt-link :to="routes.user(member.userName)">@{{ member.userName }} </nuxt-link>
            <em class="tag green">owner</em>
        </v-flex>
        <v-flex v-for="member in moderators" :key="member.userName">
            <nuxt-link :to="routes.user(member.userName)">@{{ member.userName }} </nuxt-link>
            <em class="tag green">owner</em>
        </v-flex>
        <v-flex v-if="member && !(member.isOwner || member.isModerator)">
            <nuxt-link :to="routes.user(member.userName)">@{{ member.userName }} </nuxt-link>
            <em class="tag">member</em>
        </v-flex>

        <v-flex v-if="!member && isAuthenticated" style="margin-top:1em;text-align:center">
          <v-btn v-if="pendingInvite && pendingInvite.dismissed == null" :disabled="true" color="primary">Request Pending</v-btn>
          <div v-else-if="!pendingInvite">
            <div v-if="owners.length == 0 && moderators.length == 0" class="invite-message">
              take ownership and handle moderation of this {{ organization.refSource || 'organization' }}
            </div>
            <div v-else class="invite-message">
              become a member of this {{ organization.refSource || 'organization' }}
            </div>
            <v-btn color="primary" :disabled="loading" @click="requestInvite">
              {{ owners.length == 0 && moderators.length == 0 ? 'Request Ownership' : 'Request Invite' }}
            </v-btn>
          </div>
        </v-flex>

        <v-flex style="text-align:center;margin-top:1em" v-if="membersTotal > 1">{{membersTotal}} members</v-flex>
      </v-layout>

    </v-card-title>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import { routes } from "~/shared/routes";
import { requestMemberInvite } from "~/shared/gateway";
import { errorResponse, errorResponseExcept } from "@servicestack/client";


export default {
  props: ['organization'],

  computed: {
    errorSummary(){ 
      return errorResponseExcept.call(this,[]);
    },
    owners(){
      return this.organization.owners;
    },
    moderators(){
      return this.organization.moderators;
    },
    membersTotal(){
      return this.organization.membersTotal;
    },
    member(){
      return this.userOrganizations.members.find(x => x.organizationId == this.organization.id);
    },
    pendingInvite(){
      return this.userOrganizations.memberInvites.find(x => x.organizationId == this.organization.id);
    },

    ...mapGetters([
      "loading",
      "isAuthenticated",
      "userId",
      "userOrganizations"
    ])
  },

  methods: {
    async requestInvite() {
      try {
        this.$store.commit('loading', true);

        await requestMemberInvite(this.organization.id);
        this.$emit('done',true);
      } catch(e) {
        this.responseStatus = e.responseStatus || e;
      } finally {
        this.$store.commit('loading', false);
      }
    }
  },

  data: () => ({
    routes,
    responseStatus: null
  })

}
</script>

<style>
.invite-message {
  color:rgba(0,0,0,.5);
  text-transform:lowercase;
}
</style>
