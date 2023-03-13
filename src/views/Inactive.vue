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
        <v-toolbar-title> Task List </v-toolbar-title>
        <v-spacer></v-spacer>
        <locale-switcher />
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
              <v-card-title :class="{ 'line-through': true }">
                {{ task.title }}
              </v-card-title>
              <v-card-text :class="{ 'line-through': true }">
                {{ task.description }}
              </v-card-text>
              <v-card-text>{{ task.createdAt }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <div>
      <v-btn @click="showModal">{{ $t("deleteAll") }}</v-btn>
      <confirmModal
        v-model="modalConfirm"
        title="$t('confirm')"
        confirm-button-label="$t('deleteAll')"
        cancel-button-label="$t('cancel')"
        @confirm="tasksStore.archiveAllDone()"
        @cancel="modalConfirm = false"
      >
        {{ $t("deleteMessage") }}
      </confirmModal>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { debounce } from "lodash";
import { ref } from "vue";
import confirmModal from "../components/ConfirmModal.vue";
import LocaleSwitcher from "../components/LocaleSwitcher.vue";
import { useTasksStore } from "../stores/tasks";

let modalConfirm = ref(false);

const tasksStore = ref(useTasksStore());

let taskModel = ref(tasksStore.value.doneTasks);
let searchText = ref("");

const searchTasks = debounce(() => {
  if (searchText.value.trim() === "") {
    taskModel.value = tasksStore.value.doneTasks;
    console.log("taskModel", taskModel);

    return;
  }
  taskModel.value = tasksStore.value.filterInactiveTasks(
    searchText.value.trim()
  );
  console.log("taskModel filtriran", taskModel);
  console.log("SEARCH PARAM", searchText.value.trim());
}, 1000);

const showModal = () => {
  modalConfirm.value = !modalConfirm.value;
};
</script>
