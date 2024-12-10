import ls from '@/utils/Storage'
import { Router } from 'vue-router'
import { ACCESS_TOKEN, USER_INFO } from '@/store/mutation-types'
// import notify from '@/plugins/notification/notify'

export const loginSuccess = (res, router: Router) => {
    // 延迟 1 秒显示欢迎信息

    if (res.data.access_token) {
        ls.set(ACCESS_TOKEN, res.data.access_token, 7 * 24 * 60 * 60 * 1000)
        // ls.set(
        //     PERMISSION,
        //     Array.isArray(res.permission)
        //         ? res.permission
        //         : res.permission.split(','),
        // )

        ls.set(USER_INFO, res)
    }
    router.push({ path: '/' })
}
