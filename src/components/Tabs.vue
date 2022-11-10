<template>
  <div>
    <v-tabs>
      <v-tab exact to="/active">Active</v-tab>
      <v-tab to="/done">Done</v-tab>
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
