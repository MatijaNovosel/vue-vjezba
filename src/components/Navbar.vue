<template>
  <div>
    <v-app-bar color="blue" clipped left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ $t("appName") }}</v-toolbar-title>
      <v-text-field
        v-model="tasksStore.state.searchTerm"
        placeholder="Search"
        hide-details
        prepend-inner-icon="mdi-magnify"
        @input="searchTasks"
      />
      <v-spacer />
      <v-select
        max-width="50"
        v-model="$i18n.locale"
        label=".."
        :items="['hr', 'en']"
      />
    </v-app-bar>
    <v-navigation-drawer v-model="drawer">
      <v-list dense>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.route">
          <template #prepend>
            <v-icon>{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts" setup>
import { useTasksStore } from "@/stores/tasks";
import { ref } from "vue";
import { createDebounce } from "../utils/helpers";

const tasksStore = useTasksStore();
const drawer = ref(false);
const searchText = ref("");
const items = [
  { icon: "mdi-view-dashboard", title: "Active", route: "/active" },
  { icon: "mdi-clock", title: "Inactive", route: "/inactive" },
  { icon: "mdi-archive", title: "Archived", route: "/archived" }
];
const debounce = createDebounce();
const searchTasks = () => {
  debounce(() => {
    console.log(searchText);
    tasksStore.setSearchTerm(searchText.value);
  }, 1500);
};
tasksStore.state.searchTerm;
</script>
