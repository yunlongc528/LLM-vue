<template>
    <div class="bg-blue-50 p-2">
        <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
                <button class="mr-4 text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
                <h1 class="text-xl font-bold text-gray-800">盗窃案</h1>
                <span class="ml-2 px-2 py-1 bg-gray-200 text-gray-700 text-sm rounded-full">未研判</span>
            </div>
            <div class="flex space-x-2">
                <button v-for="action in topActions" :key="action"
                    class="px-3 py-1 bg-white text-gray-600 rounded-md text-sm hover:bg-gray-100">
                    {{ action }}
                </button>
            </div>
        </div>
        <div class="flex flex-wrap -mx-1">
            <div v-for="(action, index) in bottomActions" :key="index" class="px-1 mb-2">
                <router-link :to="action.path" active-class="bg-blue-500 text-white rounded-md "
                    class="text-sm  leading-6 p-2 text-gray-900">
                    <span v-if="action.icon" class="mr-1">{{ action.icon }}</span>
                    {{ action.label }}
                </router-link>
            </div>
        </div>
    </div>
    <router-view />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const topActions = ref(['简要案情', '操作指引', '案件详情'])
interface MenuAction {
    label: string;
    icon: string;
    path: string;
}
const bottomActions = ref<MenuAction[]>([
    { label: '案情解析', icon: '📊', path: 'analysis' },
    { label: '现勘解析', icon: '🔍', path: 'survey' },
    { label: '笔录解析', icon: '📝', path: 'record' },
    { label: '智能调证', icon: '🧠', path: 'b' },
    { label: '', icon: '»', path: 'c' },
    { label: '侦查导图', icon: '🗺️', path: 'scoutingMap' },
    { label: '价值实体库', icon: '💼', path: 'valueEntity' },
    { label: '', icon: '»', path: 'f' },
    { label: 'AI报告', icon: '🤖', path: 'h' },
])

// Add any necessary methods here
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>