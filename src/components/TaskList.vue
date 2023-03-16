<template>
  <div>
    <v-card
      v-for="(task, index) in tasks"
      :key="index"
      style="margin-bottom: 16px"
    >
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
        <v-btn
          v-if="!task.done && !task.deleted"
          @click="tasksStore.markAsDone(task)"
        >
          {{ $t("markAsDone") }}
        </v-btn>
        <v-btn
          v-if="!task.deleted && !task.done"
          @click="tasksStore.openTaskDialog(task)"
        >
          {{ $t("editTask") }}
        </v-btn>
        <v-btn
          v-if="!task.deleted && !task.done"
          @click="tasksStore.deleteTask(task)"
        >
          {{ $t("deleteTask") }}
        </v-btn>
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
  </div>
</template>

<script lang="ts" setup>
import { useTasksStore } from "@/stores/tasks";
import { defineProps } from "vue";
import { Task } from "../models/Index";
const tasksStore = useTasksStore();

defineProps({
  tasks: {
    type: Array as () => Task[],
    default: () => []
  }
});
</script>
