import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { i18n } from './plugins/i18n'
import './style.css'

const app = createApp(App)
app.use(i18n)
app.use(router)
app.mount('#app')
