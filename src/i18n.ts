import { createI18n } from 'vue-i18n'
import hrTranslations from "./locales/hr";
import enTranslations from "./locales/en";

export default createI18n({
  legacy: false,
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: {
    hr: {
      ...hrTranslations
    },
    en:{
    ...enTranslations
    }
  }
})
