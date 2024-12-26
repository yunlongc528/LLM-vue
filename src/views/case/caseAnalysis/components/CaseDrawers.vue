<template>
    <TransitionRoot as="template" :show="open">
        <Dialog class="relative z-10" @close="$emit('close')">
            <div class="fixed inset-0" />

            <div class="fixed inset-0 overflow-hidden">
                <div class="absolute inset-0 overflow-hidden">
                    <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <TransitionChild as="template"
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enter-from="translate-x-full" enter-to="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leave-from="translate-x-0" leave-to="translate-x-full">
                            <DialogPanel class="pointer-events-auto w-screen max-w-md">
                                <div class="flex h-full flex-col overflow-y-scroll bg-white  shadow-xl">

                                    <div class="relative ">

                                        <!-- <slot /> -->
                                        <div class="bg-gray-100 min-h-screen">
                                            <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden bg-no-repeat"
                                                style="background-image: url(&quot;/public/drawer-bg.png&quot;); background-size: 100% 220px;">
                                                <div class="px-4 sm:px-6">
                                                    <div class="flex items-start justify-between  pt-3">
                                                        <DialogTitle class="text-2xl font-bold text-gray-800 leading-4">
                                                            {{
                                                                caseInfos.name }}</DialogTitle>
                                                        <div class="ml-3 flex h-7 items-center">
                                                            <button type="button"
                                                                class="relative rounded-md bg-white text-gray-400 hover:text-gray-500 "
                                                                @click="$emit('close')">
                                                                <div class="absolute -inset-2.5" />
                                                                <div class="sr-only">Close panel</div>
                                                                <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="px-4 border-b">
                                                    <h1 class="text-2xl font-bold text-gray-800">
                                                    </h1>
                                                    <div class="mt-4 flex space-x-2">
                                                        <router-link
                                                            :to="`/large-model/case-analysis/${caseInfos.id}/analysis`"
                                                            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">
                                                            进入案件研判
                                                        </router-link>
                                                        <button
                                                            class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition duration-300 flex items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1"
                                                                viewBox="0 0 20 20" fill="currentColor">
                                                                <path
                                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                            关注案件
                                                        </button>
                                                        <button
                                                            class="px-3 py-2  border   text-gray-700 rounded hover:text-blue-600 hover:border-indigo-600 transition duration-100">
                                                            编辑
                                                        </button>
                                                        <button
                                                            class="px-3 py-2  border   text-gray-700 rounded hover:text-blue-600 hover:border-indigo-600 transition duration-100">

                                                            删除
                                                        </button>
                                                    </div>
                                                </div>
                                                <div class="p-4">
                                                    <h2 class="text-xl font-semibold mb-4">基本信息</h2>
                                                    <div class="grid grid-cols-1 gap-1">
                                                        <div class="flex">
                                                            <span class="font-medium w-24 text-gray-600">案件编号：</span>
                                                            <span>{{ caseInfos.id }}</span>
                                                        </div>
                                                        <div class="flex">
                                                            <span class="font-medium w-24 text-gray-600">案件类型</span>
                                                            <span>{{ caseInfos.caseCategory }}</span>
                                                        </div>
                                                        <div class="flex">
                                                            <span class="font-medium w-24 text-gray-600">研判状态</span>
                                                            <span>{{ caseInfos.detectStatus }}</span>
                                                        </div>
                                                        <div class="flex">
                                                            <span class="font-medium w-24 text-gray-600">笔录数</span>
                                                            <span>{{ caseInfos.record }}</span>
                                                        </div>
                                                        <div class="flex">
                                                            <span class="font-medium w-24 text-gray-600">立案单位</span>
                                                            <span>{{ caseInfos.registerOrg }}</span>
                                                        </div>
                                                        <div class="flex">
                                                            <span class="font-medium w-24 text-gray-600">受理时间</span>
                                                            <span>{{ caseInfos.registerTime }}</span>
                                                        </div>
                                                        <div class="flex">
                                                            <span class="font-medium w-24 text-gray-600">立案时间</span>
                                                            <span>{{ caseInfos.acceptTime }}</span>
                                                        </div>
                                                    </div>
                                                    <div class="mt-4">
                                                        <h3 class="font-medium text-gray-600">研判结果：</h3>
                                                        <div class="flex space-x-4 mt-2">
                                                            <div v-for="(count, type) in caseInfos.detectList"
                                                                :key="type" class="flex items-center">
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                    class="h-5 w-5 text-gray-500 mr-1"
                                                                    viewBox="0 0 20 20" fill="currentColor">
                                                                    <path v-if="type === 'person'" fill-rule="evenodd"
                                                                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                                        clip-rule="evenodd" />
                                                                    <path v-else-if="type === 'id'"
                                                                        d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" />
                                                                    <path v-else-if="type === 'phone'"
                                                                        d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                                                    <path v-else-if="type === 'app'"
                                                                        d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                                                                    <path v-else
                                                                        d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                                                                </svg>
                                                                <span>{{ count }}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="mt-4">
                                                        <h3 class="font-medium text-gray-600">简要案情：</h3>
                                                        <p class="mt-2 text-gray-700">{{ caseInfo.briefDetails }}</p>
                                                    </div>
                                                </div>
                                                <div class="p-4 bg-gray-50 border-t">
                                                    <h2 class="text-xl font-semibold mb-4">研判助手</h2>
                                                    <p class="text-sm text-gray-600 mb-2">以下20个案件可能是同源案件，请进一步查看并分析</p>
                                                    <div class="grid grid-cols-2 gap-4">
                                                        <div v-for="relatedCase in recommend_list"
                                                            :key="relatedCase.csaename"
                                                            class="bg-white p-3 rounded shadow">
                                                            <h3 class="font-medium">{{ relatedCase.csaename }}</h3>
                                                            <p class="text-sm text-gray-500">{{
                                                                relatedCase.recommendReasons }}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
import { reactive, ref, watch } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import axios from 'axios'
let recommend_list = ref()
axios.get('/api/recommend_list').then(response => {
    console.log(response.data)
    recommend_list.value = response.data.data.caserecommend_list
})
const props = defineProps({
    open: {
        type: Boolean,
        required: true
    },
    title: {
        type: String,
        default: 'Panel title'
    },
    caseInfos: {
        type: Object,
        default: () => ({})
    }
})

const caseInfo = reactive({
    name: props.caseInfos?.name,
    basicInfo: {
        '案件编号': 'A330282610000202410526',
        '案件类型': '猥亵儿童案',
        '研判状态': '未研判',
        '笔录数': '0',
        '案件状态': '立案',
        '立案单位': '浙江省慈溪市GA局刑事侦查大队',
        '受理时间': '2024-10-18 11:36:33',
        '立案时间': '2024-10-18 11:36:55',

    },
    analysisResult: {
        person: 0,
        id: 0,
        phone: 0,
        app: 0,
        card: 0,
        other: 0
    },
    briefDetails: '2024年10月18日21时41分，接韩晴晴报警称：在附海韩家园园内24号附近 被人猥亵。',
    relatedCases: [
        { csaename: '慈溪市韩晴晴被猥亵儿童案', recommendReasons: '相似地点' },
        { csaename: '慈溪同日未知伤猥亵儿童案', recommendReasons: '相似地点' },
        { csaename: '慈溪同日未知伤猥亵儿童案', recommendReasons: '相似地点' },
        { csaename: '慈溪同日未知伤猥亵儿童案', recommendReasons: '相似地点' },
        { csaename: '慈溪同日未知伤猥亵儿童案', recommendReasons: '相似地点' }
    ]
})
const emit = defineEmits(['close'])
</script>