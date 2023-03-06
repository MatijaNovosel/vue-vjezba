<template>
  <div>
    <select v-model="selectedLang" @change="changeLang">
      <option v-for="(lang, i) in supportedLangs" :key="`lang-${i}`" :value="lang">{{ lang }}</option>
    </select>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'LanguageSelector',
  setup() {
    const { locale, messages } = useI18n()

    const supportedLangs = ['en', 'fr', 'de']
    const selectedLang = ref(locale.value)

    function changeLang() {
      const lang = selectedLang.value

      // Check if the selected language is supported
      if (supportedLangs.includes(lang)) {
        // Update the locale and the messages for the selected language
        locale.value = lang
        messages.value = require(`./locales/${lang}.json`)
      }
    }

    return {
      supportedLangs,
      selectedLang,
      changeLang
    }
  }
})
</script>
