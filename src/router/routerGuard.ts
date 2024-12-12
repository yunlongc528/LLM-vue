import { start, close } from '@/utils/nprogress'
import ls from '@/utils/Storage'
import { ACCESS_TOKEN, PERMISSION, USER_INFO } from '@/store/mutation-types'
import type { Router, RouteLocationNormalized } from 'vue-router'
import { notify } from '@/plugins/notificate/notification-plugin'
import { hasPermission } from './permission'

const whiteList = [
    'home',
    'entity',
    'question',
    'admin',
    'surveyAnalysis',
    'caseDetailAnalysis',
    'recordAnalysis',
    'scoutingMap',
    'case',
] // 已开发完成的页面
const defaultRoutePath = '/large-model/homeLayout'

// 检查是否在白名单内
function isInWhiteList(to: RouteLocationNormalized): boolean {
    return to.name && typeof to.name === 'string' && whiteList.includes(to.name)
}

// 处理未登录情况
function handleUnauthenticated(to: RouteLocationNormalized, next: Function) {
    if (to.path === '/login') {
        next()
    } else {
        notify({
            type: 'info',
            title: '请重新登录',
            message: '您需要登录后才能访问此页面',
            duration: 2000,
        })
        next({ path: '/login', query: { redirect: to.fullPath } })
    }
}

// 处理已登录情况
function handleAuthenticated(to: RouteLocationNormalized, next: Function) {
    if (to.path === '/login') {
        next({ path: defaultRoutePath })
        return
    }

    const permission = ls.get(PERMISSION)
    const canAccess = hasPermission(permission, to)

    console.log(
        'Permissions:',
        permission,
        'Can Access:',
        canAccess,
        'To Path:',
        to.path,
    )

    if (canAccess && isInWhiteList(to)) {
        next()
    } else {
        notify({
            type: 'info',
            title: '正在开发中',
            message: '敬请期待',
            duration: 2000,
        })
        // next({ path: '/exception/403' })
    }
}

export const setupBeforeEach = (router: Router) => {
    router.beforeEach((to, from, next) => {
        start() // 开始加载进度条

        const isAuthenticated = ls.get(ACCESS_TOKEN) && ls.get(PERMISSION)

        if (isAuthenticated) {
            handleAuthenticated(to, next)
        } else {
            handleUnauthenticated(to, next)
        }

        close() // 确保每次导航结束后关闭加载进度条
    })
}

export const setupAfterEach = (router: Router) => {
    router.afterEach(() => {
        close() // 关闭加载进度条
    })
}
