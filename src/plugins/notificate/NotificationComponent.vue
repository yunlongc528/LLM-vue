<template>
    <Teleport to="body">
        <TransitionGroup name="notification" tag="div" class="fixed top-4 right-4 z-50 space-y-4">
            <div v-for="notification in notifications" :key="notification.id"
                class="bg-white shadow-md rounded-lg p-4 max-w-sm w-full flex items-start" :class="{
                    'border-l-4 border-blue-500': notification.type === 'info',
                    'border-l-4 border-green-500': notification.type === 'success',
                    'border-l-4 border-yellow-500': notification.type === 'warning',
                    'border-l-4 border-red-500': notification.type === 'error'
                }">
                <div class="flex-shrink-0 mr-3">
                    <svg v-if="notification.type === 'info'" class="w-6 h-6 text-blue-500" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <svg v-else-if="notification.type === 'success'" class="w-6 h-6 text-green-500" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <svg v-else-if="notification.type === 'warning'" class="w-6 h-6 text-yellow-500" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z">
                        </path>
                    </svg>
                    <svg v-else-if="notification.type === 'error'" class="w-6 h-6 text-red-500" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
                <div class="flex-1">
                    <h3 class="text-sm font-medium text-gray-900">{{ notification.title }}</h3>
                    <p class="mt-1 text-sm text-gray-500">{{ notification.message }}</p>
                </div>
                <button @click="removeNotification(notification.id)"
                    class="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-500 focus:outline-none">
                    <XIcon class="w-5 h-5" />
                </button>
            </div>
        </TransitionGroup>
    </Teleport>
</template>

<script setup>
import { ref } from 'vue'
// import { InfoIcon, CheckCircleIcon, AlertCircleIcon, XCircleIcon, XIcon } from 'lucide-vue-next'

const notifications = ref([])

const addNotification = (notification) => {
    const id = Date.now()
    notifications.value.push({ ...notification, id })
    setTimeout(() => removeNotification(id), notification.duration || 5000)
}

const removeNotification = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index !== -1) {
        notifications.value.splice(index, 1)
    }
}

defineExpose({ addNotification })
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
    transition: all 0.3s ease;
}

.notification-enter-from,
.notification-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>