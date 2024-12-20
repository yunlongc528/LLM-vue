<template>
    <div class="relative inline-block">
        <input :value="modelValue" @input="updateValue" :class="[
            'rounded-md py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600',
            sizeClasses, width,
            { 'pr-10': suffixIcon }
        ]" :placeholder="placeholder" :style="style" />
        <div v-if="isValidSuffixIcon" class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <component :is="suffixIcon" class="w-5 text-gray-400" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue'
import type { Component } from 'vue'

// 定义常量以提高可维护性
const SIZES = {
    large: 'text-lg h-12',
    small: 'text-sm h-10',
    default: 'text-base h-11'
} as const

interface InputProps {
    modelValue: string | number
    placeholder?: string
    suffixIcon?: Component
    size?: keyof typeof SIZES
    style?: Record<string, string>
    width?: string
}

const props = withDefaults(defineProps<InputProps>(), {
    modelValue: '',
    placeholder: '',
    suffixIcon: undefined,
    size: 'default',
    style: () => ({}),
    width: '100%'
})

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number): void
}>()

const updateValue = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (!target) return
    // 确保类型一致
    const newValue = target.value
    emit('update:modelValue', typeof props.modelValue === 'number' ? parseFloat(newValue) : newValue)
}

const isValidSuffixIcon = computed(() => !!props.suffixIcon)

const sizeClasses = computed(() => {
    return SIZES[props.size] || SIZES.default
})
</script>