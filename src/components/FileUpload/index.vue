<template>
    <div class="upload-container">
        <div class="upload-drop-zone" :class="{ 'is-dragover': isDragover }" @drop.prevent="handleDrop"
            @dragover.prevent="isDragover = true" @dragleave.prevent="isDragover = false" @click="triggerFileInput">
            <input type="file" ref="fileInput" class="hidden-input" :accept="accept" :multiple="multiple"
                @change="handleFileChange" />
            <div class="upload-content">
                <div class="upload-icon">
                    <SvgIcon name="upload" width="50" height="50" />
                </div>
                <div class="upload-text">
                    Drop file here or <em>click to upload</em>
                </div>
            </div>
        </div>
        <div class="upload-tip">
            jpg/png files with a size less than 500kb
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'

const props = defineProps({
    accept: {
        type: String,
        default: 'image/jpeg,image/png'
    },
    multiple: {
        type: Boolean,
        default: true
    },
    maxSize: {
        type: Number,
        default: 500 * 1024 // 500kb in bytes
    }
})

const emit = defineEmits(['file-selected'])

const fileInput = ref(null)
const isDragover = ref(false)

const triggerFileInput = () => {
    fileInput.value.click()
}

const validateFile = (file) => {
    if (file.size > props.maxSize) {
        alert('File size exceeds 500kb limit')
        return false
    }

    const allowedTypes = props.accept.split(',')
    if (!allowedTypes.includes(file.type)) {
        alert('File type not supported')
        return false
    }

    return true
}

const handleFiles = (files) => {
    const validFiles = Array.from(files).filter(validateFile)
    if (validFiles.length > 0) {
        emit('file-selected', validFiles)
    }
}

const handleFileChange = (event) => {
    handleFiles(event.target.files)
    event.target.value = '' // Reset input
}

const handleDrop = (event) => {
    isDragover.value = false
    handleFiles(event.dataTransfer.files)
}
</script>

<style scoped>
.upload-container {
    width: 100%;
}

.upload-drop-zone {
    position: relative;
    padding: 40px 20px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    background-color: #fafafa;
    cursor: pointer;
    transition: border-color 0.3s;
}

.upload-drop-zone:hover,
.upload-drop-zone.is-dragover {
    border-color: #409eff;
    background-color: #f5f7fa;
}

.hidden-input {
    display: none;
}

.upload-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

.upload-icon {
    color: #909399;
}

.icon {
    width: 28px;
    height: 28px;
}

.upload-text {
    color: #606266;
    font-size: 14px;
}

.upload-text em {
    color: #409eff;
    font-style: normal;
    font-weight: 500;
}

.upload-tip {
    margin-top: 8px;
    font-size: 12px;
    color: #909399;
}
</style>