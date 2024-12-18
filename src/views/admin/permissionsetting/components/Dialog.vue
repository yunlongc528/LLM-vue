<template>
    <Dialog v-model="dialogVisible" title="新增菜单" width="50%">
        <div class="bg-white rounded-lg  max-w-3xl mx-auto">

            <form @submit.prevent="handleSubmit">
                <div class="grid grid-cols-2   gap-6">

                    <!-- Menu Type Selection -->
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">菜单类型</label>
                        <div class="flex space-x-4">
                            <label class="inline-flex items-center">
                                <input type="radio" v-model="formData.menuType" value="目录"
                                    class="form-radio text-blue-600" />
                                <span class="ml-2">目录</span>
                            </label>
                            <label class="inline-flex items-center">
                                <input type="radio" v-model="formData.menuType" value="菜单"
                                    class="form-radio text-blue-600" />
                                <span class="ml-2">菜单</span>
                            </label>
                            <label class="inline-flex items-center">
                                <input type="radio" v-model="formData.menuType" value="按钮"
                                    class="form-radio text-blue-600" />
                                <span class="ml-2">按钮</span>
                            </label>
                        </div>
                    </div>

                    <!-- Menu Name -->
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">菜单名称</label>
                        <input v-model="formData.menuName" type="text" placeholder="格式：message.router.xxx"
                            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <!-- Route Path -->
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">路由路径</label>
                        <input v-model="formData.routePath" type="text" placeholder="路由中的 path 值"
                            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <!-- Component Path -->
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">组件路径</label>
                        <input v-model="formData.componentPath" type="text" placeholder="组件路径"
                            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <!-- Menu Icon -->
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">菜单图标</label>
                        <div class="flex items-center space-x-2">
                            <input v-model="formData.menuIcon" type="text" placeholder="请输入菜单图标"
                                class="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <button type="button" class="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
                                @click="openIconSelector">
                                <ImageIcon class="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <!-- Permission Settings -->
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">权限标识</label>
                        <input v-model="formData.permission" type="text" placeholder="取角色管理"
                            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <!-- Menu Order -->
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">菜单排序</label>
                        <input v-model="formData.order" type="number" placeholder="0"
                            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <!-- Radio Options -->
                    <div class="space-y-4 mb-6">
                        <div class="flex items-center space-x-8">
                            <label class="text-sm font-medium text-gray-700">是否隐藏:</label>
                            <div class="flex space-x-4">
                                <label class="inline-flex items-center">
                                    <input type="radio" v-model="formData.isHidden" :value="true"
                                        class="form-radio text-blue-600" />
                                    <span class="ml-2">隐藏</span>
                                </label>
                                <label class="inline-flex items-center">
                                    <input type="radio" v-model="formData.isHidden" :value="false"
                                        class="form-radio text-blue-600" />
                                    <span class="ml-2">不隐藏</span>
                                </label>
                            </div>
                        </div>

                        <div class="flex items-center space-x-8">
                            <label class="text-sm font-medium text-gray-700">页面缓存:</label>
                            <div class="flex space-x-4">
                                <label class="inline-flex items-center">
                                    <input type="radio" v-model="formData.isCache" :value="true"
                                        class="form-radio text-blue-600" />
                                    <span class="ml-2">缓存</span>
                                </label>
                                <label class="inline-flex items-center">
                                    <input type="radio" v-model="formData.isCache" :value="false"
                                        class="form-radio text-blue-600" />
                                    <span class="ml-2">不缓存</span>
                                </label>
                            </div>
                        </div>

                        <div class="flex items-center space-x-8">
                            <label class="text-sm font-medium text-gray-700">是否外链:</label>
                            <div class="flex space-x-4">
                                <label class="inline-flex items-center">
                                    <input type="radio" v-model="formData.isExternal" :value="true"
                                        class="form-radio text-blue-600" />
                                    <span class="ml-2">是</span>
                                </label>
                                <label class="inline-flex items-center">
                                    <input type="radio" v-model="formData.isExternal" :value="false"
                                        class="form-radio text-blue-600" />
                                    <span class="ml-2">否</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex place-content-center col-span-2 space-x-4">
                        <button type="button" @click="onClose" class="px-4 py-2 border rounded-md hover:bg-gray-50">
                            取消
                        </button>
                        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                            新增
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </Dialog>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import { XIcon, ImageIcon } from 'lucide-vue-next'
import Dialog from "@/components/Dialog/index.vue"
const dialogVisible = ref(true)

interface FormData {
    menuType: string
    menuName: string
    routePath: string
    componentPath: string
    menuIcon: string
    permission: string
    order: number
    isHidden: boolean
    isCache: boolean
    isExternal: boolean
}

const formData = ref<FormData>({
    menuType: '菜单',
    menuName: '',
    routePath: '',
    componentPath: '',
    menuIcon: '',
    permission: '',
    order: 0,
    isHidden: false,
    isCache: true,
    isExternal: false
})

const emit = defineEmits<{
    (e: 'close'): void
    (e: 'submit', data: FormData): void
}>()

const handleSubmit = () => {
    emit('submit', formData.value)
}

const onClose = () => {
    emit('close')
}

const openIconSelector = () => {
    // Implement icon selector functionality
    console.log('Open icon selector')
}
</script>