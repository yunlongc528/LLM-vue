import { createApp, h } from 'vue'
import Notification from '@/plugins/notificate/NotificationComponent.vue'

let notificationInstance = null

export const notificationPlugin = {
    install(app) {
        if (!notificationInstance) {
            const notificationContainer = document.createElement('div')
            document.body.appendChild(notificationContainer)

            const notificationApp = createApp(Notification)
            notificationInstance = notificationApp.mount(notificationContainer)
        }

        app.config.globalProperties.$notify = (options) => {
            notificationInstance.addNotification(options)
        }

        app.provide('notify', (options) => {
            notificationInstance.addNotification(options)
        })
    },
}

// export const useNotification = () => {
//     return {
//         notify: (options) => {
//             if (notificationInstance) {
//                 notificationInstance.addNotification(options)
//             } else {
//                 console.warn('Notification plugin is not installed')
//             }
//         },
//     }
// }
export const notify = (options) => {
    if (notificationInstance) {
        notificationInstance.addNotification(options)
    } else {
        console.warn('Notification plugin is not installed')
    }
}
