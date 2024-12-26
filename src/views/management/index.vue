<template>
    <div class="min-h-[85vh] bg-white p-6">
        <!-- Navigation Tabs -->
        <div class="flex items-center text-sm text-gray-600 mb-6">
            <span>首页</span>
            <span class="mx-2">/</span>
            <span>系统设置</span>
            <span class="mx-2">/</span>
            <span>问卷调查</span>
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
        <div class="bg-white rounded-lg shadow ">
            <Table :data="tableData" :columns="columns" :height="350">
                <template #empty>
                    <div class="flex flex-col items-center justify-center p-16 text-gray-500">
                        <IconInbox class="text-4xl mb-2" />
                        <p>No data available</p>
                    </div>
                </template>
            </Table>
            <!-- Data Table -->

            <div v-if="tableData.length != 0">
                <pagination :totalItems="100" :itemsPerPage="10" />
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Pagination from '@/components/Pagination/index.vue';
import DataPicker from '@/components/DatePicker/index.vue';
import Table from '@/components/Table/index.vue'

import { Inbox as IconInbox } from 'lucide-vue-next';
const columns = [
    { prop: 'date', label: '案件名称', fixed: true },
    { prop: 'name', label: '提交用户', },
    { prop: 'state', label: '提交时间', },
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