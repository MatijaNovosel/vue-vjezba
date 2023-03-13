<template>
  <v-app>
    <navbar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import navbar from "./components/Navbar.vue";
</script>
