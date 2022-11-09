<template>
  <div class="container">
    <ItemComponent
      v-for="(item, i) in items"
      :key="i"
      :item="item"
    ></ItemComponent>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, SetupContext, watch } from "vue";
import ItemComponent from "@/components/Item.vue";
import { TodoStore } from "@/store/index";
import { useRoute } from "vue-router/types/composables";

export default defineComponent({
  components: { ItemComponent },
  setup(props, context: SetupContext) {
    const store = TodoStore();

    onMounted(() => {
        console.log(context);
    });

    return {
      items: [],
    };
  },
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
