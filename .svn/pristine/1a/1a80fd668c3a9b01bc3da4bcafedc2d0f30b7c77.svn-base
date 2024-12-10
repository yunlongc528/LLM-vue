import SvgIcon from '@/components/SvgIcon/index.vue'
import { App } from 'vue'

const allGloablalComponent = { SvgIcon }
export default {
    install(app: App) {
        Object.keys(allGloablalComponent).forEach((key) => {
            app.component(key, allGloablalComponent[key])
        })
    },
}
