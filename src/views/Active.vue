<template>
  <v-container fluid>
    <v-card class="mx-auto" max-width="1200">
      <v-toolbar dense>
        <v-toolbar-title>{{ $t("taskList") }}</v-toolbar-title>
        <v-spacer />
        <v-btn @click="tasksStore.openTaskDialog()">{{ $t("addTask") }}</v-btn>
      </v-toolbar>
      <v-divider />
      <v-container>
        <v-row>
          <v-spacer />
          <v-btn
            right
            v-if="tasksStore.notDoneTasks.length > 0"
            @click="tasksStore.showConfirmModal"
            >{{ $t("deleteAll") }}
          </v-btn>
          <v-col cols="12">
            <task-list :tasks="tasksStore.filterTasks(tasksStore.notDoneTasks)">
              <template v-slot:task="{ task }">
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
                <v-card-actions>
                  <v-btn @click="tasksStore.markAsDone(task as Task)">{{
                    $t("markAsDone")
                  }}</v-btn>
                  <v-btn @click="tasksStore.openTaskDialog(task as Task)">{{
                    $t("editTask")
                  }}</v-btn>
                  <v-btn @click="tasksStore.deleteTask(task as Task)">{{
                    $t("deleteTask")
                  }}</v-btn>
                </v-card-actions>
              </template>
            </task-list>
          </v-col>
        </v-row>
      </v-container>
      <v-dialog persistent v-model="tasksStore.state.editModal" max-width="600">
        <v-card>
          <vv-form @submit="tasksStore.confirmChanges">
            <v-card-title>
              {{ $t("editTask") }}
            </v-card-title>
            <v-card-text>
              <vv-field
                v-model="tasksStore.state.newTask.title"
                :name="$t('title')"
                rules="required"
                v-slot="{ field, errors }"
              >
                <v-text-field
                  v-model="tasksStore.state.newTask.title"
                  v-bind="field"
                  :label="$t('title')"
                  :error-messages="errors"
                  hide-details="auto"
                  :counter="50"
                />
              </vv-field>
              <vv-field
                v-model="tasksStore.state.newTask.description"
                :name="$t('description')"
                rules="required"
                v-slot="{ errors, field }"
              >
                <v-text-field
                  v-bind="field"
                  v-model="tasksStore.state.newTask.description"
                  hide-details="auto"
                  :label="$t('description')"
                  :error-messages="errors"
                  :counter="100"
                />
              </vv-field>
            </v-card-text>
            <v-card-actions>
              <v-btn type="submit">
                {{ $t("saveTask") }}
              </v-btn>
              <v-btn @click="tasksStore.closeEditModal()">
                {{ $t("cancel") }}
              </v-btn>
            </v-card-actions>
          </vv-form>
        </v-card>
      </v-dialog>
    </v-card>

    <confirm-modal
      v-model="tasksStore.state.confirmModal"
      :on-confirm="() => tasksStore.archiveAll(tasksStore.notDoneTasks)"
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
