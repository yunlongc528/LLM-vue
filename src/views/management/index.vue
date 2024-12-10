<template>
    <div class="min-h-screen bg-white p-2">
        <!-- Navigation Tabs -->
        <div class="flex gap-6 mb-2">
            <button :class="['px-4 py-2 text-blue-600 border-b-2 border-blue-600']">
                问卷调查
            </button>
        </div>

        <!-- Statistics Section -->
        <div class="grid lg:grid-cols-6  sm:grid-cols-2 gap-3 mb-3 p-3">
            <!-- Left Stats -->
            <div class="sm:col-span-1 ">
                <label for="city" class="block text-sm/6 font-medium text-gray-900">案件名称</label>
                <div class="mt-2">
                    <input type="text" name="city" id="city" autocomplete="address-level2" placeholder="请输入"
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
            </div>
            <div class="sm:col-span-1 ">
                <label for="city" class="block text-sm/6 font-medium text-gray-900">案件编号</label>
                <div class="mt-2">
                    <input type="text" name="city" id="city" autocomplete="address-level2" placeholder="请输入"
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
            </div>
            <div class="sm:col-span-1 ">
                <label for="city" class="block text-sm/6 font-medium text-gray-900">提交用户</label>
                <div class="mt-2">
                    <input type="text" name="city" id="city" autocomplete="address-level2" placeholder="请输入"
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
            </div>
            <div class="sm:col-span-1 ">
                <label for="city" class="block text-sm/6 font-medium text-gray-900">提交时间</label>
                <div class="mt-2">
                    <DataPicker />
                </div>
            </div>
            <div class="bg-white flex items-center	">
            </div>

        </div>

        <!-- Data Table Section -->
        <div class="bg-white rounded-lg shadow p-6">
            <Table :data="tableData" :columns="columns" :height="350">
                <template #empty>
                    <div class="flex flex-col items-center justify-center p-16 text-gray-500">
                        <IconInbox class="text-4xl mb-2" />
                        <p>No data available</p>
                    </div>
                </template>
            </Table>
            <!-- Data Table -->
            <!-- <table class="w-full mb-4">
                <thead>
                    <tr class="bg-gray-50">
                        <th class="px-4 py-2 text-left text-gray-500 font-normal">案件名称/编号</th>
                        <th class="px-4 py-2 text-left text-gray-500 font-normal">提交用户</th>
                        <th class="px-4 py-2 text-left text-gray-500 font-normal">提交时间</th>
                        <th class="px-4 py-2 text-left text-gray-500 font-normal">问卷总分</th>
                        <th class="px-4 py-2 text-left text-gray-500 font-normal">解析评分</th>
                        <th class="px-4 py-2 text-left text-gray-500 font-normal">调正评分</th>
                        <th class="px-4 py-2 text-left text-gray-500 font-normal">资金流评分</th>
                        <th class="px-4 py-2 text-left text-gray-500 font-normal">人员流评分</th>
                        <th class="px-4 py-2 text-left text-gray-500 font-normal">地址推理评分</th>
                        <th class="px-4 py-2 text-left text-gray-500 font-normal">操作</th>
                    </tr>
                </thead>
                <tbody v-if="tableData.length === 0" class="w-full">
                    <tr>
                        <td colspan="10" class="h-[calc(100vh-200px)]">
                            <div class="flex items-center justify-center 	">
                                <img src="/public/no-data.png" class="h-32">
                            </div>
                            <div class="text-center">暂无数据</div>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr v-for="item in tableData" :key="item.id" class="border-b border-gray-200">
                        <td class="px-4 py-2">{{ item.name }}</td>
                        <td class="px-4 py-2">{{ item.idNumber }}</td>
                        <td class="px-4 py-2">{{ item.label }}</td>
                        <td class="px-4 py-2">{{ item.label }}</td>
                        <td class="px-4 py-2">{{ item.label }}</td>
                        <td class="px-4 py-2">{{ item.label }}</td>
                        <td class="px-4 py-2 text-blue-600">{{ item.caseCount }}</td>
                        <td class="px-4 py-2">{{ item.source }}</td>
                        <td class="px-4 py-2">{{ item.department }}</td>
                        <td class="px-4 py-2">
                            <button class="text-blue-600">删除</button>
                        </td>
                    </tr>
                </tbody>
            </table> -->

            <!-- Pagination -->
            <div v-if="tableData.length != 0">
                <pagination :totalItems="100" :itemsPerPage="10" />
            </div>
            <Popover class="relative">
                <PopoverButton>Solutions</PopoverButton>

                <PopoverPanel class="absolute z-10">
                    <div class="grid grid-cols-2">
                        <a href="/analytics">Analytics</a>
                        <a href="/engagement">Engagement</a>
                        <a href="/security">Security</a>
                        <a href="/integrations">Integrations</a>
                    </div>

                </PopoverPanel>
            </Popover>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Pagination from '@/components/Pagination/index.vue';
import DataPicker from '@/components/DatePicker/index.vue';
import { Popover, PopoverButton, PopoverPanel, PopoverOverlay } from '@headlessui/vue'
import Table from '@/components/Table/index.vue'

import { Inbox as IconInbox } from 'lucide-vue-next';
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
const columns = [
    { prop: 'date', label: '案件名称', width: 150, fixed: true },
    { prop: 'name', label: '提交用户', width: 120 },
    { prop: 'state', label: '提交时间', width: 220 },
    { prop: 'city', label: '问卷总分', width: 120 },

    { prop: 'address', label: '解析评分', width: 120 },
    { prop: 'city', label: '调正评分', width: 120 },
    { prop: 'city', label: '资金流水评分', width: 120 },
    { prop: 'city', label: '人员流水评分', width: 120 },
    { prop: 'city', label: '地址推理评分', width: 120 },
    { prop: 'zip', label: '操作' },
];

const tableData = ref([
    // {
    //     date: '2016-05-03',
    //     name: 'Tom',
    //     state: 'California',
    //     city: 'Los Angeles',
    //     address: 'No. 189, Grove St, Los Angeles',
    //     zip: 'CA 90036',
    // },
    // {
    //     date: '2016-05-02',
    //     name: 'John',
    //     state: 'California',
    //     city: 'Los Angeles',
    //     address: 'No. 189, Grove St, Los Angeles',
    //     zip: 'CA 90036',
    // },
    // {
    //     date: '2016-05-04',
    //     name: 'Morgan',
    //     state: 'California',
    //     city: 'Los Angeles',
    //     address: 'No. 189, Grove St, Los Angeles',
    //     zip: 'CA 90036',
    // },
    // {
    //     date: '2016-05-01',
    //     name: 'Jessy',
    //     state: 'California',
    //     city: 'Los Angeles',
    //     address: 'No. 189, Grove St, Los Angeles',
    //     zip: 'CA 90036',
    // },
    // {
    //     date: '2016-05-08',
    //     name: 'Robert',
    //     state: 'California',
    //     city: 'Los Angeles',
    //     address: 'No. 189, Grove St, Los Angeles',
    //     zip: 'CA 90036',
    // },
    // {
    //     date: '2016-05-06',
    //     name: 'Alex',
    //     state: 'California',
    //     city: 'Los Angeles',
    //     address: 'No. 189, Grove St, Los Angeles',
    //     zip: 'CA 90036',
    // },
]);



</script>