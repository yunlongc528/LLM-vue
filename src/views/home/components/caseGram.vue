<template>
    <div class="relative w-28 h-28">
        <svg class="w-full h-full" viewBox="0 0 100 100">
            <circle class="text-gray-200 stroke-current" stroke-width="4" cx="50" cy="50" r="48" fill="transparent" />
            <circle class="text-blue-600 progress-ring__circle stroke-current" stroke-width="4" stroke-linecap="round"
                cx="50" cy="50" r="48" fill="transparent" :style="{ strokeDashoffset }" />
        </svg>
        <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-2xl font-bold text-gray-700">{{ percentage }}%</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';


const props = defineProps<{
    percentage: number;
}>();

const circumference = computed(() => 2 * Math.PI * 48);
const strokeDashoffset = computed(() => {
    return circumference.value - (props.percentage / 100) * circumference.value;
});
</script>

<style scoped>
.progress-ring__circle {
    stroke-dasharray: 301.59;
    transition: stroke-dashoffset 0.35s;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
}
</style>