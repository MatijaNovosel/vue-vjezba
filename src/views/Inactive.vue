<template>
  <v-container fluid>
    <v-card class="mx-auto" max-width="1200">
      <v-toolbar dense>
        <v-toolbar-title>{{ $t("inactiveTask") }}</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <v-divider />
      <v-container>
        <v-row>
          <v-spacer />
          <v-btn
            right
            v-if="tasksStore.doneTasks.length > 0"
            @click="tasksStore.showConfirmModal"
            >{{ $t("deleteAll") }}
          </v-btn>
          <v-col cols="12">
            <task-list :tasks="tasksStore.filterTasks(tasksStore.doneTasks)">
              <template #task="{ task }">
                <v-card-title>{{ (task as Task).title }}</v-card-title>
                <v-card-text>{{ (task as Task).description }}</v-card-text>
                <v-card-text>{{
                  new Date((task as Task).createdAt).toLocaleDateString(
                    "hr-HR",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric"
                    }
                  )
                }}</v-card-text>
              </template>
            </task-list>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <confirm-modal
      v-model="tasksStore.state.confirmModal"
      :on-confirm="() => tasksStore.archiveAll(tasksStore.doneTasks)"
      :on-cancel="tasksStore.hideConfirmDialog"
    />
  </v-container>
</template>

<script lang="ts" setup>
import TaskList from "@/components/TaskList.vue";
import confirmModal from "../components/ConfirmModal.vue";
import { Task } from "../models/Interfaces";
import { useTasksStore } from "../stores/tasks";

const tasksStore = useTasksStore();
</script>
