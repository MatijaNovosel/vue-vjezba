<template>
  <v-card v-on="item.isArchived ? { click: () => store.unarchiveItem(item) } : {}">
    <div class="d-flex">
      <div>
        <v-card-title>
          <span
            class="headline font-weight-bold"
            :class="{ 'text-decoration-line-through': item.status === ItemStatusEnum.Done }"
          >
            {{ item.description }}
          </span>
        </v-card-title>
        <v-card-text class="font-weight-light">
          {{ $t("item.daysAgo", { daysAgo: daysAgo }) }} ({{ formattedDate }})
        </v-card-text>
      </div>
      <div class="d-flex">
        <v-card-actions>
          <v-btn
            v-if="item.status === ItemStatusEnum.Active"
            color="primary"
            @click="store.finishTask(item)"
          >
            {{ $t("buttons.done") }}
          </v-btn>
          <v-btn color="primary" @click="store.OpenAddEditDialog(true, item)">{{
            $t("buttons.edit")
          }}</v-btn>
          <!--<AddEditItemDialog
            :showDialog="state.showDialog"
            :item="item"
            @close="state.showDialog = false"
          ></AddEditItemDialog>-->
        </v-card-actions>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Item } from "@/models/Item";
import { computed, defineComponent, PropType } from "vue";
import { ItemStatusEnum } from "@/models/ItemStatusEnum";
import { useTodoStore } from "@/store";
import AddEditItemDialog from "./AddEditItemDialog.vue";

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<Item>,
      required: true
    }
  },
  components: { AddEditItemDialog },

  setup(props) {
    const store = useTodoStore();

    const daysAgo = computed(() =>
      Math.round(
        Math.abs(new Date().getTime() - new Date(props.item.createdAt).getTime()) /
          (1000 * 3600 * 24)
      )
    );
    const formattedDate = computed(() => new Date(props.item.createdAt).toLocaleString());

    return {
      ItemStatusEnum,
      store,
      daysAgo,
      formattedDate
    };
  }
});
</script>
