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
          {{ item.createdAt }}
        </v-card-text>
      </div>
      <div class="right">
        <v-card-actions>
          <v-btn
            v-if="item.status === status.Active"
            color="primary"
            @click="store.finishTask(item)"
          >
            Done
          </v-btn>
          <v-btn color="primary" @click="state.showDialog = true">Edit</v-btn>
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
  setup() {
    const store = useTodoStore();
    const status = ItemStatusEnum;
    const state = reactive({ showDialog: false });
    return {
      status,
      store,
      state
    };
  },
  components: { AddEditItemDialog }
});
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-width: 500px;
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
