<template>
  <v-card
    width="fit-content"
    padding="10px"
    v-on="item.isArchived ? { click: () => store.unarchiveItem(item) } : {}"
  >
    <div class="container">
      <div class="left">
        <v-card-title>
          <span
            class="headline font-weight-bold"
            :class="{ doneTitle: item.status === status.Done }"
          >
            {{ item.description }}
          </span>
        </v-card-title>
        <v-card-text class="font-weight-light">
          {{ $t("item.daysAgo", { daysAgo: daysAgo }) }} ({{ formattedDate }})
        </v-card-text>
      </div>
      <div class="right">
        <v-card-actions>
          <v-btn
            v-if="item.status === status.Active"
            color="primary"
            @click="store.finishTask(item)"
          >
            {{ $t("buttons.done") }}
          </v-btn>
          <v-btn color="primary" @click="state.showDialog = true">{{ $t("buttons.edit") }}</v-btn>
          <AddEditItemDialog
            :showDialog="state.showDialog"
            :item="item"
            @close="state.showDialog = false"
          ></AddEditItemDialog>
        </v-card-actions>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Item } from "@/models/Item";
import { defineComponent, PropType, reactive } from "vue";
import { ItemStatusEnum } from "@/models/ItemStatusEnum";
import { useTodoStore } from "@/store";
import AddEditItemDialog from "./AddEditItemDialog.vue";

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<Item>,
      required: true,
      default: {}
    }
  },
  setup(props) {
    const store = useTodoStore();
    const status = ItemStatusEnum;

    const daysAgo = Math.round(
      Math.abs(new Date().getTime() - props.item.createdAt.getTime()) / (1000 * 3600 * 24)
    );
    const formattedDate =
      props.item.createdAt.toLocaleDateString() + " " + props.item.createdAt.toLocaleTimeString();

    const state = reactive({ showDialog: false });
    return {
      status,
      store,
      state,
      daysAgo,
      formattedDate
    };
  },
  components: { AddEditItemDialog }
});
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.left {
  padding-right: 10px;
}
.right {
  display: flex;
}
.doneTitle {
  text-decoration: line-through;
}
</style>
