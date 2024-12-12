import { timeFix } from '@/utils/util'
import ls from '@/utils/Storage'
import { ACCESS_TOKEN, PERMISSION, USER_INFO } from '@/store/mutation-types'
import { notify } from '@/plugins/notificate/notification-plugin'
import { useUserMenuList } from '@/store/userMenu'
import { Router } from 'vue-router'
const UserMenuList = useUserMenuList()
import { ChartPieIcon } from '@heroicons/vue/24/outline'

export const loginSuccess = (res, router: Router) => {
    // 延迟 1 秒显示欢迎信息
    setTimeout(() => {
        notify({
            type: 'success',
            title: '欢迎',
            message: `${timeFix()}，欢迎回来`,
            duration: 2000,
        })
    })
    if (res.token) {
        ls.set(ACCESS_TOKEN, res.token, 7 * 24 * 60 * 60 * 1000)
        ls.set(
            PERMISSION,
            Array.isArray(res.permission)
                ? res.permission
                : res.permission.split(','),
        )
        ls.set(USER_INFO, res)
        if (res.roles.includes('admin')) {
            UserMenuList.addMenu([
                {
                    name: '用户管理',
                    description: '管理平台用户',
                    href: '/large-model/user-management',
                    icon: ChartPieIcon,
                },
                {
                    name: '权限设置',
                    description: '配置用户权限',
                    href: '/large-model/permission-settings',
                    icon: ChartPieIcon,
                },
            ])
        }
    }
    router.push({ path: '/' })
}
export const requestFailed = (err) => {
    notify({
        type: 'error',
        title: 'error',
        message:
            ((err.response || {}).data || {}).message ||
            '请求出现错误，请稍后再试',
        duration: 4000,
    })
}
