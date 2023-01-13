<template>
    <v-window-item>
        <task-card v-for="item of showTodoItems" :key="item.id" :list-item="item" />
    </v-window-item>
</template>

<script lang="ts" setup>
import TaskCard from "./TaskCard.vue";
import { storeToRefs } from "pinia";
import { useTodoStore } from '@/store/todos';

const store = useTodoStore()

const {  showTodoItems } = storeToRefs(store);

</script>