<template>
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
        <v-btn @click="tasksStore.addTask">{{ $t("addTask") }}</v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card
              v-for="(task, index) in tasksStore.notDoneTasks()"
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
                <v-btn @click="tasksStore.editTask(task)">{{
                  $t("editTask")
                }}</v-btn>
                <v-btn @click="tasksStore.deleteTask(task)">{{
                  $t("deleteTask")
                }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-dialog persistent v-model="editModal" max-width="600">
        <v-card>
          <vv-form @submit="tasksStore.saveTask">
            <v-card-title>
              {{ $t("editTask") }}
            </v-card-title>
            <v-card-text>
              <vv-field
                :name="$t('title')"
                rules="required"
                v-slot="{ field, errors }"
              >
                <v-text-field
                  v-model="tasksStore.editedTask.title"
                  v-bind="field"
                  :label="$t('title')"
                  :error-messages="errors"
                  hide-details="auto"
                  :counter="50"
                  data-vv-delay="100"
                />
              </vv-field>
              <vv-field
                :name="$t('description')"
                rules="required"
                v-slot="{ errors, field }"
              >
                <v-text-field
                  v-bind="field"
                  v-model="tasksStore.editedTask.description"
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
      <confirmModal
        v-model="modalConfirm"
        title="$t('confirm')"
        confirm-button-label="$t('deleteAll')"
        cancel-button-label="$t('cancel')"
        @confirm="tasksStore.archiveAllActive()"
        @cancel="modalConfirm = false"
      >
        {{ $t("deleteMessage") }}
      </confirmModal>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import confirmModal from "../components/ConfirmModal.vue";
import { useTasksStore } from "../stores/tasks";
var tasksStore = useTasksStore();

const langs = ["en", "hr"];
const modalConfirm = ref(false);

const showModal = () => {
  modalConfirm.value = !modalConfirm.value;
};

const title = ref("");

const { editModal, editedTask } = storeToRefs(tasksStore);
</script>
