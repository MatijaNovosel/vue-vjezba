import { createI18n } from "vue-i18n";
import hr from "../translations/hr";
import en from "../translations/en";

export default createI18n({
  locale: "hr",
  fallbackLocale: "en",
  messages: { hr: { ...hr }, en: { ...en } },
  legacy: false
});
