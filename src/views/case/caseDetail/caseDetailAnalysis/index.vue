<template>
    <div class="flex bg-gray-100 min-h-full">
        <!-- Left Section: Original Case -->
        <div class="w-1/3 bg-white rounded-lg shadow-md p-4 mr-4">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-bold">原始案件</h2>
                <button class="text-blue-500 hover:text-blue-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                </button>
            </div>
            <div class="space-y-2">
                <div class="flex items-center">
                    <span class="px-2 py-1 bg-orange-200 text-orange-800 rounded-full text-xs font-semibold">未结案</span>
                </div>
                <div v-for="(value, key) in caseDetails" :key="key" class="flex justify-between">
                    <span class="text-gray-600">{{ key }}:</span>
                    <span class="font-medium">{{ value }}</span>
                </div>
            </div>
        </div>

        <!-- Right Section: Case Analysis -->
        <div class="w-2/3 bg-white rounded-lg shadow-md p-4">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-bold">案情解析</h2>
                <button class="text-blue-500 hover:text-blue-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                            clip-rule="evenodd" />
                    </svg>
                </button>
            </div>

            <p class="text-sm text-gray-600 mb-4">
                当前案件是一起盗窃，具体包含3个实体线索和相对完整的时空线索链，但当前证据不足以对犯罪嫌疑人进行审讯。
                <a href="#" class="text-blue-500 hover:underline">建议开展侦查</a>
            </p>

            <div class="mb-4">
                <h3 class="font-semibold mb-2">案件类型</h3>
                <div class="flex items-center">
                    <span class="mr-2">案件类型：</span>
                    <input type="text" v-model="caseType" class="border rounded px-2 py-1">
                    <button class="ml-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </button>
                </div>
            </div>

            <div class="mb-4">
                <h3 class="font-semibold mb-2">作案手段（0）</h3>
                <p class="text-sm text-gray-500 mb-2">暂无作案手段，点击下方按钮快速添加</p>
                <div class="flex flex-wrap gap-2">
                    <button v-for="action in actions" :key="action"
                        class="px-3 py-1 bg-gray-100 text-sm rounded-full hover:bg-gray-200">
                        {{ action }}
                    </button>
                </div>
            </div>

            <div>
                <h3 class="font-semibold mb-2">实体线索（0）</h3>
                <div class="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8">
                    <div class="text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mx-auto mb-2"
                            viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                clip-rule="evenodd" />
                        </svg>
                        <p class="text-gray-500">暂无线索</p>
                    </div>
                </div>
                <div class="flex justify-center mt-4 space-x-2">
                    <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        + 手动添加
                    </button>
                    <button class="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50">
                        基于案情重新解析
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const caseDetails = {
    '案件编号': 'A3302826800',
    '案件类型': '盗窃',
    '案件状态': '立案侦查',
    '受理时间': '2024-10-13 10:44:28',
    '立案时间': '2024-10-13 10:45:13',
    '立案单位': '',
}

const caseType = ref('盗窃')

const actions = [
    '作案信息', '被盗物品', '助逃手段', '逃跑手段', '窝赃手段', '销赃手段', '引诱手段',
    '网络作案', '进入建筑', '离开现场', '窝藏受贿', '销毁手段'
]
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>