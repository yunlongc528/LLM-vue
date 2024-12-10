<template>
    <div class="flex flex-col items-center justify-center  min-h-[600px] relative bg-white">
        <!-- Watermark Background -->
        <!-- Main Content -->
        <div class="flex flex-col items-center justify-center space-y-4 z-10">
            <!-- Document Icon -->
            <div class="w-16 h-16 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    class="w-full h-full text-gray-400">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                    <polyline points="14 2 14 8 20 8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <rect x="8" y="12" width="8" height="2" fill="currentColor" />
                </svg>
            </div>

            <!-- Text Content -->
            <div class="text-center">
                <h3 class="text-lg font-medium text-gray-900 mb-1">暂无数据</h3>
                <p class="text-sm text-gray-500 mb-6">
                    案件暂无现勘，请手动上传或等待数据接入
                </p>
            </div>

            <!-- Action Buttons -->
            <div class="flex space-x-4">
                <button
                    class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    @click="dialogVisible = true">
                    <svg class="mr-2 -ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                            clip-rule="evenodd" />
                    </svg>
                    上传现勘
                </button>
                <button
                    class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    @click="$emit('sync')">
                    <svg class="mr-2 -ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                            clip-rule="evenodd" />
                    </svg>
                    自动同步现勘
                </button>
            </div>
        </div>
        <Dialog v-model="dialogVisible" title="文件上传" width="30%" :before-close="handleClose">
            <FileUpload />
            <template #footer>
                <span class="dialog-footer">
                    <button type="button" @click="dialogVisible = false"
                        class="rounded bg-indigo-50 px-2 py-1 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100">确定</button>
                </span>
            </template>
        </Dialog>
    </div>
</template>

<script setup>
// Define emits for button click handlers
import Dialog from '@/components/Dialog/index.vue'
import FileUpload from '@/components/FileUpload/index.vue'
import { ref } from 'vue'
const dialogVisible = ref(false)
defineEmits(['upload', 'sync'])
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>