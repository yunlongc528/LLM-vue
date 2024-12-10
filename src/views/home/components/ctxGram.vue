<template>
    <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow">
        <div class="w-32 h-32 relative">
            <canvas ref="chartCanvas"></canvas>
            <div class="absolute inset-0 flex items-center justify-center flex-col">
                <span class="text-sm text-gray-500">总推送量</span>
                <span class="text-2xl font-bold">{{ totalCases }}</span>
            </div>
        </div>
        <div class="space-y-2">
            <div v-for="(item, index) in caseTypes" :key="index" class="flex items-center">
                <span class="w-3 h-3 rounded-full mr-2" :style="{ backgroundColor: item.color }"></span>
                <span class="text-sm text-gray-700 mr-2">{{ item.label }}</span>
                <span class="text-sm text-gray-500 mr-2">{{ item.count }}件</span>
                <span class="text-sm text-gray-500">{{ item.percentage }}%</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import Chart from 'chart.js/auto';

const chartCanvas = ref(null);
const caseTypes = ref([
    { label: '涉诈', count: 10, color: '#4A90E2' },
    { label: '涉毒', count: 2, color: '#50E3C2' },
    { label: '涉枪', count: 3, color: '#8A4FFF' },
]);

const totalCases = computed(() => {
    return caseTypes.value.reduce((sum, type) => sum + type.count, 0);
});

onMounted(() => {
    const ctx = chartCanvas.value.getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: caseTypes.value.map(type => type.label),
            datasets: [{
                data: caseTypes.value.map(type => type.count),
                backgroundColor: caseTypes.value.map(type => type.color),
                borderWidth: 0,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            }
        }
    });
});

// Calculate percentages
caseTypes.value.forEach(type => {
    type.percentage = totalCases.value > 0
        ? ((type.count / totalCases.value) * 100).toFixed(0)
        : 0;
});
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>