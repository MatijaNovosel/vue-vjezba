<template>
  <v-card class="pa-1">
    <v-toolbar color="primary">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>{{ $t("appTitle") }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <div class="d-flex justify-center align-center w-25">
        <v-text-field v-model="state.searchValue" @keydown="search" class="mx-4" flat hide-details
          :label="$t('searchBox')" prepend-inner-icon="mdi-magnify" solo-inverted></v-text-field>
        <v-select prepend-inner-icon="mdi-earth" :label="$t('languages.label')" v-model="$i18n.locale" :items="['hr', 'en']" class="mt-5">
        </v-select>
      </div>

      <template v-slot:extension>
        <v-tabs v-model="state.tab" center class="w-100">
          <div class="d-flex flex-row w-100 justify-space-between">
            <div>
              <v-tab v-for="(tabName, i) of state.tabs" :key="i" :value="i">
                {{ tabName }}
              </v-tab>
            </div>
            <div class="d-flex flex-row justify-center align-start">
              <div class="mr-3">
                <v-btn @click="delteAllTasks" icon>
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
      <v-window-item v-for="(tabName, i) of state.tabs" :key="i">
        <template v-if="tabName == state.tabs[0]">
          <task-card v-for="item of todoStore.activeTodos" :key="item.id" :list-item="item"
            :item-description="item.description" />
        </template>
        <template v-else>
          <task-card v-for="item of todoStore.doneTodos" :key="item.id" :list-item="item"
            :item-description="item.description" />
        </template>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script lang="ts" setup>
import { reactive, computed } from 'vue';
import { TodoItem } from "@/models/TodoItem";
import { useTodoStore } from '@/store/todos';
import TaskCard from './TaskCard.vue';
import NewTaskForm from './NewTaskButton.vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n();

interface State {
  tab: null,
  tabs: string[],
  searchValue: string,
}

const todoStore = useTodoStore()

const state: State = reactive({
  tab: null,
  tabs: [computed(() => t("tabNames.active")).value, computed(() => t("tabNames.done")).value],
  searchValue: ""
});


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

const filterSearchItems = (item: TodoItem[], active: boolean) => {
  item = todoStore.todos.filter((item) => {
    if (state.searchValue.length > 0) {
      return item.name.includes(state.searchValue) && item.active === active
    }
    else {
      return item.active === active
    }
  });
  return item
}

const search = () =>
  debounce(() => {
    // state.activeTodoItems = filterSearchItems(state.activeTodoItems, true)
    // state.doneTodoItems = filterSearchItems(state.doneTodoItems, false)
  }, 500);

const delteAllTasks = () => {
  if (window.confirm('Are you sure you want to clear TO-DO List?')) {
    todoStore.archiveAllTodos();
    window.location.reload();
  }
}
</script>
