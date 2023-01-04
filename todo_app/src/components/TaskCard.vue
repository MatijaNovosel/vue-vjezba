<template>
    <v-card variant="outlined" class="ma-2">
        <v-card-item>
            <div class="text-overline mb-1">
                TO-DO Item
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
            <template v-if="listItem.active">
                <v-btn variant="outlined" @click="finishTask(listItem.id)">
                Done
            </v-btn>
            </template>
            <template v-else>
                <v-btn variant="outlined" @click="deleteTask(listItem.id)">
                Delete
            </v-btn>
            </template>
            <v-btn variant="outlined">
                Edit
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { TodoItem } from '@/models/TodoItem';
import { PropType } from 'vue';
import { useTodoStore } from '@/store/todos';

const store = useTodoStore();

defineProps({
    listItem: {
        type: Object as PropType<TodoItem>,
        required: true
    }
})

const finishTask = (id: string) => {
    store.finishTask(id)
    window.location.reload();
}
const deleteTask = (id: string) => {
    store.deleteItem(id)
    window.location.reload();
}
</script>
