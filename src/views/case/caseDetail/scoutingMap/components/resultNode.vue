<template>
    <div class="w-36 h-12 flex border-dashed border-2 border-red-600 rounded-3xl items-center" @click="openDrawer"
        style="background-color: #ff6666;" :class="{ highlighted: isHighlighted }">

        <img src="/src/assets/icons/luodiyanpan.png" alt="" class="p-2">

    </div>
    <cDrawers :isOpen="isDrawerOpen" @close="closeDrawer" title="落地研判" width="max-w-xl">
        <ResultDrawe />
    </cDrawers>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import cDrawers from '@/components/cDrawers/index.vue';
import ResultDrawe from './ResultDrawe.vue';
const isDrawerOpen = ref(false);

const props = defineProps<{
    node: any
}>()
const openDrawer = () => {
    isDrawerOpen.value = true;
};
const nodeData = ref(props.node.getData())
const isHighlighted = ref(true)
const closeDrawer = () => {
    isDrawerOpen.value = false;
};
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
</script>
<style scoped>
.highlighted {
    border: 2px solid red;
    box-shadow: 0 4px 6px -1px #ff6666, 0 2px 4px -2px rgb(0 0 0 / 0.1);
    cursor: pointer;
}
</style>