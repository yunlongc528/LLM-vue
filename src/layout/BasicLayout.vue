<template>

    <div class="h-full">
        <headLayout />
        <main style="background-color: #e9f3ff;height: 100%;">
            <div class="mx-auto max-w-full  pb-12 pt-2 lg:px-8 h-full">
                <div class="rounded-lg shadow h-full">
                    <router-view>

                    </router-view>
                </div>
            </div>
        </main>

    </div>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { navigation } from '@/router/routes'
import { useRouter } from 'vue-router'
import headLayout from './headLayout.vue';

const router = useRouter()

// import { mapActions } from 'pinia';
// import * as api from '@/api/user/index'
const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const actions = (action) => {
    if (action == "singOut") {
        // api.signOut()
        window.localStorage.clear()
        router.push({ path: '/user/login' })
    }
}
// const navigation1 = [
//     { name: 'POS', path: '#', current: true },
//     { name: 'Kiosk Orders', path: '#', current: false },
//     { name: 'ORDERS', path: '#', current: false },
//     { name: 'Sessions', path: '#', current: false },
// ]
const userNavigation = [
    { name: 'Your Profile', action: '#' },
    { name: 'Settings', action: '#' },
    { name: 'Sign out', action: "singOut" },
]
</script>
<style>
.el-main {
    --el-main-padding: 0px;
}
</style>
