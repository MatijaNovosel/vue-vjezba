<template>
    <v-card class="ma-2">
        <v-card-item>
            <div class="text-overline mb-1">
                {{ $t("cardElements.cardName") }}
            </div>
            <template v-if="listItem.active">
                <div class="text-h6 mb-1">
                    {{ listItem.name }}
                </div>
            </template>
            <template v-else>
                <div class="text-h6 mb-1">
                    <s>{{ listItem.name }}</s>
                </div>
            </template>
            <div class="text-caption">
                {{ listItem.description }}
            </div>
            <div>
                {{ listItem.createdAt }}
            </div>
        </v-card-item>
        <v-card-actions>
            <template v-if="listItem.isArchived">
                <v-btn outlined @click="restoreTask(listItem.id)">
                    {{ $t("cardElements.cardButtons.restore") }}
                </v-btn>
                <v-btn outlined @click="deleteTask(listItem.id)">
                    {{ $t("cardElements.cardButtons.delete") }}
                </v-btn>
            </template>
            <template v-else>
                <template v-if="listItem.active">
                    <v-btn outlined @click="finishTask(listItem.id)">
                        {{ $t("cardElements.cardButtons.done") }}
                    </v-btn>
                </template>
                <template v-else>
                    <v-btn outlined @click="archiveTask(listItem.id)">
                        {{ $t("cardElements.cardButtons.arhive") }}
                    </v-btn>
                </template>
                <v-btn outlined @click="editTask(listItem.id)">
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
import dialog from '@/utils/dialog';

defineProps({
    listItem: {
        type: Object as PropType<TodoItem>,
        required: true
    }
})

const store = useTodoStore();

const { t } = useI18n();

const { showDialogEditElements } = storeToRefs(store);

const finishTask = (id: string) => {
    store.finishTask(id)
}
const editTask = (id: string) => {
    showDialogEditElements.value = true;
    store.copySelectedTask(id)
    store.handleDialog()
}
const archiveTask = (id: string) => {
    store.archiveSingleTodo(id)
}
const restoreTask = (id: string) => {
    store.restoreTodoFromArchive(id)
}
const deleteTask = async (id: string) => {
    const dialogResult = await dialog.okText(t("dialogAnswers.yes")).cancelText(t("dialogAnswers.no")).confirm(t("dialogQuestion.deleteFromArchive"))
    if (dialogResult) {
        store.deleteTodoFromArhive(id)
    }
}
</script>
