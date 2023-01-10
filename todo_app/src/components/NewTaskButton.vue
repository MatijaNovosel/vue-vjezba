<template>
  <v-row justify="center">
    <v-dialog v-model="openDialog" persistent max-width="600px">
      <template v-slot:activator="{ openDialog }">
        <v-btn @click="openForm" icon>
          <v-icon>mdi-table-large-plus</v-icon>
        </v-btn>
      </template>
      <Form as="v-form" :validation-schema="taskValidationSchema" v-slot="{ handleSubmit }">
        <v-card>
          <v-card-title class="pt-6 pl-6 pb-0">
            <template v-if="showDialogEditElements" >
              <span class="text-h5"> {{ $t("formElements.formName.edit") }} </span>
            </template>
            <template v-else >
              <span class="text-h5"> {{ $t("formElements.formName.new") }} </span>
            </template>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-col>
                <v-row row="12" sm="6" md="4">
                  <Field v-model="selectedTodo.name" name="taskName" v-slot="{ field, errors }">
                    <v-text-field v-bind="field" :error-messages="errors"
                      :label="$t('formElements.labels.taskName')" color="blue" variant="outlined"></v-text-field>
                  </Field>
                </v-row>
                <v-row row="12" sm="6" md="4">
                  <Field v-model="selectedTodo.description" name="taskDescription" v-slot="{ field }">
                    <v-textarea v-bind="field" :label="$t('formElements.labels.taskDescription')" color="blue" variant="outlined"></v-textarea>
                  </Field>
                </v-row>
                <template v-if="showDialogEditElements">
                  <v-row row="12" sm="6" md="4">
                    <Field name="taskActive" v-slot="{ field }">
                      <v-checkbox v-model="selectedTodo.active" v-bind="field" :label="$t('formElements.labels.active')" color="green" ></v-checkbox>
                    </Field>
                  </v-row>
                  <v-row row="12" sm="6" md="4">
                    <Field v-model="selectedTodo.createdAt" name="taskCreatedAt" v-slot="{ field }">
                      <v-text-field v-bind="field" :label="$t('formElements.labels.createdDate')"
                        readonly color="blue" variant="outlined"></v-text-field>
                    </Field>
                  </v-row>
                </template>
              </v-col>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeForm">
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

const store = useTodoStore()

const { todos, todosArchive, openDialog, showDialogEditElements, selectedTodo } = storeToRefs(store);

const taskValidationSchema = yup.object({
  taskName: yup.string().required().min(3).label('Name'),
});

const checkId = (id: string) => {
  for (const task of todos.value.concat(todosArchive.value)) {
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
  const task: TodoItem = {
    id: selectedTodo.value.id || id,
    name: values.taskName,
    description: values.taskDescription,
    createdAt: `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()} ${today.getHours().toString().length > 1 ? '' : '0'}${today.getHours()}:${today.getMinutes().toString().length > 1 ? '' : '0'}${today.getMinutes()}`,
    active: values.taskActive || true
  }

  if (showDialogEditElements.value) {
    store.editTask(task);
    console.log(task)
  }
  else {
    store.createTask(task);
  }
  closeForm();
}

const handleFormShow = () => {
  store.handleDialog()
}

const openForm = () => {
  handleFormShow();
}

const closeForm = () => {
  handleFormShow();
  showDialogEditElements.value = false;
  selectedTodo.value = {} as TodoItem;
}
</script>