<template>
  <v-card class="pa-1">
    <v-toolbar color="primary">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>TO-DO List</v-toolbar-title>

      <v-spacer></v-spacer>
      <div class="w-25 px-15">
        <v-text-field v-model="state.searchValue" v-on:input="filterSearch" class="mx-4" flat hide-details
          label="Search" prepend-inner-icon="mdi-magnify" solo-inverted></v-text-field>
      </div>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

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
                <new-task-form :dialog-value="state.dialog" />
              </div>
            </div>
          </div>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-window v-model="state.tab">
      <v-window-item v-for="(tabName, i) of state.tabs" :key="i">
        <template v-if="tabName == state.tabs[0]">
          <task-card v-for="item of state.activeTodoItems" :key="item.id" :list-item="item"
            :item-description="item.description" :dialog-value="state.dialog" @update-task="updateTask" />
        </template>
        <template v-else>
          <task-card v-for="item of state.doneTodoItems" :key="item.id" :list-item="item"
            :item-description="item.description" :dialog-value="state.dialog" @update-task="updateTask" />
        </template>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { TodoItem } from "@/models/TodoItem";
import { useTodoStore } from '@/store/todos';
import _ from 'lodash'
import TaskCard from './TaskCard.vue';
import NewTaskForm from './NewTaskButton.vue';


interface State {
  tab: null,
  tabs: string[],
  activeTodoItems: TodoItem[],
  doneTodoItems: TodoItem[],
  dialog: boolean,
  searchValue: string
}

const todoStore = useTodoStore()

const state: State = reactive({
  tab: null,
  tabs: ["Active", "Done"],
  activeTodoItems: todoStore.todos.length > 0 ? todoStore.todos.filter((item) => { return item.active === true }) : [],
  doneTodoItems: todoStore.todos.length > 0 ? todoStore.todos.filter((item) => { return item.active === false }) : [],
  dialog: true,
  searchValue: ""
});

const filterSearch =
  _.debounce(() => {
    state.activeTodoItems =state.activeTodoItems.filter((item) => {return item.name.includes(state.searchValue)});
    state.doneTodoItems =state.doneTodoItems.filter((item) => {return item.name.includes(state.searchValue)});
  }, 500);

const delteAllTasks = () => {
  if (window.confirm('Are you sure you want to clear TO-DO List?')) {
    todoStore.todos = [];
    window.location.reload();
  }
}

const updateTask = (id: string) => {
  state.dialog = true;
  console.log(id);
}
</script>
