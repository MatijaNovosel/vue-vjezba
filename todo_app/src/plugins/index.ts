import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import router from "../router";
import pinia from "../store";
import i18n from "./i18n";
import vuetify from "./vuetify";
import { loadFonts } from "./webfontloader";

import type { App } from "vue";

export function registerPlugins(app: App) {
  pinia.use(piniaPluginPersistedstate);
  loadFonts();
  app.use(vuetify).use(router).use(pinia).use(i18n);
}
