<template>
  <div>
    <v-tabs>
      <v-tab to="/active">{{ $t("item.active") }}</v-tab>
      <v-tab to="/done">{{ $t("item.done") }}</v-tab>
      <v-tab to="/archived">{{ $t("item.archived") }}</v-tab>
    </v-tabs>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  }
});
</script>
