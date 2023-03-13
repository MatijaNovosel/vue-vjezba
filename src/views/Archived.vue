<template>
  <v-text-field
    v-model="searchText"
    placeholder="Search"
    hide-details
    prepend-inner-icon="mdi-magnify"
    @input="searchTasks"
  ></v-text-field>
  <v-container fluid>
    <v-card class="mx-auto" max-width="1200">
      <v-toolbar dense>
        <v-toolbar-title>
          <v-toolbar-title>{{ $t("archivedTasks") }}</v-toolbar-title>
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-divider></v-divider>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card
              v-for="(task, index) in taskModel"
              :key="index"
              outlined
              class="my-3"
            >
              <v-card-title>
                {{ task.title }}
              </v-card-title>
              <v-card-text>
                {{ task.description }}
              </v-card-text>
              <v-card-text>
                {{ task.createdAt }}
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="store.restoreTask(task)">
                  <v-icon>mdi-restore</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { useTasksStore } from "@/stores/tasks";
import { debounce } from "lodash";
import { ref } from "vue";
const store = useTasksStore();
var tasksStore = ref(useTasksStore());
let taskModel = ref(tasksStore.value.deletedTasks);
let searchText = ref("");

const searchTasks = debounce(() => {
  if (searchText.value.trim() === "") {
    taskModel.value = tasksStore.value.deletedTasks;
    console.log("taskModel", taskModel);

    return;
  }
  taskModel.value = tasksStore.value.filterDeletedTasks(
    searchText.value.trim()
  );
  console.log("taskModel filtriran", taskModel);
  console.log("SEARCH PARAM", searchText.value.trim());
}, 1000);
</script>
