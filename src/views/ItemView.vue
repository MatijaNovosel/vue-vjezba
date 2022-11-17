<template>
  <div class="d-flex flex-shrink-1 flex-wrap justify-center p-a-3 flex-gap-10">
    <ItemComponent v-for="(item, i) in filteredItems" :key="item.id" :item="item" />
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
