<template>
    <TransitionRoot as="template" :show="modelValue">
        <Dialog as="div" class="relative z-10" @close="closeDrawer">
            <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0"
                enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-200 bg-opacity-55 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-hidden">
                <div class="absolute inset-0 overflow-hidden">
                    <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <TransitionChild as="template"
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enter-from="translate-x-full" enter-to="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leave-from="translate-x-0" leave-to="translate-x-full">
                            <DialogPanel class="pointer-events-auto w-screen max-w-md">
                                <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                    <div class="px-4 sm:px-6">
                                        <div class="flex items-start justify-between">
                                            <DialogTitle class="text-base font-semibold leading-6 text-gray-900">新增案件
                                            </DialogTitle>
                                            <div class="ml-3 flex h-7 items-center">
                                                <button type="button"
                                                    class="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                    @click="closeDrawer">
                                                    <span class="absolute -inset-2.5" />
                                                    <span class="sr-only">关闭面板</span>
                                                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="relative mt-6 flex-1 px-4 sm:px-6">
                                        <form @submit.prevent="submitForm">
                                            <div class="space-y-4">
                                                <FormField label="案件名称" id="caseName" v-model="form.caseName"
                                                    required />
                                                <FormField label="案件编号" id="caseNumber" v-model="form.caseNumber"
                                                    required readonly />
                                                <FormField label="案件类型" id="caseType" v-model="form.caseType"
                                                    as="select">
                                                    <option>盗窃</option>
                                                    <!-- Add more options as needed -->
                                                </FormField>
                                                <FormField label="案件状态" id="caseStatus" v-model="form.caseStatus"
                                                    as="select">
                                                    <option>行政转结案</option>
                                                    <!-- Add more options as needed -->
                                                </FormField>
                                                <FormField label="立案单位" id="filingUnit" v-model="form.filingUnit"
                                                    as="select">
                                                    <option>330282050000</option>
                                                    <!-- Add more options as needed -->
                                                </FormField>
                                                <FormField label="受理时间" id="acceptanceTime"
                                                    v-model="form.acceptanceTime" type="datetime-local" required />
                                                <FormField label="立案时间" id="filingTime" v-model="form.filingTime"
                                                    type="datetime-local" />
                                                <FormField label="简要案情" id="briefDetails" v-model="form.briefDetails"
                                                    as="textarea" required>
                                                    <template #hint>
                                                        <div class="flex justify-between text-sm">
                                                            <span class="text-red-500">请输入简要案情</span>
                                                            <span class="text-gray-500">{{ form.briefDetails.length }} /
                                                                1500</span>
                                                        </div>
                                                    </template>
                                                </FormField>
                                            </div>
                                            <div class="mt-6 flex justify-end space-x-3">
                                                <button type="button" @click="closeDrawer"
                                                    class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                    取消
                                                </button>
                                                <button type="submit"
                                                    class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                    确定
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import FormField from './FormField.vue'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: true
    }
})
const modelValue1 = ref(false)
const emit = defineEmits(['update:modelValue', 'after-leave'])
// setInterval(() => {
//     modelValue1.value = !modelValue1.value
// }, 1000)
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

const closeDrawer = () => {
    emit('update:modelValue', false)
}

const submitForm = () => {
    // Implement form submission logic
    console.log('Form submitted', form.value)
    closeDrawer()
}

watch(() => props.modelValue, (newVal) => {
    if (!newVal) {
        emit('after-leave')
    }
})
</script>