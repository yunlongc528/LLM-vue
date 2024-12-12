export interface Login {
    id: string
    name: string
    username: string
    password: string
    avatar: string
    status: number
    telephone: string
    lastLoginIp: string
    lastLoginTime: number
    creatorId: string
    createTime: number
    merchantCode: string
    deleted: number
    permission: string[]
    menu: Array<any>
    code?: number
    msg?: string
}

export interface GetSmsCaptcha extends Response {
    result: { captcha: number }
}

export interface Logout extends Response {
    result: {}
}

export interface FormState {
    rememberMe: boolean
    username: string
    password: string
    mobile: string
    captcha: string
}
