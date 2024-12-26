<template>
    <div class="flex bg-gray-100 min-h-full">
        <!-- Left Section: Original Case -->
        <div class="w-1/3 bg-white rounded-lg shadow-md p-4 mr-4">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-bold">原始案件</h2>
                <button @click="handleButtonClick" class="text-blue-500 hover:text-blue-700">
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
                    <span class="font-medium">{{ value || '暂无信息' }}</span>
                </div>
            </div>
        </div>

        <!-- Right Section: Case Analysis -->
        <div class="w-2/3 bg-white rounded-lg shadow-md relative">
            <div class="">
                <img src="/invest-background.png" alt=""
                    onerror="this.onerror=null;this.src='/default-invest-background.png';">
                <span class="absolute top-2 left-2 text-lg font-bold px-2 py-1 rounded">案情解析</span>

                <button @click="handleRefreshClick"
                    class="text-blue-500 hover:text-blue-700 bg-white rounded-md p-1 border-blue-500 border absolute top-2 right-2 flex justify-center items-center">
                    <SvgIcon name="refresh-cw" />

                    重新解析

                </button>
            </div>

            <p class="text-sm text-gray-600 mb-4 absolute top-12 w-2/3 px-2 py-1 left-2">
                当前案件是一起盗窃，具体包含3个实体线索和相对完整的时空线索链，但当前证据不足以对犯罪嫌疑人进行审讯。
                <a href="#" @click.prevent="suggestInvestigation" class="text-blue-500 hover:underline">建议开展侦查</a>
            </p>

            <div class="mb-4 p-4">
                <h3 class="font-semibold mb-2">案件类型</h3>
                <div class="flex items-center">
                    <span class="mr-2">案件类型：</span>
                    <input type="text" v-model="caseType" @input="validateInput" class="border rounded px-2 py-1">
                    <button class="ml-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </button>
                </div>
            </div>

            <div class="mb-4 p-4">
                <h3 class="font-semibold mb-2">作案手段（0）</h3>
                <p class="text-sm text-gray-500 mb-2 text-center">暂无作案手段，点击下方按钮快速添加</p>
                <div class="flex flex-wrap gap-2">
                    <button v-for="action in uniqueActions" :key="action.name"
                        class="px-3 py-1 flex justify-center items-center border text-sm rounded-sm hover:text-blue-500 hover:border-blue-500 border-solid font-normal">
                        <SvgIcon :name="action.icon" />
                        {{ action.name }}
                    </button>
                </div>
            </div>

            <div class="p-4">
                <h3 class="font-semibold mb-2">实体线索（0）</h3>
                <div class="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8">
                    <div class="text-center">
                        <img src="/public/no-reason.png" alt="" class="h-24 m-auto"
                            onerror="this.onerror=null;this.src='/default-no-reason.png';">
                        <p class="text-gray-500">暂无线索</p>
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
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'

interface CaseDetails {
    [key: string]: string;
}

const caseDetails: CaseDetails = {
    '案件编号': 'A3302826800',
    '案件类型': '盗窃',
    '案件状态': '立案侦查',
    '受理时间': '2024-10-13 10:44:28',
    '立案时间': '2024-10-13 10:45:13',
    '立案单位': '',
}

const caseType = ref < string > ('盗窃')

interface Action {
    name: string;
    icon: string;
}

const actions: Action[] = [
    { name: '作案信息', icon: 'panel-top' },
    { name: '被盗物品', icon: 'package-open' },
    { name: '助逃手段', icon: 'handshake' },
    { name: '逃跑手段', icon: 'panel-top' },
    { name: '窝赃手段', icon: 'sword' },
    { name: '销赃手段', icon: 'panel-top' },
    { name: '引诱手段', icon: 'japanese-yen' },
    { name: '网络作案', icon: 'globe' },
    { name: '进入建筑', icon: 'drill' },
    { name: '离开现场', icon: 'bike' },
    { name: '窝藏受贿', icon: 'panel-top' },
    { name: '销毁手段', icon: 'panel-top' },
]

// 去重动作列表
const uniqueActions = Array.from(new Set(actions.map(a => a.name))).map(name => actions.find(a => a.name === name)) as Action[];

function handleButtonClick(): void {
    // 处理按钮点击事件
}

function handleRefreshClick(): void {
    // 处理刷新按钮点击事件
}

function suggestInvestigation(): void {
    // 处理建议开展侦查点击事件
}

function validateInput(event: Event): void {
    // 对用户输入进行验证和清理
}
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>