<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <Tabs/>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent } from 'vue';
import Tabs from './components/Tabs';
export default defineComponent({
  name: 'App',

  components: {
    Tabs,
  },

  data: () => ({
    //
  }),
});
</script>
