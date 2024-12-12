import baseService from '@/utils/http/request'

// 从环境变量获取 API 基础路径
const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL // 在 .env 文件中设置 VITE_APP_API_BASE_URL

// 用户登录
export const userLogin = (data: any) => {
    const api = `${apiBaseUrl}/auth/login` // 使用 apiBaseUrl 作为基础路径
    return baseService.post(api, data) // 调用 baseService 的 post 方法进行登录请求
}

// 用户退出登录
export const signOut = () => {
    const api = `${apiBaseUrl}/auth/logout` // 使用 apiBaseUrl 作为基础路径
    return baseService.post(api) // 调用 baseService 的 post 方法进行退出请求
}

// 获取用户列表
export const getUsers = () => {
    const api = `${apiBaseUrl}/users` // 使用 apiBaseUrl 作为基础路径
    return baseService.get(api) // 调用 baseService 的 get 方法获取用户数据
}
