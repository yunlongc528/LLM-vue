<template>

    <Popover class="relative">
        <PopoverButton>
            <div class="w-36 h-12 flex border-dashed border-2 border-blue-600 rounded-3xl items-center z-10"
                :class="{ highlighted: isHighlighted }">
                <SvgIcon width="130" height="50" name="suggestion" />
                <div class="text-blue-600">
                </div>

            </div>
        </PopoverButton>
        <transition enter-active-class="transition duration-200 ease-out" enter-from-class="translate-y-1 opacity-0"
            enter-to-class="translate-y-0 opacity-100" leave-active-class="transition duration-150 ease-in"
            leave-from-class="translate-y-0 opacity-100" leave-to-class="translate-y-1 opacity-0">
            <PopoverPanel v-slot="{ close }" class="absolute z-50">
                <SuegestPopover account-id="amie1886" @close="accept(close)"></SuegestPopover>
            </PopoverPanel>
        </transition>
    </Popover>
</template>
<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/index.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import SuegestPopover from './SuegestPopover.vue';
const props = defineProps<{
    node: any
}>()

const nodeData = ref(props.node.getData())
const isHighlighted = ref(true)

const updateNodeData = () => {
    nodeData.value = props.node.getData()
    isHighlighted.value = nodeData.value.highlighted || false
}
function accept(close) {
    close()
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
    border: 2px solid #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    cursor: pointer;
}
</style>