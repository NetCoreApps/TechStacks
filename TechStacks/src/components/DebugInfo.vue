<template>
  <div>
      <h2>User</h2>
      <ul v-if="user">
          <li>{{ user.id }}, isAdmin: {{ isAdmin }}</li>
      </ul>
      <p v-else>No User</p>

      <h2>Organization</h2>
      <ul v-if="organization">
          <li>{{ organization.id }}. {{ organization.name }} ({{ organization.slug }})</li>
          <li v-if="organization.locked">Locked {{ organization.locked }}</li>
          <li v-if="organization.deleted">Deleted {{ organization.deleted }}</li>
          <li v-if="organization.hidden">Hidden {{ organization.hidden }}</li>
          <li v-if="member">
              Organization Member, Moderator: {{ member.isModerator }},
              Deny: {{ deny.length > 0 ? deny.join(', ') : 'None' }}
          </li>
          <li v-else>Not an Organization Member</li>
          <li v-if="isOrganizationModerator">Is Organization Moderator</li>
          <li v-if="isOrganizationOwner">Is Organization Owner</li>
      </ul>
      <p v-else>No Organization</p>

      <h2>Post</h2>
      <ul v-if="post">
          <li>{{ post.id }}. {{ post.title }}</li>
          <li>Created {{ post.created }} by {{ post.createdBy }}</li>
          <li>Modified {{ post.modified }} by {{ post.modifiedBy }}</li>
          <li v-if="post.archived">Archived</li>
          <li v-if="post.locked">Locked {{ post.locked }}</li>
          <li v-if="post.deleted">Deleted {{ post.deleted }}</li>
          <li v-if="post.hidden">Hidden {{ post.hidden }}</li>
      </ul>
      <p v-else>No Post</p>

      <h2>Comment</h2>
      <ul v-if="comment">
          <li>{{ comment.id }}</li>
          <li>{{ substring(comment.content) }}</li>
          <li>Created {{ post.created }} by {{ post.createdBy }}</li>
          <li>Modified {{ post.modified }}</li>
          <li v-if="post.deleted">Deleted {{ post.deleted }}</li>
          <li v-if="post.hidden">Hidden {{ post.hidden }}</li>
      </ul>
      <p v-else>No Comment</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ['post','comment'],

  computed: {
      member(){
          return this.organizationMember;
      },
      deny() {
          return [this.member.denyAll ? 'All':'', this.member.denyPosts ?'Posts':'', this.member.denyComments ? 'Comments':''].filter(x => x);
      },
      ...mapGetters(["user", "organization", "isAdmin", "organizationMember", "isOrganizationModerator", "isOrganizationOwner"])
  },

  methods: {
      substring: (s) => (s || '').substring(0,50),
  },

  async mounted() {
  }
}
</script>
