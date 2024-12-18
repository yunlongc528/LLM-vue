<template>
    <div class="flex items-center gap-2">
        <button @click="handlePageChange(currentPage - 1)" :disabled="currentPage === 1"
            class="px-2 py-1 text-gray-600 disabled:text-gray-300 hover:text-blue-600 disabled:hover:text-gray-300"
            aria-label="Previous page">
            &lt;
        </button>

        <div class="flex gap-2">
            <!-- First page -->
            <button @click="handlePageChange(1)" :class="getButtonClasses(1)">
                1
            </button>

            <!-- Left ellipsis -->
            <span v-if="showLeftEllipsis" class="px-1">...</span>

            <!-- Pages before current -->
            <button v-for="page in pagesBefore" :key="page" @click="handlePageChange(page)"
                :class="getButtonClasses(page)">
                {{ page }}
            </button>

            <!-- Current page -->
            <button v-if="currentPage > 1 && currentPage < totalPages" :class="getButtonClasses(currentPage)">
                {{ currentPage }}
            </button>

            <!-- Pages after current -->
            <button v-for="page in pagesAfter" :key="page" @click="handlePageChange(page)"
                :class="getButtonClasses(page)">
                {{ page }}
            </button>

            <!-- Right ellipsis -->
            <span v-if="showRightEllipsis" class="px-1">...</span>

            <!-- Last page -->
            <button v-if="totalPages > 1" @click="handlePageChange(totalPages)" :class="getButtonClasses(totalPages)">
                {{ totalPages }}
            </button>
        </div>

        <button @click="handlePageChange(currentPage + 1)" :disabled="currentPage === totalPages"
            class="px-2 py-1 text-gray-600 disabled:text-gray-300 hover:text-blue-600 disabled:hover:text-gray-300"
            aria-label="Next page">
            &gt;
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    currentPage: number
    totalPages: number
    siblingCount?: number
}

interface Emits {
    (e: 'update:currentPage', page: number): void
    (e: 'change', page: number): void
}

const props = withDefaults(defineProps<Props>(), {
    currentPage: 1,
    totalPages: 1,
    siblingCount: 2
})

const emit = defineEmits<Emits>()

const handlePageChange = (page: number) => {
    if (page < 1 || page > props.totalPages) return
    emit('update:currentPage', page)
    emit('change', page)
}

const getButtonClasses = (page: number): string => {
    return [
        'w-8 h-8 flex items-center justify-center rounded',
        props.currentPage === page
            ? 'border-2 border-blue-500 text-blue-600'
            : 'text-gray-600 hover:text-blue-600'
    ].join(' ')
}

// Calculate the range of pages to show
const pagesBefore = computed(() => {
    const start = Math.max(
        props.currentPage - props.siblingCount,
        2
    )
    const end = props.currentPage - 1
    return Array.from(
        { length: end - start + 1 },
        (_, i) => start + i
    ).filter(page => page > 1)
})

const pagesAfter = computed(() => {
    const start = props.currentPage + 1
    const end = Math.min(
        props.currentPage + props.siblingCount,
        props.totalPages - 1
    )
    return Array.from(
        { length: end - start + 1 },
        (_, i) => start + i
    ).filter(page => page < props.totalPages)
})

// Determine when to show ellipsis
const showLeftEllipsis = computed(() => {
    return props.currentPage - props.siblingCount > 2
})

const showRightEllipsis = computed(() => {
    return props.currentPage + props.siblingCount < props.totalPages - 1
})
</script>