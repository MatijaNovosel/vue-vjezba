import { createI18n } from "vue-i18n";
import en from "../translations/en";
import hr from "../translations/hr";

export default createI18n({
  locale: "hr",
  fallbackLocale: "en",
  messages: { hr: { ...hr }, en: { ...en } },
  legacy: false,
});
