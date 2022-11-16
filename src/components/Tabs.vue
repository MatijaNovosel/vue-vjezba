<template>
  <div>
    <v-tabs>
      <v-tab :to="RouteNames.Active">{{ $t("item.active") }}</v-tab>
      <v-tab :to="RouteNames.Done">{{ $t("item.done") }}</v-tab>
      <v-tab :to="RouteNames.Archived">{{ $t("item.archived") }}</v-tab>
    </v-tabs>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RouteNames from "@/router/routeNames";

export default defineComponent({
  setup() {
    return { RouteNames };
  }
});
</script>
