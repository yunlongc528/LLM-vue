<template>
    <div class="flex h-screen bg-gray-50">
        <!-- Left Sidebar -->
        <div class="w-64 bg-white border-r">
            <div class="p-4">
                <h2 class="text-lg font-medium mb-4">笔录文件 (8)</h2>
                <button
                    class="w-full bg-blue-600 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700 transition-colors">
                    <span class="flex items-center justify-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        上传笔录
                    </span>
                </button>

                <div class="mb-4">
                    <input type="text" placeholder="搜索人名"
                        class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>

                <div class="space-y-2">
                    <div v-for="record in records" :key="record.id"
                        :class="['p-3 rounded-md cursor-pointer', record.active ? 'bg-blue-50' : 'hover:bg-gray-50']">
                        <div class="text-sm font-medium">{{ record.title }}</div>
                        <div class="text-xs text-gray-500 mt-1">
                            询问：{{ record.interviewer }}
                            <br>
                            记录：{{ record.recorder }}
                        </div>
                        <div class="text-xs text-gray-500 mt-1">{{ record.datetime }}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="flex-1 flex">
            <!-- Document Viewer -->
            <div class="flex-1 p-4">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-lg font-medium">第1次，共4页</h2>
                    <div class="flex space-x-2">
                        <button class="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
                            重新解析
                        </button>
                        <button class="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
                            删除文件
                        </button>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow p-6 min-h-[600px]">
                    <h1 class="text-center text-xl font-medium mb-8">询问笔录</h1>
                    <!-- Document content would go here -->
                </div>
            </div>

            <!-- Right Panel -->
            <div class="w-80 bg-white border-l p-4">
                <div class="flex border-b mb-4">
                    <button class="px-4 py-2 text-sm font-medium border-b-2 border-blue-600 text-blue-600">
                        文件线索
                    </button>
                    <button class="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                        基本信息
                    </button>
                </div>

                <div class="space-y-4">
                    <div v-for="entity in entities" :key="entity.id" class="border rounded-lg p-4">
                        <div class="flex items-center justify-between mb-3">
                            <div class="flex items-center">
                                <div class="w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center mr-2">
                                    <component :is="entity.icon" class="w-4 h-4 text-purple-600" />
                                </div>
                                <span class="font-medium">{{ entity.type }}</span>
                            </div>
                            <div class="flex space-x-2">
                                <button class="text-gray-400 hover:text-gray-600">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </button>
                                <button class="text-gray-400 hover:text-gray-600">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span class="text-gray-500">账号：</span>
                                <span>{{ entity.account }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500">支付属性：</span>
                                <span>{{ entity.paymentStatus }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500">姓名：</span>
                                <span>{{ entity.name }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500">角色：</span>
                                <span>{{ entity.role }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const records = ref([
    {
        id: 1,
        title: '第1次，共4页',
        interviewer: '张林林',
        recorder: '浙江省',
        datetime: '2024年10月14日14时26分~2024年10月14日15时26分',
        active: true
    },
    {
        id: 2,
        title: '第1次，共4页',
        interviewer: '王军亮',
        recorder: '浙江省',
        datetime: '2024年10月12日14时07分~2024年10月12日15时07分',
        active: false
    },
    {
        id: 3,
        title: '第1次，共4页',
        interviewer: '胡国浙',
        recorder: '浙江省',
        datetime: '2024年10月10日10时10分~2024年10月10日11时10分',
        active: false
    }
])

const entities = ref([
    {
        id: 1,
        type: '微信账号',
        icon: 'WechatIcon',
        account: 'licong8899',
        paymentStatus: '未用于支付',
        name: '助中',
        role: '受害'
    },
    {
        id: 2,
        type: '微信账号',
        icon: 'WechatIcon',
        account: 'chicharito1414',
        paymentStatus: '未用于支付',
        name: '罗小杰',
        role: '嫌疑'
    },
    {
        id: 3,
        type: 'APP',
        icon: 'AppIcon',
        account: '微信',
        paymentStatus: '',
        name: '',
        role: '嫌疑'
    }
])

// Mock icons components
const WechatIcon = {
    template: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    `
}

const AppIcon = {
    template: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    `
}
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>