<template>
  <v-container fluid>
    <v-card class="mx-auto" max-width="1200">
      <v-toolbar dense>
        <v-toolbar-title>
          <v-toolbar-title>{{ $t("archivedTasks") }}</v-toolbar-title>
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-divider></v-divider>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card
              v-for="(task, index) in store.deletedTasks()"
              :key="index"
              outlined
              class="my-3"
            >
              <v-card-title>
                {{ task.title }}
              </v-card-title>
              <v-card-text>
                {{ task.description }}
              </v-card-text>
              <v-card-text>
                {{ task.createdAt }}
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="store.restoreTask(task)">
                  <v-icon>mdi-restore</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { useTasksStore } from "@/stores/tasks";
const store = useTasksStore();
console.log(store.tasks);
</script>
