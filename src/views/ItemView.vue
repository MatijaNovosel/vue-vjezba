<template>
  <div class="container">
    <ItemComponent v-for="(item, i) in state.items" :key="i" :item="item" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from "vue";
import ItemComponent from "@/components/Item.vue";
import useRoute from "@/composables/useRoute";
import { TodoStore } from "@/store";
import { Item } from "@/models/Item";

export default defineComponent({
  components: { ItemComponent },
  setup() {
    const store = TodoStore();
    const state = reactive<{
        items: Item[]
    }>({
        items: []
    });

    const { route } = useRoute();

    watch(
      () => route.value,
      (val) => {
          debugger;
          switch(val?.path){
            case("/active"):
                state.items = store.activeItems;
                break;
            case("/done"):
                state.items = store.doneItems;
                break;
            case("/archived"):
                state.items = store.archivedItems;
                break;
          }
      },
      {
        immediate: true // ili koristi watchEffect (https://www.vuemastery.com/blog/vues-watch-vs-watcheffect-which-should-i-use/)
      }
    );
    return {
      state
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
}
</style>
