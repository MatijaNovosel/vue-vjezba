<template>
  <v-row justify="center">
    <v-dialog v-model="state.dialog" persistent max-width="600px">
      <template v-slot:activator="{ dialog }">
        <v-btn :v-bind="dialog" @click="state.dialog = true" icon>
          <v-icon>mdi-table-large-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="pt-6 pl-6 pb-0">
          <span class="text-h5">New Task</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-col>
              <v-row row="12" sm="6" md="4">
                <v-text-field label="Task name" v-model="state.name" required></v-text-field>
              </v-row>
              <v-row row="12" sm="6" md="4">
                <v-textarea label="Task description" v-model="state.description"></v-textarea>
              </v-row>
            </v-col>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="state.dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="saveNewTask">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { TodoItem } from '@/models/TodoItem';
import { useTodoStore } from '@/store/todos';
import { v4 as uuidv4 } from 'uuid';

interface State {
  dialog: boolean,
  name: string,
  description: string,
}
const state: State = reactive({
  dialog: false,
  name: "",
  description: "",
})

const store = useTodoStore()

const checkId = (id: string) => {
  for (const task of store.todos) {
    if (task.id === id) {
      checkId(uuidv4())
    }
  }
  return id
}

const saveNewTask = () => {
  const today = new Date();
  const id = checkId(uuidv4());

  const newTask: TodoItem = {
    id: id,
    name: state.name,
    description: state.description,
    createdAt: `${today.getDay() + 1}/${today.getMonth() + 1}/${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}`,
    active: true
  }
  store.createNewItem(newTask)
  state.dialog = false;
  window.location.reload();
}
</script>