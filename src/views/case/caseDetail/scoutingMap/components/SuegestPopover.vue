<template>
    <div class="realtive translate-x-2/4 -translate-y-40 z-50 w-max rounded-lg shadow-2xl">
        <div class=" absolue translate-y-32 w-4 h-4 bg-white transform -rotate-45 origin-bottom-left">
        </div>

        <div class="bg-white rounded-lg w-full max-w-sm p-3 relative">

            <!-- Close button -->
            <button @click="onClose" class="absolute right-4 top-4 text-black-500 hover:text-gray-700">
                <XIcon class="w-5 h-5" />
            </button>

            <!-- Title -->
            <h2 class="text-xl font-bold mb-2">侦查建议</h2>

            <!-- Content -->
            <div class="space-y-3">
                <!-- Section 1 -->
                <div>
                    <h3 class="text-md text-blue-600 font-medium mb-1">1、调证社交账号信息</h3>
                    <p class="text-gray-600 leading-relaxed">
                        可联系小红书所属公司，调取账号amie1886的注册信息，包括其注册时间、注册手机号等信息。
                    </p>
                </div>

                <!-- Section 2 -->
                <div>
                    <h3 class="text-md text-blue-600 font-medium  ">2、调取账号使用设备IP</h3>
                    <p class="text-gray-600 leading-relaxed">
                        通过线下渠道如网安等，获取账号amie1886近期的访问IP和时间日志信息。后续可对访问IP进行深度分析。
                    </p>
                </div>

                <!-- Action Button -->
                <!-- <div class="text-right ">
                    <button @click="onAnalyze"
                        class="bg-blue-600 text-white px-2 py-2 rounded hover:bg-blue-700 transition-colors">
                        调证分析
                    </button>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { XIcon } from 'lucide-vue-next'

interface Props {
    accountId: string
}

interface EmitEvents {
    (event: 'close'): void
    (event: 'analyze', accountId: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<EmitEvents>()

const onClose = () => {
    emit('close')
}

const onAnalyze = () => {
    emit('analyze', props.accountId)
}
</script>

<style scoped>
.fixed {
    font-family: system-ui, -apple-system, sans-serif;
}
</style>