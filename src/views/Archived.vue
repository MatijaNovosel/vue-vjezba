<template>
  <v-container fluid>
    <v-card class="mx-auto" max-width="1200">
      <v-toolbar dense>
        <v-toolbar-title>{{ $t("archivedTasks") }}</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <v-divider />
      <task-list :tasks="tasksStore.filterTasks(tasksStore.deletedTasks)">
        <template #task="{ task }">
          <v-card-title>{{ (task as Task).title }}</v-card-title>
          <v-card-text>{{ (task as Task).description }}</v-card-text>
          <v-card-text>{{
            new Date((task as Task).createdAt).toLocaleDateString("hr-HR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric"
            })
          }}</v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              @click="tasksStore.restoreTask(task as Task)"
            >
              <v-icon>mdi-restore</v-icon>
            </v-btn>
          </v-card-actions>
        </template>
      </task-list>
    </v-card>
  </v-container>
</template>
<script lang="ts" setup>
import TaskList from "@/components/TaskList.vue";
import { useTasksStore } from "@/stores/tasks";
import { Task } from "../models/Interfaces";

const tasksStore = useTasksStore();
</script>
