import "@mdi/font/css/materialdesignicons.css";
import { Field, Form } from "vee-validate";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";
import i18n from "./i18n";

import { createPinia } from "pinia";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/routes";
import "./validators";

const pinia = createPinia();

const vuetify = createVuetify({
  components,
  directives
});

createApp(App)
  .use(pinia)
  .use(router)
  .use(i18n)
  .use(vuetify)
  .component("vv-field", Field)
  .component("vv-form", Form)
  .mount("#app");
