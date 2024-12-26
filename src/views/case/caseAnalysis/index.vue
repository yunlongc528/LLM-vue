<template>
    <div>
        <div class="bg-white p-4 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-4">数据看板</h3>
            <div class="grid  lg:grid-cols-6 gap-1">
                <!-- New cases yesterday -->
                <div
                    class=" bg-blue-600 text-white p-4 pb-0 rounded-lg col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-1">
                    <h3 class="text-sm font-semibold mb-2">昨日新增案件</h3>
                    <div class="text-4xl font-bold mb-2">{{ newCasesYesterday }}</div>
                    <div class="">
                        <img src="/public/data-card-before.png"
                            class="hover:scale-110 transform duration-200 ease-in-out transition-transform">

                    </div>
                </div>

                <!-- Yesterday's case element analysis -->
                <div class="col-span-3  overflow-hidden rounded-lg shadow p-3">
                    <h3 class="text-sm font-semibold mb-2">昨日案件要素研判</h3>
                    <div class="grid  sm:grid-cols-1md:grid-cols-2 lg:grid-cols-4 gap-1">
                        <div v-for="(item, index) in caseElements" :key="index" class="bg-gray-100 p-3 rounded-lg">
                            <div class="text-sm text-gray-600 flex items-center">

                                <span class="ml-1">{{ item.label }}</span>
                            </div>
                            <div class="flex items-center h-16">
                                <div class="text-2xl font-extrabold mb-1 flex-1 ">{{ item.value }}</div>
                                <svg xmlns="http://www.w3.org/2000/svg" :class="item.icon" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        :d="item.path" />
                                </svg>
                            </div>

                        </div>
                    </div>
                </div>

                <!-- Total cumulative cases -->
                <div class="bg-green-100 p-3 rounded-lg col-span-3 lg:col-span-1">
                    <div class="text-sm text-gray-600 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <span>累计案件总数</span>
                    </div>
                    <div class="text-2xl font-bold mb-1">{{ totalCases }}</div>

                </div>

                <!-- Total solved cases -->
                <div class="bg-red-100 p-3 rounded-lg col-span-3 lg:col-span-1">
                    <div class="text-sm text-gray-600 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>累计破案数</span>
                    </div>
                    <div class="text-2xl font-bold mb-1">{{ solvedCases }}</div>

                </div>
            </div>
        </div>
        <CaseContent></CaseContent>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CaseContent from './components/CaseContent.vue';

const newCasesYesterday = ref<number>(0);
const totalCases = ref<number>(53);
const solvedCases = ref<number>(0);

interface CaseElement {
    label: string;
    value: number;
    icon: string;
    path: string;
}

const caseElements = ref<CaseElement[]>([
    { label: '有嫌疑人数', value: 0, icon: 'h-5 w-5 mr-1', path: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { label: '有嫌疑人手机号', value: 0, icon: 'h-5 w-5 mr-1', path: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
    { label: '有嫌疑人APP', value: 0, icon: 'h-5 w-5 mr-1', path: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' },
    { label: '有嫌疑人银行卡', value: 0, icon: 'h-5 w-5 mr-1', path: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
]);


</script>
