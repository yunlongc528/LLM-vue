<template>
    <div class=" inset-0 bg-gray-50/95 flex items-center justify-center overflow-auto py-1">
        <div class="bg-white rounded-lg w-full max-w-3xl shadow-lg relative">
            <!-- Header -->


            <!-- AI Analysis Section -->
            <div class="p-2 border-b g-no-repeat  bg-contain bg-center-top"
                style="background-image: url('/public/ai-doc-guide.png');background-size: 100% auto;">
                <div class="flex items-center gap-2 mb-4">
                    <div class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                        <CircuitBoardIcon class="w-4 h-4" />
                        智能解析
                    </div>
                    <button @click="refreshAnalysis" class="text-gray-400 hover:text-gray-600">
                        <RefreshCwIcon class="w-4 h-4" />
                    </button>
                </div>

                <div class="text-gray-700 leading-relaxed">
                    <p class="mb-4">{{ sampleReport.conclusion }}</p>
                    <p>根据对目前调证结果分析，内容如下：</p>
                </div>
            </div>

            <!-- Personal Information -->
            <div class="p-2">
                <div class="space-y-6">
                    <!-- Investigation Time -->
                    <div>
                        <h3 class="text-gray-500 mb-2">研判时间</h3>
                        <p>{{ sampleReport.investigationTime }}</p>
                    </div>

                    <!-- Personal Details -->
                    <div>
                        <h3 class="text-gray-500 mb-2">人员基本情况</h3>
                        <div class="space-y-3">
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="text-gray-500 text-sm">姓名</label>
                                    <p>{{ sampleReport.personalInfo.name }}</p>
                                </div>
                                <div>
                                    <label class="text-gray-500 text-sm">身份证号</label>
                                    <p>{{ sampleReport.personalInfo.idNumber }}</p>
                                </div>
                                <div>
                                    <label class="text-gray-500 text-sm">手机号</label>
                                    <p>{{ sampleReport.personalInfo.phone }}</p>
                                </div>
                                <div>
                                    <label class="text-gray-500 text-sm">籍贯</label>
                                    <p>{{ sampleReport.personalInfo.hometown }}</p>
                                </div>
                            </div>
                            <div>
                                <label class="text-gray-500 text-sm">户籍地址</label>
                                <p>{{ sampleReport.personalInfo.address }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Movement History -->
                    <div>
                        <h3 class="text-gray-500 mb-2">人员轨迹情况</h3>
                        <div class="space-y-2">
                            <p class="font-medium">最新轨迹记录：{{ sampleReport.movements.latest }}</p>
                            <div>
                                <h4 class="text-gray-500 mb-1">历史轨迹数据：</h4>
                                <div class="space-y-2">
                                    <div v-for="(movement, index) in sampleReport.movements.history" :key="index"
                                        class="flex gap-4 text-sm">
                                        <span class="text-gray-500 whitespace-nowrap">{{ movement.time }}</span>
                                        <span>{{ movement.route }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { XIcon, CircuitBoardIcon, RefreshCwIcon } from 'lucide-vue-next'

interface PersonalInfo {
    name: string
    idNumber: string
    phone: string
    currentTime: string
    hometown: string
    address: string
}

interface Movement {
    time: string
    route: string
}

interface Report {
    conclusion: string
    investigationTime: string
    personalInfo: PersonalInfo
    movements: {
        latest: string
        history: Movement[]
    }
}

interface Props {
    report: Report
}

// const props = defineProps<Props>()
const props = defineProps()
const emit = defineEmits<{
    (e: 'close'): void
    (e: 'refresh'): void
}>()

const onClose = () => {
    emit('close')
}

const refreshAnalysis = () => {
    emit('refresh')
}

// Example data structure
const sampleReport = {
    conclusion: '根据最新轨迹记录，嫌疑人（2024-11-13 19:05:00）在广东省东莞市住宿，是嫌疑人最新的轨迹记录。嫌疑人最新轨迹距现在1天，嫌疑人很可能已经回到其频繁活动地。因此嫌疑人最可能落脚地是广东省广州市。当前数据中可能还有嫌疑人详细落地地址。',
    investigationTime: '2024-11-15 10:50:17',
    personalInfo: {
        name: '杨慧萍',
        idNumber: '411324200402111928',
        phone: '',
        currentTime: '2024-11-15 10:50:17',
        hometown: '河南省镇平县',
        address: '贵州省贵阳市观山湖区东林寺路115号金麦源出所公共户'
    },
    movements: {
        latest: '2024-11-13 19:05:00 东莞市君庄酒店有限公司（七天酒店）（位于广东省东莞市），旅馆住宿',
        history: [
            { time: '2024-10-09 00:00:00', route: '从江西省上饶市到江西省上饶市' },
            { time: '2024-10-09 00:00:00', route: '从江西省上饶市到广东省广州市' },
            { time: '2024-10-06 00:00:00', route: '从贵阳市到江西省德兴市' },
            { time: '2024-09-03 00:00:00', route: '从广州白云到江西省南昌市' },
            { time: '2024-08-31 00:00:00', route: '从贵州省贵阳市到广东省广州市' },
            { time: '2024-08-25 00:00:00', route: '从江苏省苏州市到贵州省贵阳市' }
        ]
    }
}
</script>

<style scoped>
.fixed {
    font-family: system-ui, -apple-system, sans-serif;
}
</style>