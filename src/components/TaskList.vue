<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <span v-if="!tasks.length">{{ $t("noTasksMessage") }}</span>
        <template v-else>
          <v-card
            v-for="(task, index) in tasks"
            :key="index"
            outlined
            class="my-3"
          >
            <slot name="task" :task="task"></slot>
          </v-card>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  tasks: {
    type: Array,
    default: () => []
  }
});
</script>
