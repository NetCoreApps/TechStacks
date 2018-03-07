<template>
    <div v-if="organization && post" class="post-alerts">
        <v-alert v-if="post.archived" outline color="grey" icon="archive" :value="true">
            This is an archived post. You won't be able to vote or comment. Posts are automatically archived after 6 months.
        </v-alert>
        <v-alert v-else-if="post.locked != null" outline color="info" icon="lock" :value="true">
            This post is locked and contributions is limited to {{ organization.name }} moderators {{ fromNow(post.locked) }}
        </v-alert>
        <v-alert v-else-if="organization.locked != null && !isOrganizationMember()" outline color="info" icon="lock" :value="true">
            Contributions to {{ organization.name }} is limited to members only
        </v-alert>
        <v-alert v-else-if="memberCannotComment()" outline color="error" icon="lock" :value="true">
            You are not permitted add comments
        </v-alert>
    </div>  
</template>

<script>
import { fromNow } from "~/shared/utils";
import { isOrganizationModerator, isOrganizationMember, memberCannotComment, organizationMember, userId } from "~/shared/post";

export default {
  props: ["organization", "post"],
  methods: {
    isOrganizationModerator,
    isOrganizationMember,
    memberCannotComment,
    organizationMember, getUserId:userId,
    fromNow,
  }
};
</script>
