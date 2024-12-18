<template>
    <div class="p-6 bg-white min-h-[85vh] ">
        <!-- Breadcrumb -->
        <div class="flex items-center text-sm text-gray-600 mb-6">
            <span>首页</span>
            <span class="mx-2">/</span>
            <span>系统设置</span>
            <span class="mx-2">/</span>
            <span>菜单管理</span>
        </div>

        <!-- Action Buttons -->
        <div class="mb-6 flex items-center space-x-4">
            <Input type="text" placeholder="请输入菜单名称" />
            <button class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center">
                <SearchIcon class="w-4 h-4 mr-2" />
                查询
            </button>
            <button class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center">
                <PlusIcon class="w-4 h-4 mr-2" />
                新增菜单项
            </button>
        </div>

        <!-- Table -->
        <div class="bg-white rounded-lg shadow">
            <Table :data="tableData" :columns="tableHeaders" :height="400">
                <template #actions="{ row }">
                    <div class="flex">
                        <button class=" text-green-400 px-3 py-1 ">
                            新增
                        </button>
                        <button class=" text-green-400 px-3 py-1 ">
                            修改
                        </button>
                        <button class=" text-red-400 px-3 py-1 ">
                            删除
                        </button>
                    </div>
                </template>
                <template #empty>
                    <div class="custom-empty flex flex-col items-center justify-center py-12">
                        <InboxIcon class="w-16 h-16 text-gray-400 mb-4" />
                        <p class="text-gray-500 text-lg">No data available</p>
                    </div>
                </template>
            </Table>
        </div>
    </div>
    <Dialog />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SearchIcon, PlusIcon } from 'lucide-vue-next'
import Table from '@/components/Table/index.vue'
import Input from '@/components/Input/index.vue'
import Dialog from "./components/Dialog.vue"
interface TableHeader {
    key: string
    label: string
}

interface MenuItem {
    id: number
    name: string
    icon: string
    routePath: string
    componentPath: string
    permissionId: number
    sort: number
    type: string
}

const tableHeaders = [
    { prop: 'name', label: '菜单名称', width: 150, fixed: true },
    { prop: 'icon', label: '图标' },
    { prop: 'routePath', label: '路由路径', width: 220 },
    { prop: 'componentPath', label: '组件路径' },
    { prop: 'permissionId', label: '权限标识' },
    { prop: 'sort', label: '排序' },
    { prop: 'type', label: '类型' },
    { prop: 'actions', label: '操作', slot: 'actions' }
];

const tableData = ref<MenuItem[]>([
    {
        id: 1,
        name: '首页',
        icon: '',
        routePath: '/home',
        componentPath: 'home/in',
        permissionId: 0,
        sort: 1,
        type: '目录'
    },
    {
        id: 2,
        name: '预警',
        icon: '',
        routePath: '/warnM',
        componentPath: '/warnM',
        permissionId: 1,
        sort: 2,
        type: '目录'
    },
    {
        id: 3,
        name: '系统',
        icon: '',
        routePath: '/system',
        componentPath: 'layout/r',
        permissionId: 10,
        sort: 3,
        type: '目录'
    }
])

const getTypeClass = (type: string | undefined): string => {
    if (!type) return '';
    return 'px-2 py-1 rounded-full text-xs bg-green-100 text-green-800'
}
</script>

<style scoped>
.table-container {
    overflow-x: auto;
}
</style>