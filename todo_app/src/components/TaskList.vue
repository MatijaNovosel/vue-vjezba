<template>
  <v-card class="pa-1">
    <v-toolbar color="primary">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>{{ $t("appTitle") }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="d-flex justify-center align-center w-25">
        <v-text-field v-model="state.searchValue" @keydown="search" @click:clear="search" class="mx-4" flat hide-details
          :label="$t('searchBox')" prepend-inner-icon="mdi-magnify" solo-inverted clearable></v-text-field>
        <v-select prepend-inner-icon="mdi-earth" :label="$t('languages.label')" v-model="$i18n.locale"
          :items="['hr', 'en']" class="mt-5">
        </v-select>
      </div>
      <template v-slot:extension>
        <v-tabs v-model="state.tab" center class="w-100">
          <div class="d-flex flex-row w-100 justify-space-between">
            <div>
              <v-tab>
                {{ $t("tabNames.active") }}
              </v-tab>
              <v-tab>
                {{ $t("tabNames.done") }}
              </v-tab>
              <v-tab>
                {{ $t("tabNames.archive") }}
              </v-tab>
              <template v-if="state.searchValue">
                <v-tab>
                  {{ $t("tabNames.searchResult") }}
                </v-tab>
              </template>
            </div>
            <div class="d-flex flex-row justify-center align-start">
              <div class="mr-3">
                <v-btn @click="ArchiveAllTasks" icon>
                  <v-icon>mdi-close-thick</v-icon>
                </v-btn>
              </div>
              <div class="mr-3 mt-3">
                <new-task-form />
              </div>
            </div>
          </div>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-window v-model="state.tab">
      <v-window-item>
        <task-card v-for="item of activeTodos" :key="item.id" :list-item="item" :item-description="item.description" />
      </v-window-item>
      <v-window-item>
        <task-card v-for="item of doneTodos" :key="item.id" :list-item="item" :item-description="item.description" />
      </v-window-item>
      <v-window-item>
        <task-card v-for="item of todosArchive" :key="item.id" :list-item="item" :item-description="item.description" />
      </v-window-item>
      <template v-if="state.searchValue">
        <v-window-item>
          <task-card v-for="item of filteredTodos" :key="item.id" :list-item="item"
            :item-description="item.description" />
        </v-window-item>
      </template>
    </v-window>
  </v-card>
</template>

<script lang="ts" setup>
import { reactive, computed } from 'vue';
import { useTodoStore } from '@/store/todos';
import TaskCard from './TaskCard.vue';
import NewTaskForm from './NewTaskButton.vue';
import { storeToRefs } from "pinia";
import { useI18n } from 'vue-i18n'

interface State {
  tab: number,
  searchValue: string,
}

const todoStore = useTodoStore()

const { t } = useI18n();

const state: State = reactive({
  tab: 0,
  searchValue: ''
});

const { todosArchive, doneTodos, activeTodos, filteredTodos } = storeToRefs(todoStore);

const createDebounce = () => {
  let timeout: ReturnType<typeof setTimeout>;
  return function (fn: Function, delayMs: number) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn();
    }, delayMs || 500);
  };
}

const debounce = createDebounce()

const search = () =>
  debounce(() => {
    if (!state.searchValue) {
      state.tab = 0;
      return;
    }
    state.tab = 3;
    todoStore.filterTodos(state.searchValue)
  }, 500);

const ArchiveAllTasks = () => {
  if (window.confirm(t("formQuestion.archiveAllTasks"))) {
    todoStore.archiveAllTodos();
  }
}
</script>
