<template>
  <div class="container">
      {{ active }}
    <ItemComponent v-for="(item, i) in filteredItems" :key="i" :item="item" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from "vue";
import ItemComponent from "@/components/Item.vue";
import useRoute from "@/composables/useRoute";
import { TodoStore } from "@/store";
import { Item } from "@/models/Item";
import { storeToRefs } from "pinia";
import { ItemStatusEnum } from "@/models/ItemStatusEnum";

export default defineComponent({
  components: { ItemComponent },
  setup() {
    const { changeFlag, filteredItems, addItem, active } = TodoStore();
    const { route } = useRoute();

    watch(
      () => route.value,
      (val) => {
          let element: Item = {
                description:"tette",
                createdAt: new Date(),
                status: ItemStatusEnum.Active,
                isArchived: false
          }
          addItem(element)
          changeFlag();
      },
      {
        immediate: true
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
