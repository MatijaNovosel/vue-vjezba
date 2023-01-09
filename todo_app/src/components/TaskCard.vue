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
            <template v-if="props.listItem.active">
                <v-btn variant="outlined" @click="finishTask(props.listItem.id)">
                    {{ $t("cardElements.cardButtons.done") }}
                </v-btn>
            </template>
            <template v-else>
                <v-btn variant="outlined" @click="deleteTask(props.listItem.id)">
                    {{ $t("cardElements.cardButtons.delete") }}
                </v-btn>
            </template>
            <v-btn variant="outlined">
                {{ $t("cardElements.cardButtons.edit") }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { TodoItem } from '@/models/TodoItem';
import { PropType } from 'vue';
import { useTodoStore } from '@/store/todos';

const store = useTodoStore();

const props = defineProps({
    listItem: {
        type: Object as PropType<TodoItem>,
        required: true
    }
})

const finishTask = (id: string) => {
    store.finishTask(id)
}
const deleteTask = (id: string) => {
    // store.deleteItem(id)
    window.location.reload();
}
</script>
