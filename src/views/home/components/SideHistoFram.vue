<template>
    <div class="w-full max-w-2xl p-4">
        <canvas ref="chartRef"></canvas>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Chart, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js'

// Register required Chart.js components
Chart.register(CategoryScale, LinearScale, BarController, BarElement)

interface ChartData {
    label: string
    value: number
}

const chartRef = ref<HTMLCanvasElement | null>(null)

const data: ChartData[] = [
    { label: '有APP/应用程序', value: 3 },
    { label: '有虚拟账号', value: 11 },
    { label: '有嫌疑人手机号', value: 4 },
    { label: '有嫌疑人银行卡', value: 4 }
]

onMounted(() => {
    if (!chartRef.value) return

    new Chart(chartRef.value, {
        type: 'bar',
        data: {
            labels: data.map(item => item.label),
            datasets: [{
                data: data.map(item => item.value),
                backgroundColor: '#4A90E2',
                borderWidth: 0,
                borderRadius: 2
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        precision: 0
                    }
                },
                y: {
                    grid: {
                        display: false
                    }
                }
            },
            layout: {
                padding: {
                    left: 10,
                    right: 10
                }
            }
        }
    })
})
</script>

<style scoped>
canvas {
    max-height: 300px;
}
</style>