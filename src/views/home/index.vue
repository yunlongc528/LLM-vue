<template>
    <div class="banner"></div>

    <div class="h-full bg-gray-100" style="background-color: #e9f3ff;">
        <!-- Header -->

        <!-- Main Content -->
        <main class="mt-2 pb-8" style="background-color: #e9f3ff;">

            <div class="mx-auto  sm:px-1 lg:max-w-7xl relative">

                <h1 class="text-3xl pt-6 text-blue-400">GA六韬侦察大模型</h1>
                <div>
                    <p class="content">


                        公共安全大模型是搭建再GA网环境下的大模型，具有丰厚的GA领域知识，充分融合大数据及AI人工智能技术，具备强大的意图识别,剧情分析，逻辑推理以及自动迭代升级等能力，为全警提供“事前预警”，事中分析，事后研判的全周期业务支持，通过该平台，充分提升精确预警，充分提升精确管掌，精细管控，精准打防能力，全面提高打击犯罪实战效能，推动GA工作高质量发展
                    </p>
                </div>
                <!-- Main 3 column grid -->
                <div class="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8" style="margin-top:80px;">
                    <!-- Left column -->

                    <div class="grid grid-cols-1 gap-4 lg:col-span-2 ">

                        <section aria-labelledby="section-1-title">
                            <!-- <h2 class="sr-only " id="section-1-title">Section title</h2> -->

                            <div class="overflow-hidden rounded-lg bg-white shadow">

                                <div class="p-6 relative bg-white">
                                    <!-- Your content -->
                                    <div class="truncate text-xl font-semibold text-gray-900">基础指标</div>
                                    <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 ">
                                        <div v-for="item in stats" :key="item.name"
                                            class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 relative">
                                            <dt class="truncate text-sm font-medium text-gray-500">{{ item.name }}</dt>
                                            <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{{
                                                item.stat }}</dd>
                                            <img src="/public/case-total.png" alt=""
                                                class="absolute right-3 top-4 w-20">
                                        </div>
                                    </dl>

                                    <dl class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 ">
                                        <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                            <dt class="truncate text-xl font-semibold text-gray-900">诈骗类案件</dt>
                                            <!-- <dd class="mt-1  font-semibold tracking-tight text-gray-900">{{
                                                2 }}</dd> -->
                                            <div class="grid grid-cols-3 gap-2 mt-2">
                                                <div>
                                                    <div class="text-gray-500 text-sm">诈骗类案件数</div>
                                                    <div class="text-gray-500 text-sm">0</div>
                                                </div>
                                                <div>
                                                    <div class="text-gray-500 text-sm">占比</div>
                                                    <div class="text-gray-500 text-sm">0%</div>
                                                </div>
                                                <div> <case-gram :percentage="10" /></div>
                                            </div>
                                        </div>
                                        <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                            <dt class="truncate text-xl font-semibold   text-gray-900">
                                                诈骗手段TOP3</dt>
                                            <dd class="mt-1 font-semibold tracking-tight text-gray-900"></dd>
                                        </div>
                                    </dl>
                                    <div class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 ">
                                        <div class="overflow-hidden rounded-lg bg-white px-2 py-2 shadow sm:p-4">
                                            <dt class="truncate text-xl font-semibold text-gray-900">含关键要素案件</dt>
                                            <dd class="mt-1 text-sm ont-semibold  tracking-tight text-gray-900">
                                                <div class="flex mt-2">
                                                    <SideHistoFram />
                                                </div>

                                            </dd>
                                        </div>
                                        <div class="overflow-hidden rounded-lg bg-white px-1 py-1 shadow sm:p-3">
                                            <dt class="truncate text-xl font-semibold text-gray-900">可研判案件</dt>
                                            <dd class="h-full">
                                                <PieChart />
                                            </dd>
                                        </div>
                                    </div>
                                    <div class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-1 ">
                                        <div class="overflow-hidden rounded-lg bg-white px-2 py-2 shadow sm:p-4">
                                            <dt class="truncate text-xl font-semibold text-gray-900">含关键要素案件</dt>
                                            <dd class="h-96">
                                                <histoGram />
                                            </dd>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <!-- Right column -->
                    <div class="grid grid-cols-1 gap-4">
                        <section aria-labelledby="section-2-title">
                            <h2 class="sr-only" id="section-2-title">Section title</h2>
                            <div class="overflow-hidden rounded-lg ">
                                <rightColumn />
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// import Chart from 'chart.js/auto'
import histoGram from './components/histoGram.vue';
import rightColumn from './components/rightColumn.vue';
import caseGram from './components/caseGram.vue';
import SideHistoFram from './components/SideHistoFram.vue';
import PieChart from './components/PieChart.vue';
const percentage = ref(20)


const customColor = ref('#409eff')



const stats = [
    { name: '立按数', stat: '54' },
    { name: '笔录数', stat: '411' },
    { name: '现勘数', stat: '0' },
]





</script>

<style scoped>
.circular-chart {
    display: block;
    margin: 10px auto;
    max-width: 80%;
    max-height: 250px;
}

.circle-bg {
    fill: none;
    stroke: #eee;
    stroke-width: 3.8;
}

.content {
    width: 50%;
    font-size: 14px;
    font-weight: 400;
}

.banner {
    position: absolute;
    margin-top: 80px;
    top: 0;
    right: 50%;
    height: 400px;
    width: 100%;
    background-image: url('/public/banner.png');
    background-repeat: no-repeat;
    background-position: top right;
    background-size: auto 400px;
    transform: translateX(50%);
}

.circle {
    fill: none;
    stroke-width: 2.8;
    stroke-linecap: round;
    animation: progress 1s ease-out forwards;
}

@keyframes progress {
    0% {
        stroke-dasharray: 0 100;
    }
}

.circular-chart .circle {
    stroke: #3e98c7;
}

.circular-chart .circle.purple {
    stroke: #9f7aea;
}

.percentage {
    fill: #666;
    font-family: sans-serif;
    font-size: 0.5em;
    text-anchor: middle;
}
</style>