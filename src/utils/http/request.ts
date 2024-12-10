import axios, { AxiosResponse } from 'axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { baseURL } from '@/utils/util'
import ls from '@/utils/Storage'
import { globalLoading } from '@/store/reactiveState'
const apiBaseUrl = 'http://41.205..121.106:80'
// console.log(apiBaseUrl)
// import emitter from '@/utils/eventBus'

// const ContentType = {
//   urlencoded: 'application/x-www-form-urlencoded;charset=UTF-8',
//   json: 'application/json',
//   formData: 'multipart/form-data'
// }
const useMock = import.meta.env.VITE_APP_USE_MOCK === 'true'
// 创建 axios 实例   withCredentials: true,
const baseService = axios.create({
    baseURL: apiBaseUrl,
    timeout: 60000,
    responseType: 'json',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
    },
})

// request interceptor
baseService.interceptors.request.use(
    (config) => {
        // globalLoading.value = true
        const token = ls.get(ACCESS_TOKEN)
        // const userinfo = ls.get(USER_INFO)
        // if (token) {
        //     config.headers['Authorization'] = 'Bearer ' + token // 让每个请求携带自定义 token 请根据实际情况自行修改
        //     config.headers['clientid'] = 'e5cd7e4891bf95d1d19206ce24a7b32e' // 让每个请求携带自定义 token 请根据实际情况自行修改
        // }
        // if (userinfo) {
        //     config.headers['username'] = userinfo.username // 让每个请求携带自定义 token 请根据实际情况自行修改
        // }
        // config.headers['Content-Type'] = ContentType[config.data instanceof FormData ? 'formData' : 'json']
        return config
    },
    (error) => {
        globalLoading.value = false
        return Promise.reject(error)
    },
)

baseService.interceptors.response.use(
    (res) => {
        globalLoading.value = false
        if (res.data.code === 200) {
            return res.data
        }
        if (res.data.code === 406) {
        } else if (
            res.data.code === 404 ||
            res.data.code === 403 ||
            res.data.code === 401
        ) {
            window.localStorage.clear()
        } else if (res.data.code === 500) {
        }
        // return res
    },
    (error) => {
        globalLoading.value = false
        const msg = error.message
        const result = error.response
        if (result) {
            const { data, status } = result
            if (data.message) {
            } else if (status === 401 || status === 403) {
            } else if (status === 500) {
                // ElMessage.error('请求数据失败, 请重试!')
            } else if (status === 406) {
                // ElMessage.error('登陆超时请重新登录!')
                // emitter.emit('axios_goto_login')
            }
        } else if (msg) {
            if (msg === 'Network Error') {
                // ElMessage.error('网络错误,请检查网络!')
                // window.localStorage.clear()
                ls.clear()
            } else {
                // ElMessage.error(msg)
            }
        } else if (error.__CANCEL__) {
            // ignore ElMessage error
        } else {
            // ElMessage.error('未知错误,请重试!')
        }
        return false
    },
)

export default baseService
