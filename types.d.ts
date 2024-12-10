declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $notify: (options: NotifyOptions) => void // 添加 $notify 的类型
    }
}
