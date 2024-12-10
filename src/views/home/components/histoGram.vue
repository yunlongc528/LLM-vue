<template>
    <div class="w-full max-w-4xl">
        <canvas ref="chartRef"></canvas>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Chart, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js'

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarController, BarElement)

// Define interface for chart data
interface ChartData {
    labels: string[]
    datasets: {
        label: string
        data: number[]
        backgroundColor: string
    }[]
}

const chartRef = ref<HTMLCanvasElement | null>(null)

// Chart data
const data: ChartData = {
    labels: ['嫌疑人', '银行卡', '手机号', '虚拟账户', '虚拟空间', 'App', '地址'],
    datasets: [
        {
            label: '类型1',
            data: [2, 0, 0, 0, 0, 0, 0],
            backgroundColor: 'rgb(99, 132, 255)',
        },
        {
            label: '类型2',
            data: [9, 3, 2, 2, 4, 2, 0],
            backgroundColor: 'rgb(75, 222, 172)',
        },
        {
            label: '类型3',
            data: [9, 2, 2, 2, 5, 4, 2],
            backgroundColor: 'rgb(139, 92, 246)',
        },
    ],
}

onMounted(() => {
    if (chartRef.value) {
        new Chart(chartRef.value, {
            type: 'bar',
            data,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    x: {
                        grid: {
                            display: false,
                        },
                    },
                    y: {
                        beginAtZero: true,
                        max: 10,
                        ticks: {
                            stepSize: 2,
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)',
                        },
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        text: '含关键要素案件',
                        font: {
                            size: 16,
                            weight: 'bold',
                        },
                        padding: {
                            bottom: 30,
                        },
                    },
                },
                // barPercentage: 0.8,
                // categoryPercentage: 0.7,
            },
        })
    }
})
</script>

<style scoped>
canvas {
    max-height: 400px;
}
</style>