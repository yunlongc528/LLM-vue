import { close, start } from '@/utils/nprogress/'
import type { Router } from 'vue-router'
import { ACCESS_TOKEN, PERMISSION } from '@/store/mutation-types'
import ls from '@/utils/Storage'
import { hasPermission } from './permission'

import { setDocumentTitle } from '@/utils/domUtil'
const defaultRoutePath = '/pos/pos'
const whiteList = [
    'surveyAnalysis',
    'caseDetailAnalysis',
    'recordAnalysis',
    'home',
    'case',
    'scoutingMap',
    'login',
    'entity',
    'question',
    'admin',
] // 不进行拦截的路由名称集合
import { notify } from '@/plugins/notificate/notification-plugin'
// const { notify } = useNotification()

export const setupBeforeEach = (router: Router) => {
    router.beforeEach((to, from, next) => {
        // console.log(ls.get(ACCESS_TOKEN), ls.get(PERMISSION))
        setDocumentTitle(to)

        console.log('beforeEach', to)
        if (whiteList.includes(to.name as any)) {
            start()

            next()
        } else {
            notify({
                type: 'info',
                title: '该功能正在开发中',
                message: '敬请期待',
                duration: 2000,
            })
        }
        // if (ls.get(ACCESS_TOKEN)) {
        //     /* has token */
        //     if (to.path === '/login') {
        //         next({ path: defaultRoutePath })
        //         close()
        //     } else {
        //         const permission = ls.get(PERMISSION)
        //         const canAccess = hasPermission(permission, to)

        //         if (canAccess) {
        //             next()
        //         } else {
        //             next({ path: '/exception/403' })
        //         }
        //     }
        // } else {
        //     if (whiteList.includes(to.name as string)) {
        //         // 在免登录白名单，直接进入
        //         next()
        //     } else {
        //         next({ path: '/login', query: { redirect: to.fullPath } })
        //         close() // if current page is login will not trigger afterEach hook, so manually handle it
        //     }
        // }
    })

    // 路由懒加载失败时的提示
    router.onError((error) => {
        // if (window.env === 'localhost') {
        //     notification.error({
        //         message: 'Dynamic import error',
        //         description: error.stack,
        //     })
        // } else {
        //     router.push({ name: 'error', params: { errorMsg: error.stack } })
        // }
        console.log(error)
        // notify({
        //     type: 'error',
        //     title: '访问被拒绝',
        //     message: '请先登录以访问此页面',
        //     duration: 5000,
        // })
    })
}
export const setupAfterEach = (router: Router) => {
    router.afterEach(() => {
        close() // finish progress bar
    })
}
