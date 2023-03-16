<template>
  <v-card :key="task.id" class="mb-5">
    <v-card-title>
      {{ task.title }}
    </v-card-title>
    <v-card-text>
      {{ task.description }}
    </v-card-text>
    <v-card-text>
      {{
        new Date(task.createdAt).toLocaleDateString("hr-HR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        })
      }}
    </v-card-text>
    <v-card-actions>
      <template v-if="!task.done && !task.deleted">
        <v-btn @click="tasksStore.markAsDone(task)">
          {{ $t("markAsDone") }}
        </v-btn>
        <v-btn @click="tasksStore.openTaskDialog(task)">
          {{ $t("editTask") }}
        </v-btn>
        <v-btn @click="tasksStore.deleteTask(task)">
          {{ $t("deleteTask") }}
        </v-btn>
      </template>
      <v-btn
        v-if="task.deleted"
        color="primary"
        @click="tasksStore.restoreTask(task)"
      >
        <v-icon>mdi-restore</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
  <v-spacer />
</template>

<script lang="ts" setup>
import { useTasksStore } from "@/stores/tasks";
import { defineProps } from "vue";
import { Task } from "../models";

const tasksStore = useTasksStore();

defineProps({
  task: {
    type: Object as () => Task,
    required: true
  }
});
</script>
