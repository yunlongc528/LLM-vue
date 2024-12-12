<template>
    <div class="h-full flex flex-col ">
        <header class="bg-[#0e3d91] text-white p-4">
            <div class="container mx-auto flex items-center">
                <img src="/public/police-icon.35c742fe.png" alt="Logo" class="h-8 w-8 mr-2">
                <h1 class="text-xl font-bold">GA统一登录系统</h1>
            </div>
        </header>

        <main class=" h-full flex items-center justify-center ">
            <div class="flex h-full flex-1">
                <div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div class="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <!-- <img class="h-10 w-auto"
                                src="https://tailwindui.starxg.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt="Your Company" /> -->
                            <h2 class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">GA统一登录系统
                            </h2>
                            <!-- <p class="mt-2 text-sm leading-6 text-gray-500">
                                Not a member?
                                {{ ' ' }}
                                <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Start a 14 day
                                    free
                                    trial</a>
                            </p> -->
                        </div>

                        <div class="mt-10">
                            <div>
                                <form class="space-y-6">
                                    <div>
                                        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">
                                            账号</label>
                                        <div class="mt-2">
                                            <input id="email" name="email" autocomplete="email" required="true"
                                                class="block w-full rounded-md border-0 pl-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>

                                    <div>
                                        <label for="password"
                                            class="block text-sm font-medium leading-6 text-gray-900">密码</label>
                                        <div class="mt-2">
                                            <input id="password" name="password" type="password"
                                                autocomplete="current-password" required="true"
                                                class="block w-full rounded-md pl-3 border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>

                                    <div class="flex items-center justify-between">
                                        <div class="flex items-center">
                                            <input type="checkbox"
                                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                            <label for="remember-me"
                                                class="ml-3 block text-sm leading-6 text-gray-700">Remember
                                                me</label>
                                        </div>

                                        <div class="text-sm leading-6">
                                            <div class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot
                                                password?</div>
                                        </div>
                                    </div>

                                    <div>
                                        <button @click.prevent="login"
                                            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                                            in</button>
                                    </div>
                                </form>
                            </div>

                            <div class="mt-10">
                                <div class="relative">
                                    <div class="absolute inset-0 flex items-center" aria-hidden="true">
                                        <div class="w-full border-t border-gray-200" />
                                    </div>
                                    <div class="relative flex justify-center text-sm font-medium leading-6">
                                        <span class="bg-white px-6 text-gray-900">Or continue with</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="relative hidden w-0 flex-1 lg:block">
                    <img class="absolute inset-0 h-full w-full object-cover" src="/public//login-bg.png" alt="" />
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, UnwrapRef, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

import { FormState } from './types'

// import * as api from '@/api/user/index'
import axios from 'axios'
import { loginSuccess, requestFailed } from './helpr'
const formRef: UnwrapRef<FormState> = reactive({
    rememberMe: false,
    username: '',
    password: '',
    mobile: '',
    captcha: ''
})
const login = async () => {
    const response = await axios.post('/api/login', {
        username: 'admin',
        password: '123456',
    })
    const res = response.data;
    console.log(res)
    if (res.code == 200) {
        // mock用,可删
        if (res.code === 403) {
            // formRef.password = ''
            // state.loginBtn = false
            return
        }
        // if (config.useAsyncRouter) {
        //     generateAsyncRoutes(router, res.menu)
        // }
        console.log(res)
        loginSuccess(res.data, router)
    } else {
        requestFailed(res)
        // formRef.password = ''
    }
}
</script>

<style scoped>
body {
    background-image: linear-gradient(45deg, #e6edf5 25%, transparent 25%),
        linear-gradient(-45deg, #e6edf5 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, #e6edf5 75%),
        linear-gradient(-45deg, transparent 75%, #e6edf5 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}
</style>