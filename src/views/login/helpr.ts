import { timeFix } from '@/utils/util'
import ls from '@/utils/Storage'
import { ACCESS_TOKEN, PERMISSION, USER_INFO } from '@/stores/mutation-types'
import { notify } from '@/plugins/notificate/notification-plugin'
import { Router } from 'vue-router'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
export const loginSuccess = async (res, router: Router) => {
    // 延迟 1 秒显示欢迎信息
    try {
        await delay(1000)
        notify({
            type: 'success',
            title: '欢迎',
            message: `${timeFix()}，欢迎回来`,
            duration: 2000,
        })
    } catch (error) {
        console.error('延迟显示欢迎信息失败:', error)
    }
    if (res.token) {
        ls.set(ACCESS_TOKEN, res.token, 7 * 24 * 60 * 60 * 1000)
        ls.set(
            PERMISSION,
            Array.isArray(res.permission)
                ? res.permission
                : res.permission.split(','),
        )
        ls.set(USER_INFO, res)
        const menuItems = res.roles.includes('admin')
            ? [
                  {
                      name: '问卷调查',
                      description: '',
                      href: '/large-model/question-management',
                      icon: 'file',
                  },
                  {
                      name: '菜单管理',
                      description: '管理平台用户',
                      href: '/large-model/menu-management',
                      icon: 'menu',
                  },
                  {
                      name: '权限管理',
                      description: '配置用户权限',
                      href: '/large-model/permission-settings',
                      icon: 'fingerprint',
                  },
                  {
                      name: '用户管理',
                      description: '配置用户权限',
                      href: '/large-model/permission-ss',
                      icon: 'usersetting',
                  },
              ]
            : [
                  {
                      name: '问卷调查',
                      description: '',
                      href: '/large-model/question-management',
                      icon: 'file',
                  },
              ]

        ls.set('menuItems', JSON.stringify(menuItems))
    }
    router.push({ path: '/' })
}
export const requestFailed = (err) => {
    notify({
        type: 'error',
        title: 'error',
        message: ((err.response || {}).data || {}).message || '账号密码错误',
        duration: 3000,
    })
}
