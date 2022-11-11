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
        <v-btn elevation="2" class="btn" @click="addItem()"> Add Item </v-btn>
        <v-btn elevation="2" class="btn" @click="store.archiveAll()"> Archive all </v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <Tabs />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Tabs from "./components/Tabs.vue";
import { useTodoStore } from "@/store";
import { Item } from "./models/Item";
import { ItemStatusEnum } from "./models/ItemStatusEnum";
import { storeToRefs } from "pinia";
import _ from "lodash";

export default defineComponent({
  setup() {
    const store = useTodoStore();
    const { searchString } = storeToRefs(store);

    function addItem() {
      let element: Item = {
        description: "tette",
        createdAt: new Date(),
        status: ItemStatusEnum.Active,
        isArchived: false
      };
      store.addItem(element);
    }

    const debounceSearch = _.debounce((value: any) => {
      store.searchString = value;
    }, 1000);

    return {
      store,
      addItem,
      debounceSearch
    };
  },
  name: "App",

  components: {
    Tabs
  }
});
</script>

<style scoped lang="scss">
.nav {
  display: flex;
  gap: 20px;
}
</style>
