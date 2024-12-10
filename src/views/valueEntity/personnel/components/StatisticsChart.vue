<template>
    <div class="flex items-start justify-around ">
        <div class="grid grid-cols-3 md:grid-cols-3 gap-6">
            <div class="flex items-center" v-for="(item, index) in chartData" :key="index">
                <span class="w-3 h-3 rounded mr-2" :style="{ backgroundColor: item.color }"></span>
                <span class="text-gray-700">{{ item.label }} {{ item.percentage }}%</span>
            </div>
        </div>
        <div class="w-32 h-32">
            <canvas ref="chartCanvas"></canvas>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Chart, ArcElement, Tooltip, Legend, PieController } from 'chart.js'

// Register required Chart.js components
Chart.register(ArcElement, Tooltip, Legend, PieController)

const chartCanvas = ref(null)

const chartData = [
    { label: '室情解析', percentage: 9, color: '#2468f2' },
    { label: '室录解析', percentage: 0, color: '#A5e693' },
    { label: '智能碰证', percentage: 23, color: '#0099E6' },
    { label: '人工创建', percentage: 68, color: '#99e2ff' },
    { label: '人工创建', percentage: 0, color: '#005c99' }
]

onMounted(() => {
    const ctx = chartCanvas.value.getContext('2d')

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: chartData.map(item => item.label),
            datasets: [{
                data: chartData.map(item => item.percentage),
                backgroundColor: chartData.map(item => item.color),
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `${context.label}: ${context.raw}%`
                        }
                    }
                }
            },
            cutout: '0%',
            radius: '90%'
        }
    })
})
</script>