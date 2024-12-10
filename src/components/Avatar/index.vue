<template>
    <div :class="[
        'avatar',
        `avatar-${shape}`,
        `avatar-${size}`,
        { 'avatar-image': src },
        { 'avatar-icon': icon },
    ]" :style="style">
        <img v-if="src" :src="src" @error="handleImageError" />
        <span v-else-if="icon" class="avatar-icon">
            <component :is="icon" />
        </span>
        <span v-else class="avatar-string" :style="{ transform: scale && `scale(${scale}) translateX(-50%)` }">
            {{ displayText }}
        </span>
    </div>
</template>

<script setup>
import { computed, ref, onMounted, watch } from 'vue'

const props = defineProps({
    shape: {
        type: String,
        default: 'circle',
        validator: (value) => ['circle', 'square'].includes(value),
    },
    size: {
        type: [Number, String],
        default: 'default',
    },
    src: {
        type: String,
        default: '',
    },
    icon: {
        type: Object,
        default: null,
    },
    alt: {
        type: String,
        default: 'avatar',
    },
    color: {
        type: String,
        default: '',
    },
    backgroundColor: {
        type: String,
        default: '#ccc',
    },
})

const emit = defineEmits(['error'])

const scale = ref(1)
const isImgExist = ref(true)

const sizeValue = computed(() => {
    if (typeof props.size === 'number') {
        return `${props.size}px`
    }
    switch (props.size) {
        case 'large':
            return '40px'
        case 'small':
            return '24px'
        default:
            return '32px'
    }
})

const style = computed(() => ({
    width: sizeValue.value,
    height: sizeValue.value,
    lineHeight: sizeValue.value,
    fontSize: `${parseInt(sizeValue.value) / 2}px`,
    backgroundColor: props.backgroundColor,
    color: props.color,
}))

const displayText = computed(() => {
    if (props.alt && typeof props.alt === 'string') {
        return props.alt.charAt(0).toUpperCase()
    }
    return ''
})

const handleImageError = (e) => {
    emit('error', e)
    isImgExist.value = false
}

const setScale = () => {
    const childrenWidth = textEl.value
    const nodeWidth = containerEl.value
    if (childrenWidth === 0 || nodeWidth === 0) {
        return
    }
    scale.value = nodeWidth - 8 < childrenWidth ? (nodeWidth - 8) / childrenWidth : 1
}

const containerEl = ref(null)
const textEl = ref(null)

onMounted(() => {
    setScale()
})

watch(() => props.alt, setScale)
</script>

<style scoped>
.avatar {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none;
    position: relative;
    display: inline-block;
    overflow: hidden;
    color: #fff;
    white-space: nowrap;
    text-align: center;
    vertical-align: middle;
    background: #ccc;
}

.avatar-image {
    background: transparent;
}

.avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.avatar-circle {
    border-radius: 50%;
}

.avatar-square {
    border-radius: 2px;
}

.avatar-icon {
    font-size: 18px;
}

.avatar-string {
    position: absolute;
    left: 50%;
    transform-origin: 0 center;
}
</style>