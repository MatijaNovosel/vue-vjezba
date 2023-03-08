<template>
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
              v-for="(task, index) in tasksStore.tasksDone()"
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
import { ref } from "vue";
import confirmModal from "../components/ConfirmModal.vue";
import { useTasksStore } from "../stores/tasks";

let modalConfirm = ref(false);

const tasksStore = ref(useTasksStore());
const langs = ["en", "hr"];

const showModal = () => {
  modalConfirm.value = !modalConfirm.value;
};
</script>
