import baseService from '@/utils/http/request'
import { baseURL } from '@/utils/util'
// import type { loginForm } from './type'
// enum API {
//     LOGIN_URL = '/api/login',
//     USER_INFO_URL = '/api/userinfo',
// }
const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL // 从环境变量获取 API 基础路径

export const userLogin = (data) => {
    const api = baseURL + `/auth/login`
    return baseService.post(api, data)
}
export const signOut = (data) => {
    const api = baseURL + `/auth/logout`
    return baseService.post(data)
}
export const getUsers = () => {
    return baseService.get(`${apiBaseUrl}/users`)
}
