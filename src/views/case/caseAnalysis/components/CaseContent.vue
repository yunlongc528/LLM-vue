<template>
    <div class="bg-white p-4 shadow-sm mt-2  rounded-lg ">
        <div class="flex justify-between items-center">
            <div class="flex ">
                <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
                    'px-2 py-2 font-medium rounded-md',
                    activeTab === tab.id
                        ? ' text-blue-600 text-xl'
                        : 'text-gray-500 text-sm hover:text-gray-700'
                ]">
                    <span v-if="tab.icon" class="mr-2">{{ tab.icon }}</span>
                    {{ tab.label }}
                </button>
            </div>

        </div>
        <div class="flex   bg-white p-2 rounded-lg shadow-sm">
            <div class="flex space-x-4">
                <button @click="addNewCase"
                    class="px-2  bg-blue-600 text-white text-sm  rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    + 新增案件
                </button>
                <button @click="batchImport"
                    class="px-2  bg-white text-gray-700 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    批量导入
                </button>
            </div>
            <div class="relative ml-auto mr-2 w-1/3">
                <input v-model="searchQuery" type="text" placeholder="请输入案件名称、编号、简要案情等"
                    class="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <button @click="performSearch"
                    class="absolute inset-y-0 right-0 flex items-center px-1 text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </div>
            <div class="flex   space-x-2">
                <button @click="toggleFilter"
                    class="px-3 py-1 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 flex items-center"
                    :aria-expanded="isSearchOpen">
                    <span>筛选</span>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 ml-1 transition-transform duration-200 ease-in-out"
                        :class="{ 'rotate-180': isSearchOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                <button @click="resetSearch"
                    class="px-3 py-1 border border-gray-300 rounded-md  font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    重置
                </button>
                <button @click="toggleView"
                    class="p-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <SvgIcon name="list-end" />
                </button>
                <button @click="showHistory"
                    class="p-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <SvgIcon name="settings" />
                </button>
            </div>
        </div>
        <CaseSearch :open="isSearchOpen" />

        <AddCase :isOpen="showCaseDrawer" @after-leave="handleAfterLeave" @update:is-open="handleAfterLeave" />
        <CaseTable :tableList="tableList" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CaseTable from './CaseTable.vue';
import { TransitionRoot, TransitionChild } from "@headlessui/vue";
import AddCase from './AddCase.vue';
import CaseSearch from './CaseSearch.vue';
import SvgIcon from '@/components/SvgIcon/index.vue'
import axios from 'axios'

interface Tab {
    id: string;
    label: string;
    icon: string;
}
let tableList = ref([])

const modelValue = ref(false)
const showCaseDrawer = ref(false)
const handleAfterLeave = () => {
    showCaseDrawer.value = false
}
let addCaseDrawer = ref(false)
let isSearchOpen = ref(false)
const tabs: Tab[] = [
    { id: 'yesterday', label: '昨日案件', icon: '📅' },
    { id: 'all', label: '全部案件', icon: '📁' },
    { id: 'key', label: '重点关注', icon: '⭐' }
];

const activeTab = ref<string>('yesterday');

const addNewCase = (): void => {
    // Implement new case addition logic
    showCaseDrawer.value = true
    console.log('Adding new case');
};

const batchImport = (): void => {
    // Implement batch import logic
    console.log('Batch importing cases');
};
const form = ref({
    caseName: '',
    caseNumber: 'A330282680000202410514',
    caseType: '盗窃',
    caseStatus: '行政转结案',
    filingUnit: '330282050000',
    acceptanceTime: '2024-10-13T10:44',
    filingTime: '2024-10-13T10:45',
    briefDetails: ''
})
const searchQuery = ref<string>('');

const performSearch = (): void => {
    console.log('Performing search with query:', searchQuery.value);
    // Implement search logic here
};

const toggleFilter = (): void => {
    console.log('Toggling filter options');
    // Implement filter toggle logic here
    isSearchOpen.value = !isSearchOpen.value
};

const resetSearch = (): void => {
    searchQuery.value = '';
    console.log('Search reset');
    // Implement any additional reset logic here
};

const toggleView = (): void => {
    console.log('Toggling view options');
    // Implement view toggle logic here
};

const showHistory = (): void => {
    console.log('Showing search history');
    // Implement history display logic here
};
onMounted(() => {
    axios.get('/api/caselist').then(response => {
        tableList.value = response.data.data.users
    })
})
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>