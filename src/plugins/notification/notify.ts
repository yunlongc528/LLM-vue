import { createApp, h } from 'vue'
import Notification from './Notification.vue'

const instances = []
let seed = 1

const notify = (options) => {
    const id = `notification_${seed++}`
    // const userOnClose = options.onClose

    // options.onClose = () => {
    //     notify.close(id, userOnClose)
    // }

    const instance = createApp({
        render() {
            return h(Notification, {
                ...options,
                ref: 'notification',
            })
        },
    })

    const mountNode = document.createElement('div')
    document.body.appendChild(mountNode)
    instance.mount(mountNode)

    const offset = 0
    const len = instances.length

    instances.push({
        id,
        vm: instance,
        offset: offset + (len > 0 ? instances[len - 1].offset + 60 : 0),
    })

    const vm = instance._instance.proxy

    Object.defineProperty(vm, '$el', {
        get() {
            return mountNode
        },
    })

    return vm
}

// notify.close = (id, userOnClose) => {
//     const index = instances.findIndex((instance) => instance.id === id)
//     if (index === -1) return

//     const { vm } = instances[index]
//     if (!vm) return

//     userOnClose?.()

//     const removedHeight = vm.$el.offsetHeight
//     instances.splice(index, 1)

//     const len = instances.length
//     if (len < 1) return

//     for (let i = index; i < len; i++) {
//         instances[i].offset -= removedHeight + 16
//     }
// }

export default notify
