import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';
import i18n from "./i18n";

import { createPinia } from 'pinia';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const pinia = createPinia();

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App)
  .use(router)
  .use(i18n)
  .use(vuetify)
  .use(pinia)
  .mount('#app');

