<template>
    <div :style="{ width }" class="relative">
        <Listbox v-model="selectedValues" :multiple="mode === 'multiple'" as="div">
            <ListboxLabel v-if="label" class="block text-sm font-medium text-gray-700 mb-1">{{ label }}</ListboxLabel>
            <div class="relative">
                <ListboxButton ref="buttonRef"
                    class="relative w-full cursor-pointer h-10 rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 sm:text-sm">
                    <span v-if="mode === 'multiple'" class="flex items-center gap-1 overflow-hidden">
                        <template v-if="selectedValues.length">
                            <span v-for="(item, index) in visibleTags" :key="item.value"
                                class="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded whitespace-nowrap">
                                {{ item.label }}
                                <XCircleIcon class="h-3 w-3 cursor-pointer hover:text-blue-600"
                                    @click.stop="removeTag(index)" />
                            </span>
                            <span v-if="hiddenTagsCount > 0"
                                class="inline-flex items-center bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded whitespace-nowrap">
                                + {{ hiddenTagsCount }} ...
                            </span>
                        </template>
                        <span v-else class="text-gray-400">{{ placeholder }}</span>
                    </span>
                    <span v-else class="block truncate">
                        {{ selectedValues.length ? selectedValues[0].label : placeholder }}
                    </span>
                    <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                </ListboxButton>

                <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                    leave-to-class="opacity-0">
                    <ListboxOptions :style="{ maxHeight }"
                        class="absolute z-10 mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                        @scroll="handlePopupScroll">
                        <div v-if="loading" class="text-center py-2 text-gray-500">Loading...</div>
                        <template v-else>
                            <ListboxOption v-for="option in filteredOptions" :key="option.value" :value="option"
                                v-slot="{ active, selected }" as="template">
                                <li :class="[
                                    active ? 'bg-blue-600 text-white' : 'text-gray-900',
                                    'relative cursor-pointer select-none py-2 pl-3 pr-9',
                                ]">
                                    <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                                        {{ option.label }}
                                    </span>
                                    <span v-if="selected" :class="[
                                        active ? 'text-white' : 'text-blue-600',
                                        'absolute inset-y-0 right-0 flex items-center pr-4',
                                    ]">
                                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                    </span>
                                </li>
                            </ListboxOption>
                        </template>
                    </ListboxOptions>
                </transition>
            </div>
        </Listbox>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick, onUnmounted } from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon, XCircleIcon } from '@heroicons/vue/20/solid'


interface Option {
    value: string | number
    label: string
}

interface Props {
    options: Option[]
    modelValue: Option | Option[] | null
    mode?: 'default' | 'multiple'
    label?: string
    placeholder?: string
    width?: string
    maxHeight?: string
    loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    mode: 'default',
    label: '',
    placeholder: 'Please select',
    width: '100%',
    maxHeight: '15rem',
    loading: false,
})
const searchQuery = ref('')
const emit = defineEmits<{
    (e: 'update:modelValue', value: Option | Option[] | null): void
    (e: 'popupScroll', event: Event): void
}>()

const buttonRef = ref<HTMLElement | null>(null)
const selectedValues = ref<Option[]>(
    Array.isArray(props.modelValue) ? props.modelValue : props.modelValue ? [props.modelValue] : []
)

const visibleTags = ref<Option[]>([])
const hiddenTagsCount = ref(0)

const updateVisibleTags = async () => {
    if (!buttonRef.value || props.mode !== 'multiple') return

    await nextTick()

    const containerWidth = buttonRef.value.offsetWidth - 60 // Account for padding and arrow
    const tempDiv = document.createElement('div')
    tempDiv.style.visibility = 'hidden'
    tempDiv.style.position = 'absolute'
    tempDiv.style.whiteSpace = 'nowrap'
    document.body.appendChild(tempDiv)

    let totalWidth = 0
    let visibleCount = 0

    for (let i = 0; i < selectedValues.value.length; i++) {
        const item = selectedValues.value[i]
        tempDiv.textContent = item.label
        const tagWidth = tempDiv.offsetWidth + 40 // Add padding and x button width

        if (totalWidth + tagWidth > containerWidth) {
            // Check if we need space for the counter
            const counterWidth = 50 // Approximate width for "+ N ..." tag
            if (totalWidth + counterWidth > containerWidth) {
                visibleCount = Math.max(0, i - 1)
            } else {
                visibleCount = i
            }
            break
        }

        totalWidth += tagWidth
        visibleCount = i + 1
    }

    document.body.removeChild(tempDiv)

    visibleTags.value = selectedValues.value.slice(0, visibleCount)
    hiddenTagsCount.value = Math.max(0, selectedValues.value.length - visibleCount)
}

const removeTag = (index: number) => {
    const newValues = [...selectedValues.value]
    newValues.splice(index, 1)
    selectedValues.value = newValues
}
const filteredOptions = computed(() => {
    if (!searchQuery.value) return props.options
    const query = searchQuery.value.toLowerCase()
    return props.options.filter(option => option.label.toLowerCase().includes(query))
})

watch(selectedValues, (newValue) => {
    console.log('selectedValues changed:', newValue, selectedValues.value)

    emit('update:modelValue', props.mode === 'default' ? newValue : newValue[0] || null)
    updateVisibleTags()
})

watch(() => props.modelValue, (newValue) => {
    console.log('props.modelValue changed:', newValue)
    selectedValues.value = Array.isArray(newValue) ? newValue : newValue ? [newValue] : []
})

const handlePopupScroll = (event: Event) => {
    emit('popupScroll', event)
}

onMounted(() => {
    updateVisibleTags()
    window.addEventListener('resize', updateVisibleTags)
})

// Clean up the resize listener
onUnmounted(() => {
    window.removeEventListener('resize', updateVisibleTags)
})
</script>