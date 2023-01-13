import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import i18n from './i18n';
import pinia from '../store'
import router from '../router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import type { App } from 'vue'

export function registerPlugins (app: App) {
  pinia.use(piniaPluginPersistedstate)
  loadFonts()
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(i18n)
}
