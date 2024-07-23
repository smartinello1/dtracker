import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
// import { createPinia } from 'pinia'

// locales
import en from '@/i18n/locales/en.json'
import it from '@/i18n/locales/it.json'

import App from '@/App.vue'
import router from '@/router'

const app = createApp(App)

// localization setup
const i18n = createI18n({
  locale: navigator.language,
  fallbackLocale: 'en',
  messages: {
    en: en,
    it: it
  }
})

app.use(i18n)
// app.use(createPinia())
app.use(router)

app.mount('#app')
