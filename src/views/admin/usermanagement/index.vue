<template>
    <div class="bg-gray-50 p-6">
        <!-- KPI Metrics -->
        <div class="grid grid-cols-4 gap-4 mb-6">
            <div v-for="(metric, index) in metrics" :key="index" class="bg-white rounded-lg p-4 shadow-sm">
                <div class="text-2xl font-bold">{{ metric.value }}</div>
                <div class="flex items-center mt-1">
                    <span :class="metric.change >= 0 ? 'text-green-500' : 'text-red-500'">
                        {{ metric.change >= 0 ? '+' : '' }}{{ metric.change }}%
                    </span>
                    <span class="text-gray-500 text-sm ml-2">{{ metric.label }}</span>
                </div>
            </div>
        </div>

        <!-- Charts Section -->
        <div class="grid grid-cols-4 gap-4">
            <!-- Area Chart -->
            <div class="col-span-3 bg-white p-4 rounded-lg shadow-sm">
                <h3 class="text-lg font-medium mb-4">设备补给强度</h3>
                <canvas ref="areaChartRef"></canvas>
            </div>

            <!-- Donut Chart -->
            <div class="bg-white p-4 rounded-lg shadow-sm">
                <h3 class="text-lg font-medium mb-4">配置建设工程</h3>
                <canvas ref="donutChartRef"></canvas>
            </div>
        </div>

        <!-- Bottom Metrics -->
        <div class="grid grid-cols-5 gap-4 mt-6">
            <div v-for="(tool, index) in quickTools" :key="index" class="bg-white p-4 rounded-lg shadow-sm">
                <div class="text-sm text-gray-500">{{ tool.label }}</div>
                <div class="text-lg font-medium mt-1">{{ tool.value }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

interface Metric {
    value: string
    change: number
    label: string
}

interface QuickTool {
    label: string
    value: string
}

const metrics: Metric[] = [
    { value: '125.12', change: -12.32, label: '订单统计信息' },
    { value: '653.33', change: 42.32, label: '月度计划信息' },
    { value: '125.65', change: 17.32, label: '年度计划信息' },
    { value: '520.43', change: -10.01, label: '访问统计信息' },
]

const quickTools: QuickTool[] = [
    { label: '注射江', value: '2.1%OBS/M' },
    { label: '东红(单红)', value: '30℃' },
    { label: '妙紫红', value: '57%RH' },
    { label: '翻紫罗兰红', value: '107w' },
    { label: '中紫罗兰红', value: '56%' },
]

const areaChartRef = ref<HTMLCanvasElement | null>(null)
const donutChartRef = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
    if (areaChartRef.value) {
        new Chart(areaChartRef.value, {
            type: 'line',
            data: {
                labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                datasets: [
                    {
                        label: '实际占比',
                        data: [20, 40, 60, 65, 55, 50, 50, 45, 40, 65, 45, 10],
                        fill: true,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        tension: 0.4
                    },
                    {
                        label: '最新市空价',
                        data: [10, 20, 15, 40, 40, 40, 40, 35, 10, 40, 20, 5],
                        fill: true,
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 70,
                        ticks: {
                            stepSize: 10
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        })
    }

    if (donutChartRef.value) {
        new Chart(donutChartRef.value, {
            type: 'doughnut',
            data: {
                labels: ['系统及硬件', '专用设备', '通用设备', '文物保护设施', '其他设施'],
                datasets: [{
                    data: [20, 20, 20, 20, 20],
                    backgroundColor: [
                        'rgb(54, 162, 235)',
                        'rgb(75, 192, 192)',
                        'rgb(255, 159, 64)',
                        'rgb(153, 102, 255)',
                        'rgb(255, 99, 132)'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        })
    }
})
</script>