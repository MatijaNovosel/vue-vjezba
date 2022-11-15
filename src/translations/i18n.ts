import VueI18n from "vue-i18n";
import Vue from "vue";
import en from "@/translations/en";
import hr from "@/translations/hr";

Vue.use(VueI18n);

export default new VueI18n({
  locale: "hr",
  messages: { hr: { ...hr }, en: { ...en } }
});
