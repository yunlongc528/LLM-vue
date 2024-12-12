import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
    state: () => ({
        token: null,
        roles: [],
        isLoggedIn: false,
    }),
    actions: {
        async login(username, password) {
            try {
                const response = await axios.post('/api/login', {
                    username,
                    password,
                })
                if (response.data.code === 200) {
                    this.token = response.data.data.token
                    this.roles = response.data.data.roles
                    this.isLoggedIn = true
                    return { success: true, message: response.data.message }
                }
                return { success: false, message: response.data.message }
            } catch (error) {
                return { success: false, message: '登录请求失败' }
            }
        },
        logout() {
            this.token = null
            this.roles = []
            this.isLoggedIn = false
        },
    },
})
