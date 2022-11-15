<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
      <div class="nav">
        <v-text-field
          style="height: 30px"
          label="Search"
          placeholder="Item name"
          v-on:input="debounceSearch"
        ></v-text-field>
        <v-btn elevation="2" class="btn" @click="state.showDialog = true"> Add Item </v-btn>
        <AddEditItemDialog
          :showDialog="state.showDialog"
          @close="state.showDialog = false"
        ></AddEditItemDialog>
        <v-btn elevation="2" class="btn" @click="store.archiveAll()"> Archive all </v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <Tabs />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import Tabs from "./components/Tabs.vue";
import { useTodoStore } from "@/store";
import { Item } from "./models/Item";
import { ItemStatusEnum } from "./models/ItemStatusEnum";
import { storeToRefs } from "pinia";
import AddEditItemDialog from "./components/AddEditItemDialog.vue";
import _ from "lodash";

export default defineComponent({
  setup() {
    const store = useTodoStore();
    const state = reactive({ showDialog: false });
    let timeout: any = undefined;

    const debounceSearch = (value: any) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        store.searchString = value;
      }, 1000);
    };

    return {
      store,
      debounceSearch,
      state
    };
  },
  name: "App",

  components: {
    Tabs,
    AddEditItemDialog
  }
});
</script>

<style scoped lang="scss">
.nav {
  display: flex;
  gap: 20px;
}
</style>
