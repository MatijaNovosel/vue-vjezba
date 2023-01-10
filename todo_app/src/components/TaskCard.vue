<template>
    <v-card class="ma-2">
        <v-card-item>
            <div class="text-overline mb-1">
                {{ $t("cardElements.cardName") }}
            </div>
            <template v-if="props.listItem.active">
                <div class="text-h6 mb-1">
                    {{ props.listItem.name }}
                </div>
            </template>
            <template v-else>
                <div class="text-h6 mb-1">
                    <s>{{ props.listItem.name }}</s>
                </div>
            </template>
            <div class="text-caption">
                {{ props.listItem.description }}
            </div>
            <div>
                {{ props.listItem.createdAt }}
            </div>
        </v-card-item>
        <v-card-actions>
            <template v-if="store.todosArchive.includes(props.listItem)">
                <v-btn variant="outlined" @click="restoreTask(props.listItem.id)">
                    {{ $t("cardElements.cardButtons.restore") }}
                </v-btn>
                <v-btn variant="outlined" @click="deleteTask(props.listItem.id)">
                    {{ $t("cardElements.cardButtons.delete") }}
                </v-btn>
            </template>
            <template v-else>
                <template v-if="props.listItem.active">
                    <v-btn variant="outlined" @click="finishTask(props.listItem.id)">
                        {{ $t("cardElements.cardButtons.done") }}
                    </v-btn>
                </template>
                <template v-else>
                    <v-btn variant="outlined" @click="archiveTask(props.listItem.id)">
                        {{ $t("cardElements.cardButtons.arhive") }}
                    </v-btn>
                </template>
                <v-btn variant="outlined" @click="editTask(props.listItem.id)">
                    {{ $t("cardElements.cardButtons.edit") }}
                </v-btn>
            </template>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { TodoItem } from '@/models/TodoItem';
import { PropType } from 'vue';
import { useTodoStore } from '@/store/todos';
import { storeToRefs } from "pinia";
import { useI18n } from 'vue-i18n'

const props = defineProps({
    listItem: {
        type: Object as PropType<TodoItem>,
        required: true
    }
})

const store = useTodoStore();

const { t } = useI18n();

const { showDialogEditElements, selectedTodo } = storeToRefs(store);

const finishTask = (id: string) => {
    store.finishTask(id)
}
const editTask = (id: string) => {
    showDialogEditElements.value = true;
    selectedTodo.value = store.getTaskById(id)
    store.handleDialog()
}
const archiveTask = (id: string) => {
    store.archiveSingleTodo(id)
}
const restoreTask = (id: string) => {
    store.restoreTodoFromArchive(id)
}
const deleteTask = (id: string) => {
    if (window.confirm(t("formQuestion.deleteFromArchive"))) {
        store.deleteTodoFromArhive(id)
    }
}
</script>
