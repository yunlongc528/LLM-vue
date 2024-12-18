import { defineStore } from 'pinia'
import { ChartPieIcon } from '@heroicons/vue/24/outline'

export const useUserMenuList = defineStore('userMenuList', {
    state: () => ({
        management: [
            {
                name: '问卷调查',
                description: '',
                href: '/large-model/question-management',
                icon: ChartPieIcon,
            },
        ],
        userSettings: {
            theme: 'light',
            language: 'zh-CN',
        },
    }),
    actions: {
        // 添加菜单项
        addMenu(data) {
            const itemsToAdd = Array.isArray(data) ? data : [data]
            this.management.push(...itemsToAdd)
        },

        // 更新用户设置
        updateUserSettings(settings) {
            // 更新状态
            this.userSettings = { ...this.userSettings, ...settings }

            // 将更新后的 userSettings 保存到 localStorage
            localStorage.setItem(
                'userSettings',
                JSON.stringify(this.userSettings),
            )
        },

        // 初始化时从 localStorage 恢复 userSettings
        initializeUserSettings() {
            const storedSettings = localStorage.getItem('userSettings')
            if (storedSettings) {
                try {
                    this.userSettings = JSON.parse(storedSettings)
                } catch (error) {
                    console.error(
                        'Failed to parse userSettings from localStorage:',
                        error,
                    )
                }
            }
        },
    },
})

// 在应用启动时调用 initializeUserSettings 方法
export const setupUserMenuListStore = () => {
    const userMenuListStore = useUserMenuList()
    userMenuListStore.initializeUserSettings()
}
