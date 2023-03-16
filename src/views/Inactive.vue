<template>
  <v-container fluid>
    <v-card class="mx-auto" max-width="1200">
      <v-toolbar dense>
        <v-toolbar-title>
          {{ $t("inactiveTask") }}
        </v-toolbar-title>
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
          >
            {{ $t("deleteAll") }}
          </v-btn>
          <v-col cols="12">
            <task-showing :tasks="tasksStore.doneTasks" />
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
import confirmModal from "../components/ConfirmModal.vue";
import TaskShowing from "../components/TaskList.vue";
import { useTasksStore } from "../stores/tasks";

const tasksStore = useTasksStore();
</script>
