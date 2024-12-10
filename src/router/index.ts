import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import { constantRoute } from './routes'
import { setupBeforeEach, setupAfterEach } from './routerGuard'
const whiteList = ['login', 'register', 'registerResult'] // 不进行拦截的路由名称集合

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoute as unknown as RouteRecordRaw[],
    scrollBehavior() {
        return { top: 0, left: 0 }
    },
})

setupBeforeEach(router)

setupAfterEach(router)
export default router
