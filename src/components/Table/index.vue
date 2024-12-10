<template>
    <div class="custom-table-container" :style="{ height: tableHeight }">
        <table class="custom-table w-full border-collapse">
            <thead>
                <tr>
                    <th v-for="column in columns" :key="column.prop" :class="getColumnClass(column)"
                        :style="getColumnStyle(column)">
                        {{ column.label }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <template v-if="data.length">
                    <tr v-for="(row, rowIndex) in data" :key="rowIndex" class="hover:bg-gray-50">
                        <td v-for="column in columns" :key="column.prop" :class="getColumnClass(column)"
                            :style="getColumnStyle(column)">
                            <template v-if="column.slot">
                                <slot :name="column.slot" :row="row" :index="rowIndex"></slot>
                            </template>
                            <template v-else>
                                {{ row[column.prop] }}
                            </template>
                        </td>
                    </tr>
                </template>
                <template v-else>
                    <tr>
                        <td :colspan="columns.length">
                            <slot name="empty">
                                <div class="empty-text text-center text-gray-500 py-8">No Data</div>
                            </slot>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    data: {
        type: Array,
        default: () => []
    },
    columns: {
        type: Array,
        required: true
    },
    height: {
        type: [String, Number],
        default: 'auto'
    }
});

const tableHeight = computed(() => {
    return typeof props.height === 'number' ? `${props.height}px` : props.height;
});

const getColumnClass = (column) => {
    return [
        'p-3 text-left',
        column.fixed ? 'sticky left-0 z-10 bg-white' : '',
        column.class
    ];
};

const getColumnStyle = (column) => {
    return {
        width: column.width ? `${column.width}px` : 'auto',
        minWidth: column.minWidth ? `${column.minWidth}px` : 'auto'
    };
};
</script>

<style scoped>
.custom-table-container {
    overflow: auto;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
}

.custom-table th {
    background-color: #f9fafb;
    color: #6b7280;
    font-weight: 600;
    position: sticky;
    top: 0;
    z-index: 0;
}

.custom-table td {
    border-top: 1px solid #e5e7eb;
}
</style>