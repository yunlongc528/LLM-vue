<template>
    <div>
        <label :for="id" class="block text-sm font-medium text-gray-700">
            {{ label }} <span v-if="required" class="text-red-500">*</span>
        </label>
        <div class="mt-1">
            <textarea v-if="as === 'textarea'" :id="id" v-bind="$attrs" :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="4"></textarea>
            <select v-else-if="as === 'select'" :id="id" v-bind="$attrs" :value="modelValue"
                @change="$emit('update:modelValue', $event.target.value)"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                <slot></slot>
            </select>
            <input v-else :id="id" :type="type" v-bind="$attrs" :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        </div>
        <slot name="hint"></slot>
    </div>
</template>

<script setup>
defineProps({
    label: String,
    id: String,
    modelValue: [String, Number],
    required: Boolean,
    as: {
        type: String,
        default: 'input'
    },
    type: {
        type: String,
        default: 'text'
    }
})

defineEmits(['update:modelValue'])
</script>