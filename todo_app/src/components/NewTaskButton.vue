<template>
  <v-row justify="center">
    <v-dialog v-model="state.dialog" persistent max-width="600px">
      <template v-slot:activator="{ dialog }">
        <v-btn :v-bind="dialog" @click="handleDialog" icon>
          <v-icon>mdi-table-large-plus</v-icon>
        </v-btn>
      </template>
      <Form as="v-form" :validation-schema="taskValidationSchema" v-slot="{ handleSubmit }">
        <v-card>
          <v-card-title class="pt-6 pl-6 pb-0">
            <span class="text-h5">New Task</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-col>
                <v-row row="12" sm="6" md="4">
                  <Field name="taskName" v-slot="{ field, errors }">
                    <v-text-field v-bind="field" :error-messages="errors" label="Task name"></v-text-field>
                  </Field>
                </v-row>
                <v-row row="12" sm="6" md="4">
                  <Field name="taskDescription" v-slot="{ field }">
                    <v-textarea v-bind="field" label="Task description"></v-textarea>
                  </Field>
                </v-row>
              </v-col>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="state.dialog = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="handleSubmit(handleFormSubmit)">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </Form>
    </v-dialog>
  </v-row>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { TodoItem } from '@/models/TodoItem';
import { useTodoStore } from '@/store/todos';
import { v4 as uuidv4 } from 'uuid';
import { Field, Form } from 'vee-validate';
import * as yup from 'yup/es';


interface State {
  dialog: boolean,
  currentTask: TodoItem
}

const props = defineProps({
  dialogValue: {
    type: Boolean,
    required: true
  }
})

const state: State = reactive({
  dialog: false, 
  currentTask: {} as TodoItem
})


const taskValidationSchema = yup.object({
  taskName: yup.string().required().min(3).label('Name'),
});

const store = useTodoStore()

const handleDialog = () => {
  state.dialog = props.dialogValue;
}

const checkId = (id: string) => {
  for (const task of store.todos) {
    if (task.id === id) {
      checkId(uuidv4())
    }
  }
  return id;
}

const handleFormSubmit = (values: Object) => {
  const today = new Date();
  const id = checkId(uuidv4());
  const newTask: TodoItem = {
    id: id,
    //@ts-ignore
    name: values.taskName,
    //@ts-ignore
    description: values.taskDescription,
    createdAt: `${today.getDay() + 1}/${today.getMonth() + 1}/${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}`,
    active: true
  }
  store.createNewItem(newTask)
  state.dialog = false;
  window.location.reload()
}
</script>