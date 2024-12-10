import { createApp } from 'vue'
import App from '@/App.vue'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'virtual:svg-icons-register'
import '@/styles/index.css'
import router from './router'
import 'tailwindcss/tailwind.css'
import i18n from './i18n'
import { createPinia } from 'pinia'
const pinia = createPinia()
const app = createApp(App)
// app.use(ElementPlus, { locale: zhCn })
import { notificationPlugin } from './plugins/notificate/notification-plugin'
app.use(notificationPlugin)
app.use(router)
app.use(pinia)
app.use(i18n)
import '../mock'
import globalComponent from '@/components'
app.use(globalComponent)
app.mount('#app')
