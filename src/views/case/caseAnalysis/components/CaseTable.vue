<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full overflow-auto border border-gray-200 rounded-lg text-sm text-left text-gray-500 ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>

                    <th v-for="header in tableHeaders" :key="header" scope="col" class="px-1 py-3">
                        {{ header }}
                    </th>
                    <th scope="col" class="px-6 py-3 sticky right-0 z-10 bg-gray-50">
                        操作
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(caseItem) in tableList" :key="caseItem.id"
                    class="bg-white border-b hover:bg-gray-50 cursor-pointer" @click.stop="showCase(caseItem)">

                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        <div class="flex items-center">
                            <button @click.stop="toggleStar(caseItem)" class="mr-2">
                                <svg :class="{ 'text-yellow-400': caseItem.collection, 'text-gray-300': !caseItem.collection }"
                                    xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </button>
                            <div>
                                <p>{{ caseItem.name }}</p>
                                <div>{{ caseItem.id }}</div>

                            </div>
                        </div>
                    </th>
                    <td class="px-2 py-1 min-w-16">
                        {{ caseItem.detectStatus }}
                    </td>
                    <td class=" py-1">
                        {{ caseItem.record }}
                    </td>
                    <td class="px-2 py-1">
                        <div class="flex items-center space-x-2">
                            <span v-for="(count, key) in caseItem.detectList" :key="key" class="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 mr-1"
                                    viewBox="0 0 20 20" fill="currentColor">
                                    <path v-if="key === 'person'" fill-rule="evenodd"
                                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                    <path v-else-if="key === 'phone'"
                                        d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    <path v-else-if="key === 'app'"
                                        d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                    <path v-else-if="key === 'card'" fill-rule="evenodd"
                                        d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                                        clip-rule="evenodd" />
                                    <path v-else fill-rule="evenodd"
                                        d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                                        clip-rule="evenodd" />
                                </svg>
                                {{ count }}
                            </span>
                        </div>
                    </td>
                    <td class="px-2 py-1 min-w-[100px] max-w-[100px]">
                        {{ caseItem.registerOrg }}
                    </td>
                    <td class="px-2 py-1">
                        {{ caseItem.registerTime }}
                    </td>
                    <td class="px-2 py-1">
                        {{ caseItem.acceptTime }}
                    </td>
                    <td class="px-2 py-1 min-w-36">
                        <div class="tooltip">
                            {{ truncate(caseItem.CaseContent, 10) }}
                            <span class="tooltiptext">{{ caseItem.CaseContent }}</span>
                        </div>
                    </td>
                    <td class="px-2 py-1">
                        {{ caseItem.caseCategory }}
                    </td>
                    <td class="px-2 py-1">
                        {{ caseItem.caseStatus }}
                    </td>
                    <td class="py-1 sticky right-0 z-10 bg-white">
                        <a href="#" class="font-medium text-blue-600 hover:underline mr-3">编辑</a>
                        <a href="#" class="font-medium text-red-600 hover:underline ">删除</a>
                    </td>
                </tr>

            </tbody>
        </table>
        <div class="float-right m-3">
            <Pagination v-model:currentPage="page" :total-pages="3" @change="onPageChange" />

        </div>
        <CaseDrawers :caseInfos="caseInfo" :open="caseDrawerOpen" title="My Custom Panel"
            @close="caseDrawerOpen = false">

        </CaseDrawers>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CaseDrawers from '@/views/case/caseAnalysis/components/CaseDrawers.vue';
import Pagination from '@/components/Pagination/index.vue';
interface detectList {
    person: number;
    phone: number;
    app: number;
    card: number;
    other: number;
    account: number;
}
const props = defineProps({
    tableList: {
        type: Array as () => CaseItem[],
        required: true
    }
})
const caseInfo = ref<CaseItem | null>(null);
interface CaseItem {
    id: string;
    collection: boolean;
    detectStatus: string;
    record: number;
    detectList: detectList;
    registerOrg: string;
    registerTime: string;
    acceptTime: string;
    CaseContent: string;
    caseCategory: string;
    caseStatus: string;
    name: string;
}

const tableHeaders: string[] = [
    '案件名称/编号', '研判状态', '笔录数（份）', '研判结果', '立案单位',
    '受理时间', '立案时间', '简要案情', '案件类型', '案件状态'
];

let caseDrawerOpen = ref(false);

const toggleStar = (caseItem: CaseItem): void => {
    caseItem.collection = !caseItem.collection;
};

const truncate = (text: string, length: number): string => {
    return text?.length > length ? text?.slice(0, length) + '...' : text;
};
const page = ref(1)
const onPageChange = (page) => {
    console.log('Page changed to:', page);
    // 在这里执行你需要的操作
};
const showCase = (caseItem: CaseItem) => {
    caseInfo.value = caseItem

    caseDrawerOpen.value = true
}
</script>

<style scoped>
.tooltip {
    position: relative;
    display: inline-block;
}

.tooltip .tooltiptext {
    visibility: hidden;
    width: 200px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -100px;
    opacity: 0;
    transition: opacity 0.3s;
}

.tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
}
</style>