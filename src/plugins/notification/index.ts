import notify from './notify'

const NotificationPlugin = {
    install(app, options) {
        app.config.globalProperties.$notify = notify
        app.provide('notify', options)
    },
}

export default NotificationPlugin
