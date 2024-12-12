import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { setupBeforeEach, setupAfterEach } from './routerGuard'
import { constantRoute, privateRoutes } from './routes'

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoute as RouteRecordRaw[],
    scrollBehavior: () => ({ top: 0, left: 0 }), // 保证页面回到顶部
})

setupBeforeEach(router) // 添加路由守卫
setupAfterEach(router) // 路由完成后的操作
function addRoutes(routes) {
    routes.forEach((route) => {
        router.addRoute(route)
    })
}
// 检查用户是否有权限访问路由
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some((role) => route.meta.roles.includes(role))
    } else {
        return true // 如果没有设置meta.roles，则默认允许访问
    }
}

function initRoutes() {
    const token = localStorage.getItem('token')
    if (token) {
        const userRoles = JSON.parse(localStorage.getItem('userRoles')) // 假设角色信息存储在这里
        const accessibleRoutes = privateRoutes.filter((route) =>
            hasPermission(userRoles, route),
        )
        addRoutes(accessibleRoutes)
        console.log('当前用户可访问的路由:', accessibleRoutes) // 打印当前用户可访问的路由
    }
}
initRoutes()

export default router
