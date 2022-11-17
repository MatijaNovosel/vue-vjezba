<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-spacer />
      <div class="d-flex flex-gap-20">
        <v-text-field hide-details :label="$t('buttons.search')" @input="debounceSearch" />
        <v-btn elevation="2" class="btn" @click="store.OpenAddEditDialog(false)">
          {{ $t("item.addItem") }}
        </v-btn>
        <AddEditItemDialog
          :showDialog="store.addEditItemDialogState.showDialog"
          @close="store.CloseAddEditDialog"
        />
        <v-btn elevation="2" class="btn" @click="store.archiveAll">
          {{ $t("buttons.archiveAll") }}
        </v-btn>
        <v-select
          hide-details
          :items="languages"
          item-value="locale"
          item-text="name"
          v-model="$i18n.locale"
          dense
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
import { computed, defineComponent } from "vue";
import Tabs from "./components/Tabs.vue";
import { useTodoStore } from "@/store";
import AddEditItemDialog from "./components/AddEditItemDialog.vue";
import i18n from "@/translations/i18n";

export default defineComponent({
  name: "App",

  components: {
    Tabs,
    AddEditItemDialog
  },

  setup() {
    const store = useTodoStore();
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

    let timeout: number | undefined = undefined;

    const debounceSearch = (value: string) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        store.searchString = value;
      }, 1000);
    };

    return {
      store,
      languages,
      debounceSearch
    };
  }
});
</script>
