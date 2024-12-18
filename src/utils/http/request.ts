import axios, {
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios'
import { ACCESS_TOKEN } from '@/stores/mutation-types'
import { baseURL } from '@/utils/util'
import ls from '@/utils/Storage'
import { globalLoading } from '@/stores/reactiveState'
const apiBaseUrl = 'http://41.205.121.106:80'

const useMock = import.meta.env.VITE_APP_USE_MOCK === 'true'
const baseService = axios.create({
    baseURL: apiBaseUrl,
    timeout: 60000,
    responseType: 'json',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
    },
})
const handleError = (error: any): Promise<never> => {
    globalLoading.value = false
    const { message, response } = error
    if (response) {
        const { status, data } = response
        if (status === 401 || status === 403) {
            // ls.clear()
            // 提示用户登录过期或无权限
        } else if (status === 500) {
            console.error('服务器内部错误')
        } else {
            console.error(data.message || '未知错误')
        }
    } else if (message === 'Network Error') {
        console.error('网络错误，请检查网络连接')
        // ls.clear()
    } else {
        console.error(message || '未知错误')
    }
    return Promise.reject(error)
}
// request interceptor
baseService.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = ls.get(ACCESS_TOKEN)
        if (token) {
            config.headers.set('Authorization', `Bearer ${token}`)
        }
        globalLoading.value = true // 启用全局加载状态
        return config
    },
    (error) => handleError(error),
)

baseService.interceptors.response.use(
    (response: AxiosResponse) => {
        globalLoading.value = false
        const { data } = response
        if (data.code !== 200) {
            return Promise.reject(new Error(data.message || '请求失败'))
        }
        return data
    },
    (error) => handleError(error),
)

export default baseService
