<template>
  <v-row justify="center">
    <v-dialog v-model="openDialog" persistent max-width="600px">
      <template v-slot:activator="{ openDialog }">
        <v-btn @click="handleFormShow" icon>
          <v-icon>mdi-table-large-plus</v-icon>
        </v-btn>
      </template>
      <Form as="v-form" :validation-schema="taskValidationSchema" v-slot="{ handleSubmit }">
        <v-card>
          <v-card-title class="pt-6 pl-6 pb-0">
            <span class="text-h5"> {{ $t("formElements.formName.new") }} </span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-col>
                <v-row row="12" sm="6" md="4">
                  <Field name="taskName" v-slot="{ field, errors }">
                    <v-text-field v-bind="field" :error-messages="errors"
                      :label="$t('formElements.labels.taskName')"></v-text-field>
                  </Field>
                </v-row>
                <v-row row="12" sm="6" md="4">
                  <Field name="taskDescription" v-slot="{ field }">
                    <v-textarea v-bind="field" :label="$t('formElements.labels.taskDescription')"></v-textarea>
                  </Field>
                </v-row>
              </v-col>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="handleFormShow">
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
import { Form, Field } from 'vee-validate';
import * as yup from 'yup/es';
import { storeToRefs } from "pinia";


interface State {
  currentTask: TodoItem
}

const store = useTodoStore()

const state: State = reactive({
  currentTask: {} as TodoItem
})

const taskValidationSchema = yup.object({
  taskName: yup.string().required().min(3).label('Name'),
});

const { openDialog } = storeToRefs(store);


const checkId = (id: string) => {
  for (const task of store.todos.concat(store.todosArchive)) {
    if (task.id === id) {
      checkId(uuidv4())
    }
  }
  return id;
}


// @ts-expect-error
const handleFormSubmit = (values) => {
  const today = new Date();
  const id = checkId(uuidv4());
  const newTask: TodoItem = {
    id: id,
    name: values.taskName,
    description: values.taskDescription,
    createdAt: `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}`,
    active: true
  }
  store.createNewItem(newTask)
  handleFormShow()
}

const handleFormShow =()=>{
  store.handleDialog()
}
</script>