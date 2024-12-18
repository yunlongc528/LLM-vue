<template>
    <div class="min-h-screen bg-white p-2">
        <!-- Navigation Tabs -->
        <div class="flex gap-6 mb-6">
            <button v-for="tab in tabs" :key="tab.id"
                :class="['px-4 py-2', { 'text-blue-600 border-b-2 border-blue-600': currentTab === tab.id }]"
                @click="currentTab = tab.id">
                {{ tab.name }}
            </button>
        </div>

        <!-- Statistics Section -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
            <!-- Left Stats -->
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold mb-4">实体数量统计</h3>
                <div class="grid grid-cols-3 gap-4">
                    <div class="bg-blue-600 text-white rounded-lg p-4 ">
                        <div class="text-sm">人员实体数</div>
                        <div class="text-3xl font-bold my-2">2</div>
                    </div>
                    <div class="bg-white border border-gray-200 rounded-lg p-4 ">
                        <div class="flex  items-center">
                            <p class="text-sm flex-1">今日新增</p>
                            <div class="text-xs text-gray-500">日</div>
                        </div>

                        <div class="text-3xl font-bold my-2">0</div>
                    </div>
                    <div class="bg-white border border-gray-200 rounded-lg p-4">
                        <div class="flex  items-center">
                            <p class="text-sm flex-1">本周新增</p>
                            <div class="text-xs text-gray-500">周</div>
                        </div>
                        <div class="text-3xl font-bold my-2">0</div>
                    </div>
                </div>
            </div>

            <!-- Right Stats with Pie Chart -->
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-semibold mb-4">实体来源统计</h3>
                <StatisticsChart />
            </div>
        </div>

        <!-- Data Table Section -->
        <div class="bg-white rounded-lg shadow p-6">

            <UserRound class="float-left" />
            <h3 class="text-lg font-semibold mb-4 ">实体列表</h3>

            <!-- Search and Filter Bar -->
            <div class="flex flex-wrap gap-4 mb-4">
                <Input size="small" :suffixIcon="Search" width="w-96" placeholder="搜索姓名，身份证号，案件编号" />
                <Input size="small" placeholder="实体标签" />
                <SelectMenus v-model="selected" placeholder="实体来源" :options="people" width="200px" />

                <SelectMenus v-model="selected" :options="people" width="200px" />
                <button class="px-4 py-2 bg-white border border-gray-300 rounded-md z-20">重置</button>
                <button type="button"
                    class=" ml-auto inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    <ArrowDownToLine class="-ml-0.5 size-5" aria-hidden="true" />
                    下载
                </button>
            </div>

            <!-- Data Table -->
            <Table :data="tableData" :columns="columns" :height="400" class="-z-50">
                <template #actions="{ row }">

                    <div @click="deleteRow(row)" class=" text-red-400 px-3 py-1 ">
                        删除
                    </div>
                </template>
                <template #empty>
                    <div class="custom-empty flex flex-col items-center justify-center py-12">
                        <InboxIcon class="w-16 h-16 text-gray-400 mb-4" />
                        <p class="text-gray-500 text-lg">No data available</p>
                    </div>
                </template>
            </Table>

            <!-- Pagination -->
            <div>
                <pagination :totalItems="100" :itemsPerPage="10" />
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import StatisticsChart from './components/StatisticsChart.vue'
import Pagination from '@/components/Pagination/index.vue';
const currentTab = ref('person')
const searchQuery = ref('')
import { Search, ArrowDownToLine, UserRound } from 'lucide-vue-next';
import SelectMenus from '@/components/SelectMenus/index.vue'
import Input from '@/components/Input/index.vue'
import { Inbox as InboxIcon } from 'lucide-vue-next';
import Table from '@/components/Table/index.vue'
const tabs = [
    { id: 'person', name: '人员' },
    { id: 'phone', name: '手机号' },
    { id: 'bank', name: '银行卡号' },
    { id: 'network', name: '网络账号' }
]


const people = [
    { value: 1, label: '案件解析' },
    { value: 2, label: '现勘解析' },
    { value: 3, label: '笔录解析' },
    { value: 4, label: '智能调正' },
    { value: 5, label: '人工创建' },
]

const selected = ref()
const columns = [
    { prop: 'name', label: '姓名', width: 150, fixed: true },
    { prop: 'idNumber', label: '省份证号', width: 120 },
    { prop: 'tagName', label: '实体标签', minwidth: 120 },
    { prop: 'dataType', label: '关联案件', width: 150 },
    { prop: 'resource', label: '实体来源', Width: 200 },
    { prop: 'buName', label: '所属单位', minWidth: 300 },
    { prop: 'actions', label: '操作', width: 100, slot: 'actions' }
];

const tableData = ref([
    {
        name: '肖国中',
        idNumber: '31398139671236X',
        tagName: '-',
        dataType: '智能调正',
        resource: '智能调正',
        buName: '浙江省慈溪市公安局刑事侦查大队',
    }, {
        name: '肖国中',
        idNumber: '31398139671236X',
        tagName: '-',
        dataType: '智能调正',
        resource: '智能调正',
        buName: '浙江省慈溪市公安局刑事侦查大队',
    }, {
        name: '肖国中',
        idNumber: '31398139671236X',
        tagName: '-',
        dataType: '智能调正',
        resource: '智能调正',
        buName: '浙江省慈溪市公安局刑事侦查大队',
    }, {
        name: '肖国中',
        idNumber: '31398139671236X',
        tagName: '-',
        dataType: '智能调正',
        resource: '智能调正',
        buName: '浙江省慈溪市公安局刑事侦查大队',
    }, {
        name: '肖国中',
        idNumber: '31398139671236X',
        tagName: '-',
        dataType: '智能调正',
        resource: '智能调正',
        buName: '浙江省慈溪市公安局刑事侦查大队',
    },
]);
const deleteRow = (row) => {
    console.log('Delete row:', row);
    // 在这里实现删除行的逻辑
    const index = tableData.value.findIndex(item => item === row);
    if (index !== -1) {
        tableData.value.splice(index, 1);
    }
};

</script>