<template>
    <div class="mind-map relative p-8">
        <div class="flex items-center">
            <NodeComponent :node="data" @node-click="handleNodeClick" />
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'

const props = defineProps({
    data: {
        type: Object,
        required: true,
        default: () => ({
            id: '',
            label: '',
            type: '',
            children: []
        })
    }
})

const emit = defineEmits(['nodeClick'])

const handleNodeClick = (node) => {
    emit('nodeClick', node)
}

// 递归节点组件
const NodeComponent = {
    name: 'NodeComponent',
    props: ['node'],
    emits: ['nodeClick'],
    setup(props, { emit }) {
        const isExpanded = ref(true)

        const toggleExpand = () => {
            isExpanded.value = !isExpanded.value
        }

        const getNodeIcon = (type) => {
            switch (type) {
                case 'root':
                    return `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            </svg>`
                case 'user':
                    return `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>`
                case 'link':
                    return `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
            </svg>`
                default:
                    return ''
            }
        }

        return () => (
            <div class="flex flex-col items-start">
                <div class="flex items-center">
                    <div
                        class={`
                flex items-center p-2 rounded-lg shadow-sm border
                ${props.node.type === 'root' ? 'bg-red-50 border-red-200' : ''}
                ${props.node.type === 'user' ? 'bg-blue-50 border-blue-200' : ''}
                ${props.node.type === 'link' ? 'bg-purple-50 border-purple-200' : ''}
              `}
                        onClick={() => emit('nodeClick', props.node)}
                    >
                        <div
                            class={`
                  w-8 h-8 rounded-full flex items-center justify-center mr-2
                  ${props.node.type === 'root' ? 'text-red-500 bg-red-100' : ''}
                  ${props.node.type === 'user' ? 'text-blue-500 bg-blue-100' : ''}
                  ${props.node.type === 'link' ? 'text-purple-500 bg-purple-100' : ''}
                `}
                            innerHTML={getNodeIcon(props.node.type)}
                        />
                        <div class="flex flex-col">
                            <span class="text-sm font-medium text-gray-700">
                                {props.node.label}
                            </span>
                            <span class="text-xs text-gray-500">
                                {props.node.id}
                            </span>
                        </div>
                        {props.node.children?.length > 0 && (
                            <button
                                class="ml-2 p-1 hover:bg-gray-100 rounded"
                                onClick={toggleExpand}
                            >
                                <svg
                                    class={`w-4 h-4 transition-transform ${isExpanded.value ? 'rotate-90' : ''
                                        }`}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>

                    {props.node.hasSuggestion && (
                        <div class="ml-4 flex items-center">
                            <div class="w-8 border-t border-dashed border-gray-300"></div>
                            <button class="px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded-full border border-blue-200 hover:bg-blue-100">
                                映射建议
                            </button>
                        </div>
                    )}
                </div>

                {isExpanded.value && props.node.children?.length > 0 && (
                    <div class="ml-12 mt-4 relative">
                        <div class="absolute left-0 top-0 bottom-0 w-px bg-gray-200"></div>
                        <div class="space-y-4">
                            {props.node.children.map((child) => (
                                <div key={child.id} class="relative">
                                    <div class="absolute -left-4 top-1/2 w-4 h-px bg-gray-200"></div>
                                    <NodeComponent
                                        node={child}
                                        onNodeClick={(node) => emit('nodeClick', node)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        )
    }
}
</script>

<style scoped>
.mind-map {
    font-family: system-ui, -apple-system, sans-serif;
}
</style>