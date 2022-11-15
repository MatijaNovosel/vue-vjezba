<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer />
      <div class="nav">
        <v-text-field
          style="height: 30px"
          :label="$t('buttons.search')"
          v-on:input="debounceSearch"
        />
        <v-btn elevation="2" class="btn" @click="state.showDialog = true">
          {{ $t("item.addItem") }}
        </v-btn>
        <AddEditItemDialog :showDialog="state.showDialog" @close="state.showDialog = false" />
        <v-btn elevation="2" class="btn" @click="store.archiveAll()">
          {{ $t("buttons.archiveAll") }}
        </v-btn>
        <v-select
          style="height: 30px; width: 150px"
          :items="languages"
          item-value="locale"
          item-text="name"
          v-model="$i18n.locale"
          :dense="true"
          outlined
        />
      </div>
    </v-app-bar>
    <v-main>
      <Tabs />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "vue";
import Tabs from "./components/Tabs.vue";
import { useTodoStore } from "@/store";
import AddEditItemDialog from "./components/AddEditItemDialog.vue";
import i18n from "@/translations/i18n";

export default defineComponent({
  setup() {
    const store = useTodoStore();
    const state = reactive({ showDialog: false });

    const languages = computed(() => [
      {
        locale: "en",
        name: i18n.t("languages.english").toString()
      },
      {
        locale: "hr",
        name: i18n.t("languages.croatian").toString()
      }
    ]);

    let timeout: any = undefined;

    const debounceSearch = (value: any) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        store.searchString = value;
      }, 1000);
    };

    return {
      store,
      state,
      languages,
      debounceSearch
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
