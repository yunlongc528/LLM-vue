<template>
    <Teleport to="body">
        <Transition name="fade">
            <div v-if="isOpen" class="fixed inset-0 overflow-hidden z-50 " aria-labelledby="slide-over-title"
                role="dialog" aria-modal="true">
                <div class="absolute inset-0 overflow-hidden ">
                    <!-- Background overlay -->
                    <div class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"
                        @click="close"></div>

                    <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 ">
                        <Transition name="slide-over">
                            <div v-if="isOpen" :class="['pointer-events-auto', 'relative', 'w-screen', width]">

                                <div class="flex h-full flex-col overflow-y-scroll py-2  bg-white shadow-xl bg-no-repeat bg-top bg-contain"
                                    style="background-image: url('/public/drawer-bg.png');background-size: 100% 120px;"
                                    id="content-container">
                                    <div class="px-4 sm:px-6 my-3">
                                        <div class="flex items-start justify-between">
                                            <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">
                                                {{ title }}
                                            </h2>
                                            <div class="ml-3 flex h-7 items-center">
                                                <button type="button"
                                                    class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                    @click="close">
                                                    <span class="sr-only">Close panel</span>
                                                    <XIcon class="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="relative mt-1 flex-1 px-4 sm:px-6">
                                        <!-- Drawer content -->
                                        <div class="absolute inset-0 px-4 sm:px-6">
                                            <slot></slot>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true
    },
    title: {
        type: String,
        default: 'Drawer'
    },
    width: {
        type: String,
        default: 'max-w-md'
    }
});

const emit = defineEmits(['close']);

const close = () => {
    emit('close');
};

// Handle ESC key press to close the drawer
const handleKeyDown = (event) => {
    if (event.key === 'Escape' && props.isOpen) {
        close();
    }
};

onMounted(() => {
    document.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-over-enter-active,
.slide-over-leave-active {
    transition: transform 0.3s ease-out;
}

.slide-over-enter-from,
.slide-over-leave-to {
    transform: translateX(100%);
}
</style>