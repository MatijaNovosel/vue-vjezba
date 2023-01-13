<template>
  <v-card class="pa-1">
    <v-toolbar color="primary">
      <v-toolbar-title>{{ $t("appTitle") }}</v-toolbar-title>
      <v-spacer />
      <div class="d-flex justify-center align-center w-25">
        <v-text-field class="mx-4" flat hide-details solo-inverted clearable v-model="state.searchInput"
          @keydown="onSearch" @click:clear="onSearch" :label="$t('searchBox')" prepend-inner-icon="mdi-magnify" />

        <v-select prepend-inner-icon="mdi-earth" :label="$t('languages.label')" v-model="$i18n.locale"
          :items="languages" item-value="value" item-title="displaytext" class="mt-5">
        </v-select>
      </div>
      <template #extension>
        <v-tabs center class="w-100">
          <div class="d-flex flex-row w-100 justify-space-between">
            <div>
              <v-tab :to="{ name: ROUTE_NAMES.TASKS, params: { state: 'active' } }">
                {{ $t("tabNames.active") }}
              </v-tab>
              <v-tab :to="{ name: ROUTE_NAMES.TASKS, params: { state: 'done' } }">
                {{ $t("tabNames.done") }}
              </v-tab>
              <v-tab :to="{ name: ROUTE_NAMES.TASKS, params: { state: 'archived' } }">
                {{ $t("tabNames.archive") }}
              </v-tab>
            </div>
            <div class="d-flex flex-row justify-center align-start mr-3">
              <div>
                <v-btn @click="ArchiveAllTasks" icon>
                  <v-icon>mdi-close-thick</v-icon>
                </v-btn>
              </div>
              <div>
                <v-btn @click="store.handleDialog" icon>
                  <v-icon>mdi-table-large-plus</v-icon>
                </v-btn>
                <new-task-form />
              </div>
            </div>
          </div>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-window>
      <router-view />
    </v-window>
  </v-card>
</template>

<script lang="ts" setup>
import ROUTE_NAMES from '@/router/routeNames';
import { useTodoStore } from '@/store/todos';
import dialog from '@/utils/dialog';
import { createDebounce } from '@/utils/helpers';
import { storeToRefs } from "pinia";
import { computed, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import NewTaskForm from './TaskActionDialog.vue';

interface State {
  searchInput: string
}

const state: State = reactive({
  searchInput: ""
})

const store = useTodoStore()

const { searchValue } = storeToRefs(store);

const { t } = useI18n();

const debounce = createDebounce();

const languages = computed(() => {
  return [{ displaytext: t('languages.croatian'), value: 'hr' }, { displaytext: t('languages.english'), value: 'en' }]
})

const onSearch = () => {
  debounce(() => {
    searchValue.value = state.searchInput
  }, 500)
}

const ArchiveAllTasks = async () => {
  const dialogResult = await dialog.okText(t("dialogAnswers.yes")).cancelText(t("dialogAnswers.no")).confirm(t("dialogQuestion.archiveAllTasks"))
  if (dialogResult) {
    store.archiveAllTodos();

  }
}

</script>
