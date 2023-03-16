<template>
  <v-container fluid>
    <v-card class="mx-auto" max-width="1200">
      <v-toolbar dense>
        <v-toolbar-title>
          {{ $t("archivedTasks") }}
        </v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <v-divider />
      <v-container>
        <v-row>
          <v-spacer />
          <v-col cols="12">
            <task-showing :tasks="tasksStore.deletedTasks" />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import TaskShowing from "../components/TaskList.vue";
import { useTasksStore } from "../stores/tasks";

const tasksStore = useTasksStore();
</script>
