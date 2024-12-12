// export const isDev = import.meta.env.DEV

export const baseURL = 'http://121.196.211.196:8080'
export function timeFix() {
    const time = new Date()
    const hour = time.getHours()
    return hour < 9
        ? '早上好'
        : hour <= 11
        ? '上午好'
        : hour <= 13
        ? '中午好'
        : hour < 20
        ? '下午好'
        : '晚上好'
}
