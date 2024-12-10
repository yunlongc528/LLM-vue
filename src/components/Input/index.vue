<template>
    <div :class="['relative inline-block']">
        <input :value="modelValue" @input="updateValue" :class="[
            '  rounded-md py-2 px-3  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 ',
            sizeClasses, width,
            { 'pr-10': suffixIcon }
        ]" :placeholder="placeholder" :style="style" />
        <div v-if="suffixIcon" class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <component :is="suffixIcon" class=" w-5 text-gray-400" />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    },
    suffixIcon: {
        type: Object,
        default: null
    },
    size: {
        type: String,
        default: 'default',
        validator: (value) => ['large', 'default', 'small'].includes(value)
    },
    style: {
        type: Object,
        default: () => ({})
    },
    width: {
        type: String,
        default: '100%'
    }
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event) => {
    emit('update:modelValue', event.target.value)
}

const sizeClasses = computed(() => {
    switch (props.size) {
        case 'large':
            return 'text-lg h-12'
        case 'small':
            return 'text-sm h-10'
        default:
            return 'text-base '
    }
})
</script>