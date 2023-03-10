<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
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
    <v-app-bar color="blue" app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchText"
        placeholder="Search"
        hide-details
        prepend-inner-icon="mdi-magnify"
        @input="onInput"
      />
    </v-app-bar>
    <v-main>
      <router-view :filteredResults="filteredResults" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { useTasksStore } from "@/stores/tasks";
import { debounce } from "lodash";
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
    const store = useTasksStore();

    const goToRoute = (route: string) => {
      router.push(route);
    };

    let filteredResults;

    const debouncedFilterTasks = debounce(
      (searchText: string, route: string) => {
        filteredResults = store.filterTasks(searchText, route);
        console.log(filteredResults);
      },
      500
    );

    const onInput = (event: InputEvent) => {
      const target = event.target as HTMLInputElement;
      const route = router.currentRoute.value.path;
      debouncedFilterTasks(target.value, route);
    };

    return { goToRoute, onInput, filteredResults };
  }
};
</script>
