import baseService from '@/utils/http/request'
import { baseURL } from '@/utils/util'
// import type { loginForm } from './type'
// enum API {
//     LOGIN_URL = '/api/login',
//     USER_INFO_URL = '/api/userinfo',
// }
export const getCardList = () => {
    const api = baseURL + `/store/list`
    return baseService.get(api)
}
export const getUserList = (query) => {
    const api = baseURL + `/user/v1/list?page=${query}`
    return baseService.get(api)
}
export const addUser = (data) => {
    const api = baseURL + `/user/v1`
    return baseService.post(api, data)
}
