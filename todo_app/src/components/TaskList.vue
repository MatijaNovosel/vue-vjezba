<template>
  <v-card class="pa-1">
    <v-toolbar color="primary">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>TO-DO List</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
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
                <NewTaskForm />
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
            :item-description="item.description" />
        </template>
        <template v-else>
          <task-card v-for="item of state.doneTodoItems" :key="item.id" :list-item="item"
            :item-description="item.description" />
        </template>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { TodoItem } from "@/models/TodoItem";
import TaskCard from './TaskCard.vue';
import NewTaskForm from './NewTaskButton.vue';
import { useTodoStore } from '@/store/todos';

interface State {
  tab: null,
  tabs: string[],
  activeTodoItems: TodoItem[],
  doneTodoItems: TodoItem[],
  showForm: boolean,
}

// const todoItems: TodoItem[] = [
//   {
//     id: "123",
//     name: "test1",
//     description: "test test test test",
//     createdAt: new Date("11/11/22"),
//     active: true
//   },
//   {
//     id: "1234",
//     name: "test2",
//     description: "test test test test123",
//     createdAt: new Date("11/11/22"),
//     active: false
//   },
//   {
//     id: "1235",
//     name: "test3",
//     description: "test test test test456 ",
//     createdAt: new Date("11/11/22"),
//     active: true
//   },
//   {
//     id: "12356",
//     name: "test3455",
//     description: "test test testgdfdfgdf test456 ",
//     createdAt: new Date("11/11/22"),
//     active: false
//   }
// ]

const todoStore = useTodoStore()

const state: State = reactive({
  tab: null,
  tabs: ["Active", "Done"],
  activeTodoItems: todoStore.todos.length > 0 ? todoStore.todos.filter((item) => { return item.active === true }) : [],
  doneTodoItems: todoStore.todos.length > 0 ? todoStore.todos.filter((item) => { return item.active === false }) : [],
  showForm: false
});

const delteAllTasks = () => {
  if (window.confirm('Are you sure you want to clear TO-DO List?')) {
    todoStore.todos = [];
    window.location.reload();
  }
}
</script>
