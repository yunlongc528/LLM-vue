<template>
    <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div class="flex flex-1 justify-between sm:hidden">
            <button @click="prevPage"
                class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                :disabled="currentPage === 1">Previous</button>
            <button @click="nextPage"
                class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                :disabled="currentPage === totalPages">Next</button>
        </div>

        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
                <p class="text-sm text-gray-700">
                    <!-- Showing -->
                    <!-- {{ (currentPage - 1) * itemsPerPage + 1 }} to
                    {{ Math.min(currentPage * itemsPerPage, totalItems) }} of
                    <span class="font-medium">{{ totalItems }}</span> results -->
                </p>
            </div>
            <div>
                <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <button @click="prevPage"
                        class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        :disabled="currentPage === 1">
                        <span class="sr-only">Previous</span>
                        <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
                    </button>
                    <template v-for="page in pages" :key="page">
                        <button @click="changePage(page)"
                            :class="['relative inline-flex items-center px-4 py-2 text-sm font-semibold', { 'bg-indigo-600 text-white': page === currentPage, 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50': page !== currentPage }]"
                            aria-current="page">
                            {{ page }}
                        </button>
                    </template>
                    <button @click="nextPage"
                        class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        :disabled="currentPage === totalPages">
                        <span class="sr-only">Next</span>
                        <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
                    </button>
                </nav>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
import { ref, computed } from 'vue';
const emit = defineEmits(['page-changed']);
const props = defineProps({
    totalItems: {
        type: Number,
        required: true
    },
    itemsPerPage: {
        type: Number,
        default: 10
    }
});

const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage));

const pages = computed(() => {
    const pageArray = [];
    for (let i = 1; i <= totalPages.value; i++) {
        pageArray.push(i);
    }
    return pageArray;
});

const changePage = (page) => {
    if (currentPage.value !== page) {
        currentPage.value = page;
        emit('page-changed', page); // 发射事件，传递当前页码
    }
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        changePage(currentPage.value + 1);
    }
};

const prevPage = () => {
    if (currentPage.value > 1) {
        changePage(currentPage.value - 1);
    }
};
</script>

<style scoped>
/* 这里可以添加特定于分页器组件的样式 */
</style>