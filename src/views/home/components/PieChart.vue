<template>
    <div class="w-full max-w-xl p-1">
        <div class="flex items-start space-x-8">
            <!-- Chart Container -->
            <div class="relative w-32 h-32 my-auto">
                <canvas ref="chartRef"></canvas>
                <div class="absolute inset-0 flex items-center justify-center">
                    <div class="text-center">
                        <div class="text-3xl font-bold">15</div>
                        <div class="text-sm text-gray-600">案件总数</div>
                    </div>
                </div>
            </div>

            <!-- Legend -->
            <div class="space-y-3 pt-4 text-sm">
                <div v-for="(item, index) in chartData" :key="index" class="flex items-center space-x-4">
                    <div class="flex items-center space-x-2">
                        <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: item.color }"></div>
                        <span>含{{ item.label }}</span>
                    </div>
                    <span class="text-gray-600">{{ item.count }}件</span>
                    <span class="text-gray-600">{{ item.percentage }}%</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Chart, DoughnutController, ArcElement, Tooltip } from 'chart.js'

// Register required Chart.js components
Chart.register(DoughnutController, ArcElement, Tooltip)

interface ChartItem {
    label: string
    count: number
    percentage: number
    color: string
}

const chartRef = ref<HTMLCanvasElement | null>(null)

const chartData: ChartItem[] = [
    { label: '4个要素', count: 0, percentage: 0, color: '#4A90E2' },
    { label: '3个要素', count: 4, percentage: 27, color: '#54D6B6' },
    { label: '2个要素', count: 0, percentage: 0, color: '#5B6EF5' },
    { label: '1个要素', count: 10, percentage: 67, color: '#F5A25B' },
    { label: '0个要素', count: 1, percentage: 7, color: '#E2574A' }
]

onMounted(() => {
    if (!chartRef.value) return

    new Chart(chartRef.value, {
        type: 'doughnut',
        data: {
            labels: chartData.map(item => item.label),
            datasets: [{
                data: chartData.map(item => item.count),
                backgroundColor: chartData.map(item => item.color),
                borderWidth: 0,
                borderRadius: 2
            }]
        },
        options: {
            responsive: true,
            cutout: '75%',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true
            }
        }
    })
})
</script>