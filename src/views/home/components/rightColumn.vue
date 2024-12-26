<template>
    <div class="p-6 bg-white ">

        <div class="truncate text-xl font-semibold text-gray-900">研判战果</div>
        <!-- Your content -->

        <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 ">
            <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 relative">
                <dt class="truncate text-sm font-medium text-gray-500">已侦破案件数</dt>
                <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">0</dd>

            </div>
            <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 relative">
                <dt class="truncate text-sm font-medium text-gray-500">挽损金额总数</dt>
                <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">101.1
                    <p class="mt-1 text-xl tracking-tight text-gray-900">万</p>
                </dd>

            </div>
        </dl>
        <div class="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
                <p class="text-sm font-extrabold text-gray-500">嫌疑人落地线索</p>
                <p class="font-extrabold">0</p>
            </div>
            <div>
                <p class="text-sm font-extrabold text-gray-500">已抓获嫌疑人</p>
                <p class="font-extrabold">2</p>
            </div>
            <div>
                <p class="text-sm font-extrabold text-gray-500">已破案件</p>
                <p class="font-extrabold">0</p>
            </div>

        </div>
    </div>
    <div class="p-6 mt-3 font-semibold text-xl rounded-lg bg-white ">
        预警战果
        <!-- Your content -->
        <ctxGram />
        预警战果


        <div class="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div class="flex items-center space-x-2 ">
                <p class="text-sm text-gray-500">受害人</p>
                <p class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">0</p>
            </div>
            <div class="flex items-center space-x-2">

                <p class="text-sm text-gray-500">嫌疑人</p>
                <p class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">2</p>
            </div>
            <div class="flex items-center space-x-2">

                <p class="text-sm text-gray-500 ">已破案件</p>
                <p class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">0</p>
            </div>
            <div class="flex items-center space-x-2">

                <p class="text-sm text-gray-500">已破案件</p>
                <p class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">1800</p>
            </div>
        </div>
    </div>
    <div class="p-6 mt-3 rounded-lg bg-white text-xl font-semibold">
        调证统计
        <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 ">
            <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 relative">
                <dt class="truncate text-sm font-medium text-gray-500">生成调证指令</dt>
                <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">0</dd>

            </div>
            <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 relative">
                <dt class="truncate text-sm font-medium text-gray-500">调证反馈数</dt>
                <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">0
                    <!-- <p class="mt-1 text-xl tracking-tight text-gray-900">万</p> -->
                </dd>

            </div>
        </dl>
    </div>
</template>
<script lang="ts" setup>
import ctxGram from '@/views/home/components/ctxGram.vue';


</script>