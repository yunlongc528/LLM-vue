import { createApp } from 'vue'
import App from '@/App.vue'
import 'virtual:svg-icons-register' // 注册 SVG 图标
import 'tailwindcss/tailwind.css' // 引入 TailwindCSS
import '@/styles/index.css' // 全局样式

import router from './router' // 路由
import { createPinia } from 'pinia' // 状态管理
import { notificationPlugin } from './plugins/notificate/notification-plugin' // 通知插件
import globalComponent from '@/components' // 全局组件注册

// 初始化 Mock 数据（开发模式）
async function setupMocks() {
    if (import.meta.env.MODE === 'development') {
        const { setupMock } = await import('@/mock')
        setupMock()
    }
}

// 应用初始化
async function bootstrap() {
    const app = createApp(App)

    const pinia = createPinia()
    app.use(pinia)
    app.use(router)
    app.use(notificationPlugin)
    app.use(globalComponent)

    await setupMocks() // 初始化 Mock 数据
    app.mount('#app')
}

bootstrap()
