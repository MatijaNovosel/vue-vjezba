<template>
  <div>
    <v-navigation-drawer v-model="drawer">
      <v-list dense>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          @click="goToRoute(item.route)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="blue">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      drawer: false,
      searchText: "",
      title: "My App",
      items: [
        { icon: "mdi-view-dashboard", title: "Active", route: "/active" },
        { icon: "mdi-clock", title: "Inactive", route: "/inactive" },
        { icon: "mdi-archive", title: "Archived", route: "/archived" }
      ]
    };
  },
  setup() {
    const router = useRouter();

    const goToRoute = (route: string) => {
      router.push(route);
    };

    let filteredResults;

    return { goToRoute };
  }
};
</script>
