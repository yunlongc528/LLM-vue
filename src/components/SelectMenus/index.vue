<template>
    <div :style="{ width }" class="relative" @blur="handleBlur" tabindex="0" ref="dropdownRef">
        <div v-if="label" class="block text-sm font-medium text-gray-700 mb-1">
            {{ label }}
        </div>
        <div class="relative">
            <button ref="buttonRef" @click="toggleDropdown"
                class="relative w-full cursor-pointer h-10 rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 sm:text-sm">
                <span v-if="mode === 'multiple'" class="flex items-center gap-1 overflow-hidden">
                    <template v-if="selectedValues.length">
                        <span v-for="(item, index) in visibleTags" :key="item.value"
                            class="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded whitespace-nowrap">
                            {{ item.label }}
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 cursor-pointer hover:text-blue-600"
                                viewBox="0 0 20 20" fill="currentColor" @click.stop="removeTag(index)">
                                <path fill-rule="evenodd"
                                    d="M10 9.293l4.646-4.647a.5.5 0 0 1 .708.708L10.707 10l4.647 4.646a.5.5 0 0 1-.708.708L10 10.707l-4.646 4.647a.5.5 0 0 1-.708-.708L9.293 10 4.646 5.354a.5.5 0 0 1 .708-.708L10 9.293z"
                                    clip-rule="evenodd" />
                            </svg>
                        </span>
                        <span v-if="hiddenTagsCount > 0"
                            class="inline-flex items-center bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded whitespace-nowrap">
                            + {{ hiddenTagsCount }} ...
                        </span>
                    </template>
                    <span v-else class="text-gray-400">{{ placeholder }}</span>
                </span>
                <span v-else class="block truncate" :class="[selectedValues.length ? '' : 'text-gray-400']">
                    {{ selectedValues.length ? selectedValues[0].label : placeholder }}
                </span>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M5.293 9.293a1 1 0 0 1 1.414 0L10 12.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                            clip-rule="evenodd" />
                    </svg>
                </span>
            </button>
            <transition name="dropdown" leave-active-class="transition ease-in duration-100"
                leave-from-class="opacity-100" leave-to-class="opacity-0">
                <ul v-if="dropdownOpen" :style="{ maxHeight }"
                    class="absolute z-10 mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    <li v-for="option in filteredOptions" :key="option.value" @click="selectOption(option)"
                        @mouseleave="activeIndex = -1" @mouseenter="activeIndex = filteredOptions.indexOf(option)"
                        :class="[
                            activeIndex == filteredOptions.indexOf(option) ? 'bg-blue-600 text-white' : 'text-gray-900',
                            'relative cursor-pointer select-none py-2 pl-3 pr-9',
                        ]">
                        <span :class="[isSelected(option) ? 'font-semibold' : 'font-normal', 'block truncate']">
                            {{ option.label }}
                        </span>
                        <span :class="[
                            isSelected(option) ? 'text-blue-600' : 'text-white',
                            'absolute inset-y-0 right-0 flex items-center pr-4',
                            activeIndex == filteredOptions.indexOf(option) ? ' text-white' : 'text-blue-600',
                        ]">
                            <CheckIcon class="h-5 w-5" aria-hidden="true" />
                        </span>
                    </li>
                </ul>
            </transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick, onUnmounted } from 'vue'
import { CheckIcon } from '@heroicons/vue/20/solid'

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
}

const props = withDefaults(defineProps<Props>(), {
    mode: 'default',
    label: '',
    placeholder: 'Please select',
    width: '100%',
    maxHeight: '15rem',
})
const activeIndex = ref(-1)
const emit = defineEmits<{
    (e: 'update:modelValue', value: Option | Option[] | null): void
}>()

const dropdownRef = ref<HTMLElement | null>(null)
const buttonRef = ref<HTMLElement | null>(null)
const dropdownOpen = ref(false)
const selectedValues = ref<Option[]>(
    Array.isArray(props.modelValue) ? props.modelValue : props.modelValue ? [props.modelValue] : []
)

const visibleTags = ref<Option[]>([])
const hiddenTagsCount = ref(0)
const searchQuery = ref('')

const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value
    if (dropdownOpen.value) {
        nextTick(() => {
            dropdownRef.value?.focus()
        })
    }
}


const handleBlur = (event: FocusEvent) => {
    setTimeout(() => {
        if (!event.relatedTarget || !dropdownRef.value?.contains(event.relatedTarget as Node)) {
            dropdownOpen.value = false
        }
    }, 0)
}

const selectOption = (option: Option) => {
    if (props.mode === 'multiple') {
        if (isSelected(option)) {
            selectedValues.value = selectedValues.value.filter(o => o.value !== option.value)
        } else {
            selectedValues.value.push(option)
        }
    } else {
        selectedValues.value = [option]
        dropdownOpen.value = false
    }
    emit('update:modelValue', props.mode === 'multiple' ? selectedValues.value : selectedValues.value[0] || null)
}

const isSelected = (option: Option) => {
    return selectedValues.value.some(o => o.value === option.value)
}

const removeTag = (index: number) => {
    selectedValues.value.splice(index, 1)
}

const filteredOptions = computed(() => {
    if (!searchQuery.value) return props.options
    const query = searchQuery.value.toLowerCase()
    return props.options.filter(option => option.label.toLowerCase().includes(query))
})

const updateVisibleTags = async () => {
    if (!buttonRef.value || props.mode !== 'multiple') return

    await nextTick()

    const containerWidth = buttonRef.value.offsetWidth - 60
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
        const tagWidth = tempDiv.offsetWidth + 40

        if (totalWidth + tagWidth > containerWidth) {
            const counterWidth = 50
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

watch(selectedValues, () => {
    updateVisibleTags()
}, { deep: true })

onMounted(() => {
    updateVisibleTags()
    window.addEventListener('resize', updateVisibleTags)
})

onUnmounted(() => {
    window.removeEventListener('resize', updateVisibleTags)
})
</script>
