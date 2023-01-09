<template>
    <div>Test</div>
    <div>{{ todoStore.todos }}</div>
    <button>Click</button>
</template>

<script setup lang="ts">
import { useTodoStore } from '@/store/todos';

const todoStore = useTodoStore()



</script>

<style scoped>

</style>