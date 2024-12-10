<template>
    <div class="calendar">
        <div class="grid grid-cols-7 mb-2">
            <div v-for="day in weekDays" :key="day" class="text-center text-sm text-gray-700">
                {{ day }}
            </div>
        </div>
        <div class="grid grid-cols-7 gap-px">
            <div v-for="{ date, isCurrentMonth, isInRange, isStart, isEnd } in calendarDays"
                :key="date.format('YYYY-MM-DD')" class="relative p-1"
                @click="isCurrentMonth && $emit('selectDate', date)"
                @mouseenter="isCurrentMonth && $emit('hoverDate', date)">
                <button type="button" :class="[
                    'w-full h-8 text-sm leading-8 rounded-full',
                    isCurrentMonth ? 'text-gray-900' : 'text-gray-400',
                    {
                        'bg-blue-500 text-white': isStart || isEnd,
                        'bg-blue-50': isInRange,
                        'hover:bg-gray-100': isCurrentMonth && !isStart && !isEnd && !isInRange
                    }
                ]" :disabled="!isCurrentMonth">
                    {{ date.date() }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import dayjs from 'dayjs'

const props = defineProps({
    currentDate: {
        type: Object,
        required: true
    },
    selectedStart: Object,
    selectedEnd: Object,
    hoverDate: Object
})

const emit = defineEmits(['selectDate', 'hoverDate'])

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const calendarDays = computed(() => {
    const firstDay = props.currentDate.startOf('month')
    const lastDay = props.currentDate.endOf('month')
    const startDay = firstDay.startOf('week')
    const endDay = lastDay.endOf('week')

    const days = []
    let day = startDay

    while (day.isBefore(endDay) || day.isSame(endDay, 'day')) {
        days.push({
            date: day,
            isCurrentMonth: day.month() === props.currentDate.month(),
            isInRange: isInRange(day),
            isStart: isStart(day),
            isEnd: isEnd(day)
        })
        day = day.add(1, 'day')
    }

    return days
})

const isInRange = (date) => {
    if (!props.selectedStart || !props.hoverDate) return false
    const end = props.selectedEnd || props.hoverDate
    return date.isAfter(props.selectedStart) && date.isBefore(end)
}

const isStart = (date) => {
    return props.selectedStart && date.isSame(props.selectedStart, 'day')
}

const isEnd = (date) => {
    if (props.selectedEnd) {
        return date.isSame(props.selectedEnd, 'day')
    }
    return props.hoverDate && date.isSame(props.hoverDate, 'day')
}
</script>