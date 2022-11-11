<template>
  <div class="container">
    <ItemComponent v-for="(item, i) in filteredItems" :key="i" :item="item" />
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import ItemComponent from "@/components/Item.vue";
import useRoute from "@/composables/useRoute";
import { useTodoStore } from "@/store";
import { storeToRefs } from "pinia";

export default defineComponent({
  components: { ItemComponent },
  setup() {
    const store = useTodoStore();
    const { active, filteredItems } = storeToRefs(store);
    const { route } = useRoute();
    store.changeFlag(route.value?.name as string);

    watch(
      () => route.value,
      (val) => {
        store.changeFlag(val?.name as string);
      }
    );
    return {
      filteredItems,
      active
    };
  }
});
</script>

<style scoped lang="scss">
.container {
  padding: 10px;
  display: flex;
  justify-content: center;
  flex-shrink: 1;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
