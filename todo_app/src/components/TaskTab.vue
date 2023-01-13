<template>
    <v-window-item>
        <task-card v-for="item of showTodoItems" :key="item.id" :list-item="item" />
    </v-window-item>
</template>

<script lang="ts" setup>
import { useTodoStore } from '@/store/todos';
import { storeToRefs } from "pinia";
import TaskCard from "./TaskCard.vue";

const store = useTodoStore()

const { showTodoItems } = storeToRefs(store);

</script>