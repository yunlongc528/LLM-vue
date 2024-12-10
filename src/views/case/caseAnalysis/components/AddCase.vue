<template>
    <cDrawers :isOpen="isOpen" @close="closeDrawer" title="新增案件" width="max-w-sm">
        <!-- Case Name -->
        <div>
            <label class="block text-sm font-medium text-gray-700">
                案件名称 <span class="text-red-500">*</span>
            </label>
            <input v-model="form.caseName" type="text" required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        </div>

        <!-- Case Number -->
        <div>
            <label class="block text-sm font-medium text-gray-700">
                案件编号 <span class="text-red-500">*</span>
            </label>
            <input v-model="form.caseNumber" type="text" required readonly
                class="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm">
        </div>

        <!-- Case Type -->
        <div>
            <label class="block text-sm font-medium text-gray-700">案件类型</label>
            <select v-model="form.caseType"
                class="mt-1 block w-full  border-gray-300 shadow-sm  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                <option>盗窃</option>
                <option>盗窃1</option>
                <option>盗窃2</option>
                <!-- Add more options as needed -->
            </select>
        </div>

        <!-- Case Status -->
        <div>
            <label class="block text-sm font-medium text-gray-700">案件状态</label>
            <select v-model="form.caseStatus"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                <option>行政转结案</option>
                <!-- Add more options as needed -->
            </select>
        </div>

        <!-- Filing Unit -->
        <div>
            <label class="block text-sm font-medium text-gray-700">立案单位</label>
            <div class="relative">
                <select v-model="form.filingUnit"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    <option>330282050000</option>
                </select>

            </div>
        </div>

        <!-- Acceptance Time -->
        <div>
            <label class="block text-sm font-medium text-gray-700">
                受理时间 <span class="text-red-500">*</span>
            </label>
            <input v-model="form.acceptanceTime" type="datetime-local" required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        </div>

        <!-- Filing Time -->
        <div>
            <label class="block text-sm font-medium text-gray-700">立案时间</label>
            <input v-model="form.filingTime" type="datetime-local"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        </div>

        <!-- Case Details -->
        <div>
            <label class="block text-sm font-medium text-gray-700">
                简要案情 <span class="text-red-500">*</span>
            </label>
            <textarea v-model="form.briefDetails" rows="4" required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
            <div class="flex justify-between text-sm mt-1">
                <span class="text-red-500">请输入简要案情</span>
                <span class="text-gray-500">{{ form.briefDetails.length }} / 1500</span>
            </div>
        </div>
    </cDrawers>
</template>

<script setup>
import { ref } from 'vue'
import cDrawers from '@/components/cDrawers/index.vue'

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true
    }
})
const closeDrawer = () => {
    emit('update:is-open', false)
};
const emit = defineEmits(['update:isOpen'])

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

const updateIsOpen = (value) => {
    console.log('asdasd')
    emit('update:isOpen', value)
}
const icons = [
    '/placeholder.svg?height=20&width=20&text=S',
    '/placeholder.svg?height=20&width=20&text=中',
    '/placeholder.svg?height=20&width=20&text=•',
    '/placeholder.svg?height=20&width=20&text=◎',
    '/placeholder.svg?height=20&width=20&text=回',
    '/placeholder.svg?height=20&width=20&text=警'
]

const handleSubmit = () => {
    console.log('Form submitted:', form.value)
    emit('update:modelValue', false)
}
</script>