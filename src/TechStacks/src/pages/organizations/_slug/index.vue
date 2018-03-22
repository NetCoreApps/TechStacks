<template>
  <div class="no-prerender">
    <OrganizationEdit :orgSlug="$route.params.slug" />
  </div>
</template>

<script>
import OrganizationEdit from "~/components/OrganizationEdit.vue";

export default {
  components: { OrganizationEdit },
}
</script>
