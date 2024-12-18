<template>
    <TransitionRoot :show="open">
        <TransitionChild enter="transform transition ease-in-out duration-100 sm:duration-700"
            enter-from="scale-y-95 h-5/6 opacity-0" enter-to="scale-y-100 h-full opacity-100"
            leave="transform transition ease-in-out duration-100 sm:duration-300"
            leave-from="scale-y-100 h-full opacity-100" leave-to="scale-y-95 h-5/6 opacity-0">
            <form @submit.prevent="handleSubmit"
                class="grid sm:grid-cols-2 md:grid-cols-2    lg:grid-cols-6 gap-4 p-4 bg-white rounded-lg shadow-md">
                <SelectMenus v-model="formData.type" mode="multiple" @popupScroll="handlePopupScroll"
                    :options="typeList" placeholder="全部案件类型" />
                <SelectMenus v-model="formData.status" :options="statusList" placeholder="全部案件状态"
                    @popupScroll="handlePopupScroll" />
                <SelectMenus v-model="formData.clueStatus" :options="clueStatusList" placeholder="全部线索情况" />
                <SelectMenus v-model="formData.serialStatus" :options="serialStatusList" placeholder="全部串并状态" />
                <SelectMenus v-model="formData.filingUnit" :options="filingUnitList" placeholder="全部立案单位" />
                <SelectMenus v-model="formData.updater" :options="updaterList" placeholder="全部更新人" />

                <div class="col-span-2 flex items-center space-x-2">
                    <span class="whitespace-nowrap">受理时间:</span>
                    <DatePicker v-model="formData.acceptanceDate" format="YYYY年MM月DD日" />
                </div>
                <div class="col-span-2 flex items-center space-x-2">
                    <span class="whitespace-nowrap">立案时间:</span>
                    <DatePicker v-model="formData.filingDate" format="YYYY年MM月DD日" />
                </div>
                <div class="col-span-2 flex items-center space-x-2">
                    <span class="whitespace-nowrap">更新时间:</span>
                    <DatePicker v-model="formData.updateDate" format="YYYY年MM月DD日" />
                </div>

                <SelectMenus v-model="formData.judgmentStatus" :options="judgmentStatusList" placeholder="全部研判状态" />
                <SelectMenus v-model="formData.recordStatus" :options="recordStatusList" placeholder="全部笔录状态" />
                <SelectMenus v-model="formData.clueElements" :options="clueElementsList" placeholder="全部线索要素" />

                <!-- <button type="submit"
                    class="col-span-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
                    提交
                </button> -->
            </form>
        </TransitionChild>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { TransitionRoot, TransitionChild } from '@headlessui/vue'
import DatePicker from '@/components/DatePicker/index.vue'
import SelectMenus from '@/components/SelectMenus/index.vue'

interface Option {
    value: string;
    label: string;
}

interface FormData {
    type: Option | null;
    status: Option | null;
    clueStatus: Option | null;
    serialStatus: Option | null;
    filingUnit: Option | null;
    updater: Option | null;
    acceptanceDate: null[];
    filingDate: null[];
    updateDate: null[];
    judgmentStatus: Option | null;
    recordStatus: Option | null;
    clueElements: Option | null;
}
const handlePopupScroll = (event: Event) => {
    console.log('Popup scrolled', event)
}
const props = defineProps<{
    open: boolean
}>()

const formData = reactive<FormData>({
    type: null,
    status: null,
    clueStatus: null,
    serialStatus: null,
    filingUnit: null,
    updater: null,
    acceptanceDate: [null, null],
    filingDate: [null, null],
    updateDate: [null, null],
    judgmentStatus: null,
    recordStatus: null,
    clueElements: null
})

// 模拟数据
const typeList = [
    { value: 'criminal', label: '刑事案件' },
    { value: 'civil', label: '民事案件' },
    { value: 'administrative', label: '行政案件' }
]

const statusList = [
    { value: 'ongoing', label: '进行中' },
    { value: 'closed', label: '已结案' },
    { value: 'appealed', label: '上诉中' }
]

const clueStatusList = [
    { value: 'new', label: '新线索' },
    { value: 'investigating', label: '调查中' },
    { value: 'verified', label: '已核实' }
]

const serialStatusList = [
    { value: 'single', label: '单独案件' },
    { value: 'series', label: '系列案件' },
    { value: 'related', label: '关联案件' }
]

const filingUnitList = [
    { value: 'unit1', label: '第一立案单位' },
    { value: 'unit2', label: '第二立案单位' },
    { value: 'unit3', label: '第三立案单位' }
]

const updaterList = [
    { value: 'user1', label: '张三' },
    { value: 'user2', label: '李四' },
    { value: 'user3', label: '王五' }
]

const judgmentStatusList = [
    { value: 'pending', label: '待研判' },
    { value: 'inProgress', label: '研判中' },
    { value: 'completed', label: '已完成' }
]

const recordStatusList = [
    { value: 'notStarted', label: '未开始' },
    { value: 'inProgress', label: '进行中' },
    { value: 'completed', label: '已完成' }
]

const clueElementsList = [
    { value: 'suspect', label: '嫌疑人' },
    { value: 'evidence', label: '物证' },
    { value: 'witness', label: '证人' }
]

const handleSubmit = () => {
    console.log('Form submitted:', formData)
    // 在这里处理表单提交逻辑
}
</script>