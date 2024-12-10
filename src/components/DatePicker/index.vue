<template>
    <div class="relative inline-block text-left w-full box-content min-w-[250px]" ref="container">
        <!-- Input Field -->
        <div @click="togglePicker"
            class="w-full px-1 py-1 text-gray-500 bg-white border border-gray-300 rounded-md cursor-pointer hover:border-blue-500 focus:outline-none">
            <div class="flex items-center flex-nowrap align-middle ">
                <CalendarDays class="w-5 h-5 mr-2 text-gray-400" />
                <span v-if="startDate && endDate" class="flex items-center justify-evenly w-full">
                    <span>
                        {{ formatDate(startDate) }}
                    </span> <span>到</span> <span>
                        {{ formatDate(endDate) }}
                    </span>
                </span>
                <span v-else class="text-gray-400 flex items-center">Start Date
                    <ArrowRight class="w-5 h-5" /> End Date
                </span>
            </div>
        </div>

        <!-- Calendar Popup -->
        <div v-if="showPicker" ref="popup" :style="popupStyle"
            class="absolute z-50 mt-2 bg-white rounded-lg shadow-lg p-4 border border-gray-200" style="width: 720px">
            <div class="flex space-x-8">
                <!-- Left Calendar -->
                <div class="flex-1">
                    <div class="flex items-center justify-between mb-4">
                        <button class="p-1 hover:bg-gray-100 rounded-full" @click="navigateMonth('left', -12)">
                            «
                        </button>
                        <button class="p-1 hover:bg-gray-100 rounded-full" @click="navigateMonth('left', -1)">
                            ‹
                        </button>
                        <span class="text-gray-700">
                            {{ formatMonthYear(leftMonth) }}
                        </span>
                        <div class="w-8"></div>
                    </div>
                    <Calendar :current-date="leftMonth" :selected-start="startDate" :selected-end="endDate"
                        :hover-date="hoverDate" @select-date="handleDateSelect" @hover-date="handleHoverDate" />
                </div>

                <!-- Right Calendar -->
                <div class="flex-1">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-8"></div>
                        <span class="text-gray-700">
                            {{ formatMonthYear(rightMonth) }}
                        </span>
                        <button class="p-1 hover:bg-gray-100 rounded-full" @click="navigateMonth('right', 1)">
                            ›
                        </button>
                        <button class="p-1 hover:bg-gray-100 rounded-full" @click="navigateMonth('right', 12)">
                            »
                        </button>
                    </div>
                    <Calendar :current-date="rightMonth" :selected-start="startDate" :selected-end="endDate"
                        :hover-date="hoverDate" @select-date="handleDateSelect" @hover-date="handleHoverDate" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import dayjs from 'dayjs'
import { CalendarDays, ArrowRight } from 'lucide-vue-next';
import Calendar from './Calendar.vue'

// Props and emits
const props = defineProps({
    modelValue: {
        type: Array,
        default: () => [null, null]
    }
})

const emit = defineEmits(['update:modelValue'])

// State
const showPicker = ref(false)
const leftMonth = ref(dayjs())
const hoverDate = ref(null)
const startDate = ref(null)
const endDate = ref(null)
const container = ref(null)
const popup = ref(null)
const popupStyle = ref({})

// Computed
const rightMonth = computed(() => {
    return leftMonth.value.add(1, 'month')
})

// Methods
const formatDate = (date) => {
    if (!date) return ''
    return date.format('YYYY-MM-DD')
}

const formatMonthYear = (date) => {
    return date.format('YYYY MMMM')
}

const navigateMonth = (calendar, amount) => {
    leftMonth.value = leftMonth.value.add(amount, 'month')
}

const handleDateSelect = (date) => {
    if (!startDate.value || (startDate.value && endDate.value)) {
        startDate.value = date
        endDate.value = null
    } else {
        if (date.isBefore(startDate.value)) {
            endDate.value = startDate.value
            startDate.value = date
        } else {
            endDate.value = date
        }
        emit('update:modelValue', [formatDate(startDate.value), formatDate(endDate.value)])
        showPicker.value = false
    }
}

const handleHoverDate = (date) => {
    hoverDate.value = date
}

const handleClickOutside = (event) => {
    if (container.value && !container.value.contains(event.target)) {
        showPicker.value = false
    }
}

const togglePicker = () => {
    showPicker.value = !showPicker.value
    if (showPicker.value) {
        nextTick(() => {
            updatePopupPosition()
        })
    }
}

const updatePopupPosition = () => {
    if (!container.value || !popup.value) return

    const containerRect = container.value.getBoundingClientRect()
    const popupRect = popup.value.getBoundingClientRect()

    const viewportHeight = window.innerHeight
    const spaceAbove = containerRect.top
    const spaceBelow = viewportHeight - containerRect.bottom

    let top = '100%'
    let bottom = 'auto'
    let transformOrigin = 'top'

    if (spaceBelow < popupRect.height && spaceAbove > spaceBelow) {
        top = 'auto'
        bottom = '100%'
        transformOrigin = 'bottom'
    }

    let left = '0'
    const rightOverflow = containerRect.left + popupRect.width - window.innerWidth
    if (rightOverflow > 0) {
        left = `-${rightOverflow + 20}px`
    }

    popupStyle.value = {
        top,
        bottom,
        left,
        transformOrigin,
    }
}

// Lifecycle
onMounted(() => {
    document.addEventListener('click', handleClickOutside)
    window.addEventListener('resize', updatePopupPosition)
    window.addEventListener('scroll', updatePopupPosition)

    if (props.modelValue[0] && props.modelValue[1]) {
        startDate.value = dayjs(props.modelValue[0])
        endDate.value = dayjs(props.modelValue[1])
        leftMonth.value = startDate.value
    }
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    window.removeEventListener('resize', updatePopupPosition)
    window.removeEventListener('scroll', updatePopupPosition)
})
</script>