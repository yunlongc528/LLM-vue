<template>
    <div class="bg-blue-50 p-2">
        <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
                <button class="mr-4 text-gray-600" @click="goback">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
                <h1 class="text-xl font-bold text-gray-800">{{ title }}</h1>
                <span class="ml-2 px-2 py-1 bg-gray-200 text-gray-700 text-sm rounded-full">{{ status }}</span>
            </div>
            <div class="flex space-x-2">

                <Popover class="relative ">
                    <PopoverButton
                        class="px-3 py-1 text-gray-600 rounded-md text-sm hover:text-blue-500 flex items-center justify-center">
                        <SvgIcon name="book-marked" />简要案情
                    </PopoverButton>

                    <PopoverPanel class="absolute z-10 -left-24">
                        <div class="bg-white p-4 w-96">
                            <div class="mb-3 font-semibold text-xl">简要案情</div>
                            <div class="text-sm text-gray-700">2024年9月24日，
                                当前案件是一起盗窃，具体包含3个实体线索和相对完整的时空线索链，但当前证据不足以对犯罪嫌疑人进行审讯。</div>

                        </div>


                    </PopoverPanel>
                </Popover>
                <button @click="hadnleAction()"
                    class="px-3 py-1 text-gray-600 rounded-md text-sm hover:text-blue-500 flex items-center justify-center">
                    <SvgIcon name="circle-help" />操作指引

                </button>
                <button
                    class="px-3 py-1 text-gray-600 rounded-md text-sm hover:text-blue-500 flex items-center justify-center">
                    <SvgIcon name="book-open-check" /> 案件详情
                </button>
            </div>
        </div>
        <div class="flex flex-wrap -mx-1">
            <div v-for="(action) in bottomActions" :key="action.key" class="my-1 mx-1">
                <router-link v-if="action.icon" :to="action.path" active-class="bg-blue-500 text-white rounded-md "
                    class="p-2">
                    <span>
                        <SvgIcon :name="action.icon || 'default-icon'" class="inline-block"></SvgIcon>
                    </span>

                    {{ action.label || '' }}
                </router-link>
                <span v-if="action.svg"
                    class="bg-blue-500 rounded-full text-white p-1 flex items-center justify-center">
                    <svg-icon :name="action.svg || 'default-svg'" class="inline "></svg-icon>
                </span>
            </div>
        </div>
    </div>
    <Dialog v-model="dialogVisible" title="操作指引">
        <div class="p-4">
            <img src="/public/guide-image.png" alt="">
        </div>

    </Dialog>
    <router-view />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import Dialog from '@/components/Dialog/index.vue';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
// Extracted configuration for better maintainability
const title = '盗窃案';
const status = '未研判';
let dialogVisible = ref(false);
interface Action {
    label: string;
    key: string;
}

interface MenuAction extends Action {
    icon?: string;
    path?: string;
    svg?: string;
}

const topActions = ref<Action[]>([
    { label: '简要案情', key: 'book-marked' },
    { label: '操作指引', key: 'circle-help' },
    { label: '案件详情', key: 'book-open-check' }
]);

const bottomActions = ref<MenuAction[]>([
    { label: '案情解析', icon: 'analysis-white', path: 'analysis', key: 'analysis' },
    { label: '现勘解析', icon: 'clue-white', path: 'survey', key: 'survey' },
    { label: '笔录解析', icon: 'evidence-white', path: 'record', key: 'record' },
    { label: '智能调证', icon: '🧠', path: 'b', key: 'smartEvidence' },
    { label: '', svg: 'chevrons-left', path: 'b', key: 'smartEvidence' },
    { label: '侦查导图', icon: 'judgment', path: 'scoutingMap', key: 'scoutingMap' },
    { label: '价值实体库', icon: 'survey-white', path: 'valueEntity', key: 'valueEntity' },
    { label: '', svg: 'chevrons-right', path: 'b', key: 'smartEvidence' },

    { label: 'AI报告', icon: 'record-white', path: 'h', key: 'aiReport' }
]);
const hadnleAction = () => {
    dialogVisible.value = true
};
const goback = () => {
    window.history.back()
};
// Add any necessary methods here
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>