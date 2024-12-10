<template>
    <div :style="{ width }">
        <Listbox as="div" v-model="selectedPerson">
            <ListboxLabel class="block text-sm/6 font-medium text-gray-900">{{ label }}</ListboxLabel>
            <div class="relative">
                <ListboxButton
                    class="relative w-full cursor-default h-10 rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm/6">
                    <span class="block truncate">
                        {{ selectedPerson ? selectedPerson.name : placeholder }}
                    </span>
                    <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon class="size-5 text-gray-400" aria-hidden="true" />
                    </span>
                </ListboxButton>

                <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                    leave-to-class="opacity-0">
                    <ListboxOptions :style="{ maxHeight: maxHeight }"
                        class="absolute z-10 mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        <ListboxOption v-for="person in options" :key="person.id" :value="person"
                            v-slot="{ active, selected }" as="template">
                            <li :class="[
                                active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                'relative cursor-default select-none py-2 pl-3 pr-9'
                            ]">
                                <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                                    {{ person.name }}
                                </span>
                                <span v-if="selected" :class="[
                                    active ? 'text-white' : 'text-indigo-600',
                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                ]">
                                    <CheckIcon class="size-5" aria-hidden="true" />
                                </span>
                            </li>
                        </ListboxOption>
                    </ListboxOptions>
                </transition>
            </div>
        </Listbox>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
    options: {
        type: Array,
        required: true
    },
    modelValue: {
        type: Object,
        default: null
    },
    label: {
        type: String,
        default: '      '
    },
    placeholder: {
        type: String,
        default: '请选择'
    },
    width: {
        type: String,
        default: '100%'
    },
    maxHeight: {
        type: String,
        default: '15rem'
    }
})

const emit = defineEmits(['update:modelValue'])

const selectedPerson = ref(props.modelValue)

watch(selectedPerson, (newValue) => {
    emit('update:modelValue', newValue)
})
</script>