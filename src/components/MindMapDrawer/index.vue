<template>
    <div class="max-w-3xl mx-auto  bg-white relative">
        <!-- Header -->
        <div class=" grid grid-cols-1 items-start gap-2 lg:grid-cols-6 lg:gap-8">
            <!-- Left column -->

            <div class=" grid-cols-1 lg:col-span-1 ">
                <Anchor :offset="10" container="#content-container">
                    <AnchorLink href="#basic-usage" :title="locale['Basic Usage']" />
                    <AnchorLink href="#horizontal-mode" :title="locale['Horizontal Mode']" />
                    <AnchorLink href="#scroll-container" :title="locale['Scroll Container']" />
                    <AnchorLink href="#anchor-api" :title="locale['Anchor API']" />

                </Anchor>

            </div>

            <!-- Right column -->
            <div class=" col-span-5 gap-4" id="basic-usage">

                <div class="mb-6">
                    <div class="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                            <span class="mr-4">账号：</span>
                            <span>zxs991728</span>
                        </div>
                        <div>
                            <span class="mr-4">支付账号：</span>
                            <span>未用于支付</span>
                        </div>
                        <div>
                            <span class="mr-4">账号类型：</span>
                            <span>普通</span>
                        </div>
                        <div>
                            <span class="mr-4">账号：</span>
                            <span>TV</span>
                        </div>
                    </div>
                </div>

                <!-- Main Content -->
                <div class="mb-6">
                    <h2 class="text-gray-700 mb-4" id="horizontal-mode">调证建议（2）</h2>

                    <!-- First Section -->
                    <div class="border rounded-lg p-4 mb-4">
                        <div class="flex items-start mb-4">
                            <div class="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-1">
                                <span class="text-blue-500">1</span>
                            </div>
                            <div class="flex-1">
                                <div class="flex items-center mb-2">
                                    <span class="text-gray-700 text-sm">调证网络支付账号主体及流水信息</span>
                                    <span class="ml-1 text-red-500 text-xs">（不可重试此项，如需action 失效声请：action执行失败）</span>
                                    <button class="ml-auto text-blue-500">重新调证</button>
                                </div>
                                <div class="text-sm text-gray-500 mb-2">
                                    <span class="mr-4">调证开始时间：2024-10-30 12:37:30</span>
                                    <span>调证结束时间：2024-10-30 12:38:30</span>
                                </div>
                                <div class="text-sm text-gray-600">
                                    调查建议：根据【金之微】微信账号zxs991728账户状况调查，获取用户个人姓名信息、身份证号、手机号、开户银行卡等信息；并将调证一个月内支付，以便跟踪交易流向的时间段人员流水。
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Second Section -->
                    <div class="border rounded-lg p-4">
                        <div class="flex items-start">
                            <div class="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-1">
                                <span class="text-blue-500">2</span>
                            </div>
                            <div class="flex-1">
                                <div class="flex items-center mb-2">
                                    <span class="text-gray-700 text-sm">调证账号使用设备IP</span>
                                    <span class="ml-2 text-sm text-orange-500">待调证</span>
                                    <button class="ml-auto text-blue-500">重新调证</button>
                                </div>
                                <div class="text-sm text-gray-600">
                                    调查建议：建议对手机网络设备，获取微信账号zxs991728的登录设备的IP时段信息，反映用户的行踪并进行定位分析。
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                <!-- Input Section -->
                <div class="mb-6" id="scroll-container">
                    <h2 class="text-gray-700 mb-4" id="horizontal-mode">侦察笔记</h2>

                    <div class="relative note-add">
                        <input type="text" class="w-full overflow-y-hidden  px-4 py-2  "
                            placeholder="请输入人工研判结果，或上传检索文档" />
                        <div class="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
                            <button class="p-1 text-gray-400 hover:text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                            </button>
                            <button class="p-1 text-blue-600 hover:text-blue-700">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Bottom Section -->
                <div class="mb-6 rounded-lg pt-4 leading-4" id="anchor-api">
                    <h2 class="text-gray-700 mb-4 ">结果分析</h2>
                    <div class="result flex items-center flex-col justify-center">
                        <img src="/public/no-data.png" class="w-32 h-32 mb-2" alt="">
                        <div class="text-sm text-gray-500 leading-6 text-center">暂无结果分析</div>

                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ArrowUpIcon, FolderIcon } from 'lucide-vue-next'
import { ref, computed } from 'vue'
import AnchorLink from '@/components/Anchor/AnchorLink.vue';
import Anchor from '@/components/Anchor/index.vue';
const props = defineProps({
    info: {
        type: Object,
        default: {
            name: '田嘉诚',
        }
    }
});
const locale = computed(() => ({
    'Basic Usage': '基本信息',
    'Horizontal Mode': '调证建议',
    'Scroll Container': '侦察笔记',
    'Anchor API': '结果分析',

}))
</script>

<style scoped>
/* Add any additional custom styles here */
.result {
    background: linear-gradient(180deg, #f5f7fe 0, #fff 50%);
    padding: 40px 0;

}

.note-add {
    background-image: linear-gradient(#fff, #fff), linear-gradient(90deg, #2cd497, #56ccda 10%, #5eb5ff 25%, #2468f2 40% 60%, #bb546e 87%, #eb5e3e);
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    border: 2px solid transparent;
    border-radius: 4px;
}
</style>