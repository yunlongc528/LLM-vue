<template>
    <Teleport to="body">
        <Transition name="dialog">
            <div v-if="modelValue" class="dialog-overlay" @click="handleOverlayClick">
                <div class="dialog" :style="{ width: width }" @click.stop>
                    <div class="dialog-header">
                        <span class="dialog-title">{{ title }}</span>
                        <button v-if="showClose" class="dialog-close" @click="handleClose">
                            <SvgIcon name="x" width="20" height="20" />

                        </button>
                    </div>
                    <div class="dialog-body">
                        <slot></slot>
                    </div>
                    <div v-if="$slots.footer" class="dialog-footer">
                        <slot name="footer"></slot>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import { watch } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    title: {
        type: String,
        default: ''
    },
    width: {
        type: String,
        default: '50%'
    },
    showClose: {
        type: Boolean,
        default: true
    },
    closeOnClickModal: {
        type: Boolean,
        default: true
    },
    beforeClose: {
        type: Function
    }
})

const emit = defineEmits(['update:modelValue', 'open', 'opened', 'close', 'closed'])

watch(() => props.modelValue, (newVal) => {
    if (newVal) {
        emit('open')
        setTimeout(() => emit('opened'), 300)
    } else {
        emit('close')
        setTimeout(() => emit('closed'), 300)
    }
})

const handleClose = () => {
    if (props.beforeClose) {
        props.beforeClose(close)
    } else {
        close()
    }
}

const close = () => {
    emit('update:modelValue', false)
}

const handleOverlayClick = () => {
    if (props.closeOnClickModal) {
        handleClose()
    }
}
</script>

<style scoped lang="scss">
.dialog-overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2000;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.dialog {
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
}

.dialog-header {
    padding: 20px;
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.dialog-title {
    font-size: 18px;
    line-height: 24px;
    color: #303133;
}

.dialog-close {
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: #909399;
}

.dialog-body {
    padding: 30px 20px;
    color: #606266;
    font-size: 14px;
}

.dialog-footer {
    padding: 20px;
    padding-top: 10px;
    text-align: right;
}

.dialog-enter-active,
.dialog-leave-active {
    transition: all 0.3s ease-out;

    .dialog {
        transition: all 0.3s ease-out;
    }
}

.dialog-enter-from,
.dialog-leave-to {
    opacity: 0;

    .dialog {
        transform: scale(0.9);
        transition: all 0.3s ease-out;

    }
}
</style>