import Vue from "vue";
import { createPinia, PiniaVuePlugin } from "pinia";
import App from "./App.vue";
import { router } from "./router";
import vuetify from "./plugins/vuetify";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import i18n from "@/translations/i18n";

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

Vue.config.productionTip = false;
Vue.use(PiniaVuePlugin);

const pinia = createPinia();

new Vue({
  router,
  pinia,
  vuetify,
  i18n,
  render: (h) => h(App)
}).$mount("#app");
