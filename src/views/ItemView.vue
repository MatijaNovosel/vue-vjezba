<template>
  <div class="container">
    <ItemComponent v-for="(item, i) in items" :key="i" :item="item" />
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import ItemComponent from "@/components/Item.vue";
import useRoute from "@/composables/useRoute";

export default defineComponent({
  components: { ItemComponent },
  setup() {
    const { route } = useRoute();

    watch(
      () => route.value,
      (val) => {
        console.log(val);
      },
      {
        immediate: true // ili koristi watchEffect (https://www.vuemastery.com/blog/vues-watch-vs-watcheffect-which-should-i-use/)
      }
    );

    return {
      items: []
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
