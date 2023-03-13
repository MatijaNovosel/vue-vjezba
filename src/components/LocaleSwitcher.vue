<template>
  <div>
    <select v-model="selectedLang" @change="changeLang">
      <option v-for="(lang, i) in langs" :key="`lang-${i}`" :value="lang">
        {{ lang }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { langs } from "@/utils/constants";
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "LanguageSelector",
  setup() {
    const { locale } = useI18n();
    const selectedLang = ref(locale.value);

    const changeLang = () => {
      const lang = selectedLang.value;
      locale.value = lang;
    };

    return {
      selectedLang,
      changeLang,
      langs
    };
  }
});
</script>
