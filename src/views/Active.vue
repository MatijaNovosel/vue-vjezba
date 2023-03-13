<template>
  <v-text-field
    v-model="searchText"
    placeholder="Search"
    hide-details
    prepend-inner-icon="mdi-magnify"
  ></v-text-field>
  <v-container fluid>
    <v-card class="mx-auto" max-width="1200">
      <v-toolbar dense>
        <v-toolbar-title>{{ $t("taskList") }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <div>
          <select v-model="$i18n.locale">
            <option v-for="(lang, i) in langs" :key="`lang-${i}`" :value="lang">
              {{ lang }}
            </option>
          </select>
        </div>
        <v-btn @click="tasksStore.openTaskDialog()">{{ $t("addTask") }}</v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-container>
        <v-row>
          <v-col cols="12">
            <span v-if="!tasksStore.activeTasks.length">
              Nije pronađen ni jedan task.
            </span>
            <template v-else>
              <v-card
                v-for="(task, index) in tasksStore.activeTasks"
                :key="index"
                outlined
                class="my-3"
              >
                <v-card-title>{{ task.title }}</v-card-title>
                <v-card-text>{{ task.description }}</v-card-text>
                <v-card-text>{{ task.createdAt }}</v-card-text>
                <v-card-actions>
                  <v-btn @click="tasksStore.markAsDone(task)">{{
                    $t("markAsDone")
                  }}</v-btn>
                  <v-btn @click="tasksStore.openTaskDialog(task)">{{
                    $t("editTask")
                  }}</v-btn>
                  <v-btn @click="tasksStore.deleteTask(task)">{{
                    $t("deleteTask")
                  }}</v-btn>
                </v-card-actions>
              </v-card>
            </template>
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
    <div>
      <v-btn @click="showModal">{{ $t("deleteAll") }}</v-btn>
      <confirm-modal
        v-model="modalConfirm"
        title="$t('confirm')"
        confirm-button-label="$t('deleteAll')"
        cancel-button-label="$t('cancel')"
        @confirm="tasksStore.archiveAllActive()"
        @cancel="modalConfirm = false"
      >
        {{ $t("deleteMessage") }}
      </confirm-modal>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import confirmModal from "../components/ConfirmModal.vue";
import { useTasksStore } from "../stores/tasks";
import { langs } from "../utils/constants";

const tasksStore = useTasksStore();

const modalConfirm = ref(false);
let searchText = "";

const showModal = () => {
  modalConfirm.value = !modalConfirm.value;
};
</script>
