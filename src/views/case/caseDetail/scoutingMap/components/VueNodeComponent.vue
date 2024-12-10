<template>
    <div @mouseleave="showMoreAction = false" class="node-container" :class="{ highlighted: isHighlighted }">
        <div class="main-area" @click="openDrawer">
            <div class="main-info">
                <div :style="{ backgroundColor: NODE_TYPE_LOGO[node.data.type]?.caseColor }"
                    class="rounded-sm flex p-1">
                    <i class="node-logo" :style="{ backgroundImage: `url(${NODE_TYPE_LOGO[node.data.type]?.svg})` }" />

                </div>
                <div class="ellipsis-row node-name">
                    <div class="title">{{ node.data.name }}</div>
                    <div class="description">A21313131231313</div>
                </div>
                <div class="status-action">

                    <div class="more-action-container relative bottom-2 left-2">
                        <svg @mouseenter="showMoreAction = true" t="1731910681154" class="icon" viewBox="0 0 1024 1024"
                            version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5624" width="16" height="16">
                            <path
                                d="M192 448c-35.2 0-64 28.8-64 64s28.8 64 64 64 64-28.8 64-64-28.8-64-64-64z m640 0c-35.2 0-64 28.8-64 64s28.8 64 64 64 64-28.8 64-64-28.8-64-64-64zM512 448c-35.2 0-64 28.8-64 64s28.8 64 64 64 64-28.8 64-64-28.8-64-64-64z"
                                fill="#909399" p-id="5625"></path>
                        </svg>
                        <transition name="fade">
                            <ul class="bg-white relative bottom-7 left-4 w-24 mr-1 z-50  p-1 rounded-xl drop-shadow-md"
                                v-show="showMoreAction" @mouseenter="showMoreAction = true">
                                <li class="flex align-center justify-center py-2 leading-4">
                                    <svg t="1731897367339" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="2456" width="12" height="16">
                                        <path
                                            d="M128 64a64 64 0 0 0-64 64v768a64 64 0 0 0 64 64h768a64 64 0 0 0 64-64V128a64 64 0 0 0-64-64H128z m0-64h768a128 128 0 0 1 128 128v768a128 128 0 0 1-128 128H128a128 128 0 0 1-128-128V128a128 128 0 0 1 128-128z"
                                            fill="#333333" p-id="2457"></path>
                                        <path d="M704 480a32 32 0 1 1 0 64H320a32 32 0 0 1 0-64h384z" fill="#333333"
                                            p-id="2458"></path>
                                        <path d="M544 704a32 32 0 1 1-64 0V320a32 32 0 0 1 64 0v384z" fill="#333333"
                                            p-id="2459"></path>
                                    </svg>
                                    <div> 添加子节点卡片</div>
                                </li>
                                <li class="flex py-2 leading-4"><svg t="1731910115524" class="icon"
                                        viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                        p-id="3563" width="16" height="16">
                                        <path
                                            d="M358.165868 554.624796c-0.533143 0.680499-1.066285 1.391696-1.303692 2.251274l-41.104163 150.700257c-2.400676 8.772804 0.059352 18.226107 6.550183 24.892947 4.860704 4.742001 11.261485 7.350408 18.077727 7.350408 2.252297 0 4.504594-0.267083 6.727215-0.860601l149.630902-40.808428c0.23843 0 0.357134 0.207731 0.534166 0.207731 1.718131 0 3.408633-0.62217 4.683672-1.927909l400.113747-400.054395c11.883655-11.897981 18.404162-28.109198 18.404162-45.74281 0-19.989263-8.476045-39.963177-23.324218-54.767348l-37.786605-37.844933c-14.81645-14.848173-34.822087-23.338544-54.797024-23.338544-17.631566 0-33.842783 6.520507-45.75816 18.388812L358.758362 553.232077C358.344946 553.615816 358.462626 554.179658 358.165868 554.624796M862.924953 257.19778l-39.742143 39.71349-64.428382-65.451688 39.180348-39.179324c6.193049-6.222725 18.194384-5.318122 25.308409 1.822508l37.813211 37.845956c3.943822 3.941775 6.195096 9.18622 6.195096 14.372336C867.223862 250.574942 865.710392 254.42769 862.924953 257.19778M429.322487 560.907896l288.712541-288.728914 64.459081 65.49569L494.314711 625.838721 429.322487 560.907896zM376.718409 677.970032l20.863167-76.580143 55.656601 55.657624L376.718409 677.970032z"
                                            fill="#231F20" p-id="3564"></path>
                                        <path
                                            d="M888.265084 415.735539c-15.144932 0-27.562752 12.313443-27.620058 27.665083l0 372.98283c0 19.559475-15.885805 35.444257-35.475979 35.444257L194.220958 851.827709c-19.559475 0-35.504632-15.883759-35.504632-35.444257L158.716326 207.602222c0-19.575848 15.945157-35.474956 35.504632-35.474956l406.367171 0c15.231913 0 27.592428-12.371772 27.592428-27.606755 0-15.202237-12.360516-27.590382-27.592428-27.590382L190.013123 116.930129c-47.684022 0-86.49291 38.779212-86.49291 86.49291L103.520213 820.59231c0 47.713698 38.808888 86.47756 86.49291 86.47756l639.334083 0c47.715745 0 86.509283-38.763862 86.509283-86.47756L915.856489 443.222567C915.794068 428.048983 903.408993 415.735539 888.265084 415.735539"
                                            fill="#231F20" p-id="3565"></path>
                                    </svg>
                                    <div>编辑</div>
                                </li>

                            </ul>
                        </transition>
                    </div>
                </div>
            </div>
            <div class="line" v-if="node.data.tag.length"></div>
            <div class="info-tag">

                <span class="label" v-for="item in node.data.tag" :key="item">{{ item }}</span>
            </div>
        </div>
        <cDrawers :isOpen="isDrawerOpen" @close="closeDrawer" :title="node.data.name" width="max-w-3xl">
            <MindMapDrawer :info="node.data" />
        </cDrawers>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import cDrawers from '@/components/cDrawers/index.vue';
import { NODE_TYPE_LOGO } from './constants'
import MindMapDrawer from '@/components/MindMapDrawer/index.vue';
const props = defineProps<{
    node: any
}>()
let showMoreAction = ref(false)
const isDrawerOpen = ref(false);

const openDrawer = () => {
    isDrawerOpen.value = true;
};

const closeDrawer = () => {
    isDrawerOpen.value = false;
};

const isHighlighted = ref(false)
const nodeData = ref(props.node.getData())
const updateNodeData = () => {
    nodeData.value = props.node.getData()
    isHighlighted.value = nodeData.value.highlighted || false
}

onMounted(() => {
    props.node.on('change:data', updateNodeData)
})

onUnmounted(() => {
    props.node.off('change:data', updateNodeData)
})

// 初始更新
updateNodeData()

const ports = props.node.getPorts() || []
ports.forEach((port) => {
    props.node.setPortProp(port.id, 'attrs/circle', {
        fill: '#fff',
        stroke: 'gray',
    })
})
</script>

<style scoped>
.data-processing-dag-container {
    width: 100%;
    height: 600px;
}


.main-info {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.info-tag {
    display: flex;
    flex-wrap: nowrap;
    margin-top: 4px;
    overflow: hidden;
    white-space: nowrap;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
    {
    opacity: 0;
}

.main-area {
    cursor: pointer;
    flex-direction: row;
    justify-content: space-between;
    padding: 5px;
    /* height: 48px; */
    color: rgba(0, 0, 0, 65%);
    font-size: 12px;
    font-family: PingFangSC;
    line-height: 24px;
    box-shadow: 0 -1px 4px 0 rgba(209, 209, 209, 50%), 1px 1px 4px 0 rgba(217, 217, 217, 50%);
    border-radius: 2px;
    border: 1px solid transparent;
    background: white;
}

/* .main-area:hover {
    border: 1px solid rgba(0, 0, 0, 10%);
    box-shadow: 0 -2px 4px 0 rgba(209, 209, 209, 50%), 2px 2px 4px 0 rgba(217, 217, 217, 50%);
} */

.node-container.highlighted {
    border: 2px solid #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.label {
    padding: 0 8px;
    margin-right: 4px;
    font-size: 12px;
    font-weight: 500;
    line-height: 20px;
    color: #2468f2;
    background: #e6f0ff;
    border-radius: 2px;
}

.node-logo {
    display: inline-block;
    width: 24px;
    height: 24px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
}

.line {
    margin-top: 9px;
    height: 1px;
    background: #d4d6d9;
}

.node-name {
    overflow: hidden;
    display: inline-block;
    width: 110px;
    margin-left: 6px;
    color: rgba(0, 0, 0, 65%);
    font-size: 12px;
    font-family: PingFangSC;
    white-space: nowrap;
    text-overflow: ellipsis;
    vertical-align: top;
    line-height: 1rem;
}

.description {
    color: gray;
    font-size: 10px;

}

.status-action {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.status-icon {
    display: inline-block;
    width: 24px;
    height: 24px;
}

.status-icon-error {
    background: url('https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*SEISQ6My-HoAAAAAAAAAAAAAARQnAQ') no-repeat center center / 100% 100%;
}

.status-icon-success {
    background: url('https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*6l60T6h8TTQAAAAAAAAAAAAAARQnAQ') no-repeat center center / 100% 100%;
}

.more-action-container {
    margin-left: 12px;
    width: 15px;
    height: 15px;
    text-align: center;
    cursor: pointer;
}

.more-action {
    display: inline-block;
    width: 3px;
    height: 15px;
    background: url('https://mdn.alipayobjects.com/huamei_f4t1bn/afts/img/A*tFw7SIy-ttQAAAAAAAAAAAAADtOHAQ/original') no-repeat center center / 100% 100%;
}

.plus-dag {
    visibility: hidden;
    position: relative;
    margin-left: 12px;
    height: 48px;
}

.plus-action {
    position: absolute;
    top: calc(50% - 8px);
    left: 0;
    width: 16px;
    height: 16px;
    background: url('https://mdn.alipayobjects.com/huamei_f4t1bn/afts/img/A*ScX2R4ODfokAAAAAAAAAAAAADtOHAQ/original') no-repeat center center / 100% 100%;
    cursor: pointer;
}

.plus-action:hover {
    background-image: url('https://mdn.alipayobjects.com/huamei_f4t1bn/afts/img/A*tRaoS5XhsuQAAAAAAAAAAAAADtOHAQ/original');
}

.plus-action:active,
.plus-action-selected {
    background-image: url('https://mdn.alipayobjects.com/huamei_f4t1bn/afts/img/A*k9cnSaSmlw4AAAAAAAAAAAAADtOHAQ/original');
}

:deep(.x6-node-selected) .main-area {
    border-color: #3471f9;
}

:deep(.x6-node-selected) .plus-dag {
    visibility: visible;
}

@keyframes running-line {
    to {
        stroke-dashoffset: -1000;
    }
}
</style>