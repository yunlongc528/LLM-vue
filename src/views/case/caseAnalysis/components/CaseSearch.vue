<template>
    <TransitionRoot :show="open">
        <!-- Background overlay -->
        <TransitionChild enter="transform transition ease-in-out duration-100 sm:duration-700"
            enter-from="scale-y-95 h-5/6 opacity-0" enter-to="scale-y-100 h-full opacity-100"
            leave="transform transition ease-in-out duration-100 sm:duration-300"
            leave-from="scale-y-100 h-full opacity-100" leave-to="scale-y-95 h-5/6 opacity-0">
            <!-- … -->
            <div class="grid grid-cols-3 md:grid-cols-6 gap-1 my-1">
                <div>
                    <select id="location" name="location"
                        class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        <option>全部案件类型</option>
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                    </select>
                </div>
                <div>
                    <select id="location" name="location"
                        class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        <option>接收案事件</option>

                        <option>United States</option>
                        <option>Mexico</option>
                    </select>
                </div>
                <div>
                    <select id="location" name="location"
                        class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        <option>全部线索情况</option>

                        <option>United States</option>
                        <option>Mexico</option>
                    </select>
                </div>
                <div>
                    <select id="location" name="location"
                        class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        <option>United States</option>
                        <option>全部串并状态</option>
                        <option>Mexico</option>
                    </select>
                </div>
                <div>
                    <select id="location" name="location"
                        class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        <option>United States</option>
                        <option>全部立案单位</option>
                        <option>Mexico</option>
                    </select>
                </div>
                <div>
                    <select id="location" name="location"
                        class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        <option>United States</option>
                        <option>全部账户</option>
                        <option>Mexico</option>
                    </select>
                </div>
                <div class="col-span-2 flex justify-evenly items-center">
                    <span class="whitespace-nowrap">受理时间: </span>
                    <DatePicker v-model="selectedDate" format="YYYY年MM月DD日" />


                </div>
                <div class="col-span-2 flex justify-evenly items-center">
                    <span class="whitespace-nowrap">受理时间: </span>
                    <DatePicker v-model="selectedDate" format="YYYY年MM月DD日" />


                </div>
                <div class="col-span-2 flex justify-evenly items-center">
                    <span class="whitespace-nowrap">受理时间: </span>
                    <DatePicker v-model="selectedDate" format="YYYY年MM月DD日" />


                </div>
                <div>
                    <select id="location" name="location"
                        class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        <option selected class="text-gray-400">全部研判状态</option>

                        <option>United States</option>
                        <option>Mexico</option>
                    </select>
                </div>
                <div>
                    <select id="location" name="location"
                        class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        <option>United States</option>
                        <option>全部笔录状态</option>
                        <option>Mexico</option>
                    </select>
                </div>
                <div>
                    <select id="location" name="aaca"
                        class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        <option value="a">United States</option>
                        <option value="b">全部线索要素</option>
                        <option value="c">Mexico</option>
                    </select>
                </div>
            </div>
        </TransitionChild>

        <!-- Sliding sidebar -->

    </TransitionRoot>

</template>
<script lang="ts" setup>
import DatePicker from '@/components/DatePicker/index.vue'

import { TransitionRoot, TransitionChild } from "@headlessui/vue";
import { ref } from "vue";
const props = defineProps({
    open: {
        type: Boolean,
        required: true
    }
})
const selectedDate = ref(['', ''])


// let isOpen = ref(true)

</script>