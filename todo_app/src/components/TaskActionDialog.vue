<template>
  <v-row justify="center">
    <v-dialog v-model="openDialog" persistent max-width="600px">
      <Form as="form" :validation-schema="taskValidationSchema" @submit="handleFormSubmit">
        <v-card>
          <v-card-title class="pt-6 pl-6 pb-0">
            <span class="text-h5"> {{
          showDialogEditElements? $t("formElements.formName.edit"):
            $t("formElements.formName.new") }} </span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-col>
                <v-row row="12" sm="6" md="4">
                  <Field v-model="selectedTodo.name" name="taskName" v-slot="{ field, errors }">
                    <v-text-field v-bind="field" class="mb-5" color="blue" outlined hide-details="auto"
                      :error-messages="errors" :label="$t('formElements.labels.taskName')" />
                  </Field>
                </v-row>
                <v-row row="12" sm="6" md="4">
                  <Field v-model="selectedTodo.description" name="taskDescription" v-slot="{ field }">
                    <v-textarea v-bind="field" class="mb-5" color="blue" outlined hide-details="auto"
                      :label="$t('formElements.labels.taskDescription')" />
                  </Field>
                </v-row>
                <template v-if="showDialogEditElements">
                  <v-row id="active-checkbox-field" row="12" sm="6" md="4" class="mb-6">
                    <Field type="checkbox" v-model="selectedTodo.active" name="taskActive" hide-details="auto"
                      :value="true" :unchecked-value="false">
                    </Field>
                    <span>
                    </span>
                    {{ $t('formElements.labels.active') }}
                  </v-row>
                  <v-row row="12" sm="6" md="4">
                    <Field v-model="selectedTodo.createdAt" name="taskCreatedAt" v-slot="{ field }">
                      <v-text-field v-bind="field" readonly color="blue" outlined hide-details="auto"
                        :label="$t('formElements.labels.createdDate')" />
                    </Field>
                  </v-row>
                </template>
              </v-col>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="closeForm">
              Close
            </v-btn>
            <v-btn type="submit" color="blue darken-1" text>
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
import { generateUniqueId, getCurrentDateInCustomFormat } from '@/utils/helpers';
import { storeToRefs } from "pinia";
import { Field, Form } from 'vee-validate';
import * as yup from 'yup/es';

const store = useTodoStore()

const { todos, openDialog, showDialogEditElements, selectedTodo } = storeToRefs(store);

const taskValidationSchema = yup.object({
  taskName: yup.string().required().min(3).label('Name'),
});

// @ts-expect-error
const handleFormSubmit = (values) => {
  const id = generateUniqueId(todos.value);
  const task: TodoItem = {
    id: selectedTodo.value.id || id,
    name: values.taskName,
    description: values.taskDescription,
    createdAt: getCurrentDateInCustomFormat(),
    active: showDialogEditElements.value ? values.taskActive : true,
    isArchived: false
  }

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
  selectedTodo.value = {} as TodoItem
};
</script>

<style>
#active-checkbox-field {
  position: relative;
  display: flex;
  flex-direction: row;
  column-gap: 0.5rem;
}

#active-checkbox-field input {
  opacity: 0;
  cursor: pointer;
  position: absolute;
  width: 23px;
  height: 23px;
  z-index: 5;
}

#active-checkbox-field span {
  position: relative;
  background-color: #eee;
  height: 20px;
  width: 20px;
  z-index: 4;
}

#active-checkbox-field input:checked~span {
  background-color: #2196F3;
}

#active-checkbox-field input:checked~span::after {
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