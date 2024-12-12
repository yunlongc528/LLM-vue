import { ChartPieIcon } from '@heroicons/vue/24/outline'
import { defineStore } from 'pinia'
export const useUserMenuList = defineStore('useUserMenuList', {
    state: () => {
        return {
            management: [
                {
                    name: '问卷调查',
                    description: '',
                    href: '/large-model/question-management',
                    icon: ChartPieIcon,
                },
            ],
        }
    },
    // 也可以这样定义
    // state: () => ({ count: 0 })
    actions: {
        addMenu(data) {
            // 如果 data 是一个对象，将其包装成数组
            const itemsToAdd = Array.isArray(data) ? data : [data]

            // 将所有项目添加到 management 数组中
            this.management.push(...itemsToAdd)
        },
    },
    getters: {},
})
