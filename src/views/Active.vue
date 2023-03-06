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
        <v-btn @click="tasksStore.addTask()">{{ $t("addTask") }}</v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card
              v-for="(task, index) in tasksStore.tasks"
              :key="index"
              outlined
              class="my-3"
            >
              <v-card-title>{{ task.title }}</v-card-title>
              <v-card-text>{{ task.description }}</v-card-text>
              <v-card-text>{{ task.createdAt }}</v-card-text>
              <v-card-actions>
                <v-btn @click="tasksStore.markAsDone(index)">{{
                  $t("markAsDone")
                }}</v-btn>
                <v-btn @click="tasksStore.editTask(index)">{{
                  $t("editTask")
                }}</v-btn>
                <v-btn @click="tasksStore.deleteTask(index)">{{
                  $t("deleteTask")
                }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-dialog v-model="editModal" max-width="600">
        <v-card>
          <Form>
            <v-card-title>{{ $t("editTask") }}</v-card-title>
            <Field ref="formRef" v-slot="{ handleSubmit }">
              <v-card-text>
                <Field
                  vid="titleVid"
                  name="$t('title')"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    v-model="tasksStore.editedTask.title"
                    v-bind:label="$t('title')"
                    :error-messages="errors"
                    :counter="50"
                    required
                    data-vv-delay="100"
                  ></v-text-field>
                </Field>
                <Field
                  vid="descriptionVid"
                  name="$t('description')"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    v-model="tasksStore.editedTask.description"
                    v-bind:label="$t('description')"
                    :error-messages="errors"
                    :counter="100"
                    required
                  ></v-text-field>
                </Field>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="handleSubmit(tasksStore.saveTask)">{{
                  $t("saveTask")
                }}</v-btn>
                <v-btn @click="tasksStore.editModal = false">{{
                  $t("cancel")
                }}</v-btn>
              </v-card-actions>
            </Field>
          </Form>
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
        @confirm="tasksStore.archiveAll()"
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

let modalConfirm = ref(false);

const tasksStore = useTasksStore();
const langs = ["en", "hr"];

const showModal = () => {
  modalConfirm.value = !modalConfirm.value;
};
const { editModal } = storeToRefs(tasksStore);
</script>
