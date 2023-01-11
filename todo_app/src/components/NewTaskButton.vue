<template>
  <v-row justify="center">
    <v-dialog v-model="openDialog" persistent max-width="600px">
      <Form as="v-form" :validation-schema="taskValidationSchema" v-slot="{ handleSubmit }">
        <v-card>
          <v-card-title class="pt-6 pl-6 pb-0">
            <template v-if="showDialogEditElements">
              <span class="text-h5"> {{ $t("formElements.formName.edit") }} </span>
            </template>
            <template v-else>
              <span class="text-h5"> {{ $t("formElements.formName.new") }} </span>
            </template>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-col>
                <v-row row="12" sm="6" md="4">
                  <Field v-model="selectedTodo.name" name="taskName" v-slot="{ field, errors }">
                    <v-text-field v-bind="field" :error-messages="errors" :label="$t('formElements.labels.taskName')"
                      :focused="showDialogEditElements" color="blue" variant="outlined"></v-text-field>
                  </Field>
                </v-row>
                <v-row row="12" sm="6" md="4">
                  <Field v-model="selectedTodo.description" name="taskDescription" v-slot="{ field }">
                    <v-textarea v-bind="field" :label="$t('formElements.labels.taskDescription')" color="blue"
                      variant="outlined"></v-textarea>
                  </Field>
                </v-row>
                <template v-if="showDialogEditElements">
                  <v-row id="activeCheckboxField" row="12" sm="6" md="4" class="mb-6">
                    <Field type="checkbox" v-model="selectedTodo.active" name="taskActive" :value="true"
                      :unchecked-value="false">
                    </Field>
                    <span>
                    </span>
                    {{ $t('formElements.labels.active') }}
                  </v-row>
                  <v-row row="12" sm="6" md="4">
                    <Field v-model="selectedTodo.createdAt" name="taskCreatedAt" v-slot="{ field }">
                      <v-text-field v-bind="field" readonly color="blue" variant="outlined"
                        :label="$t('formElements.labels.createdDate')"></v-text-field>
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
    active: values.taskActive
  }
console.log(values)
  if (showDialogEditElements.value) {
    store.editTask(task);
  }
  else {
    store.createTask(task);
  }

  closeForm();
}

const closeForm = () => {
  store.handleDialog()
  showDialogEditElements.value = false;
  selectedTodo.value = {} as TodoItem;
}
</script>

<style>
#activeCheckboxField{
  position: relative;
  display: flex;
  flex-direction: row;
  column-gap: 0.5rem;
}
#activeCheckboxField input {
  opacity: 0;
  cursor: pointer;
  position: absolute;
  width: 23px;
  height: 23px;
  z-index: 5;
}

#activeCheckboxField span {
  position: relative;
  background-color: #eee;
  height: 20px;
  width: 20px;
  z-index: 4;
}

#activeCheckboxField input:checked~span {
  background-color: #2196F3;
}

#activeCheckboxField input:checked~span::after {
  left: 30%;
  top: 20%;
  width: 7px;
  height: 12px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  content: "";
  position: absolute;
}
</style>