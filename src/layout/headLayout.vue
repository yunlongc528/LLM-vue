<template>
    <header class="bg-white">
        <nav class="mx-auto flex max-w-8xl items-center   p-3 lg:px-8" aria-label="Global">

            <div class="flex lg:hidden">

                <button type="button"
                    class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    @click="mobileMenuOpen = true">
                    <span class="sr-only">Open main menu</span>
                    <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                </button>
            </div>
            <PopoverGroup class="hidden lg:flex lg:gap-x-6 w-full">
                <div class="flex items-center ">
                    <img class="h-8 w-auto" src="/public/下载.png" alt="" />
                </div>
                <div class="flex gap-3 mx-auto">
                    <router-link v-for="item in menu" :key="item.href" :to="item.href" :class="[
                        'text-sm font-semibold leading-6 p-2 text-gray-900',
                        isActive(item) ? 'bg-indigo-700 text-white rounded-md' : ''
                    ]">{{ item.name
                        }}</router-link>

                    <Popover class="relative">
                        <PopoverButton :class="[
                            'flex items-center gap-x-1 text-sm font-semibold leading-6 p-2',
                            isManagementActive ? 'bg-indigo-700 text-white rounded-md' : 'text-gray-900'
                        ]">
                            系统管理
                            <ChevronDownIcon class="h-5 w-5 flex-none text-gray-400" />
                        </PopoverButton>

                        <transition enter-active-class="transition ease-out duration-200"
                            enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0"
                            leave-active-class="transition ease-in duration-150"
                            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
                            <PopoverPanel
                                class="absolute -left-0 top-full z-10 mt-3 w-auto overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-900/5">
                                <div class="p-1">
                                    <div v-for="item in management" :key="item.name" class="relative hover:bg-gray-50">
                                        <div class="flex items-center gap-x-2 w-32 group m-2 leading-6">
                                            <div
                                                class="flex h-5 w-5 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                <SvgIcon :name="item.icon" width="20" height="20" />
                                            </div>
                                            <router-link :to="item.href" active-class=" text-indigo-700 "
                                                @click="checkManagementRoute(item.href)">
                                                {{ item.name }}
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                            </PopoverPanel>
                        </transition>
                    </Popover>
                </div>



                <div class="text-sm font-semibold leading-6 p-2">调证管理</div>
                <Popover class="relative mr-3">
                    <PopoverButton class="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 p-2 ">

                        <Avatar size="small" style="background-color: #87d068" alt="C"></Avatar>
                        <ChevronDownIcon class="h-5 w-5 flex-none text-gray-400" />
                    </PopoverButton>

                    <transition enter-active-class="transition ease-out duration-200"
                        enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0"
                        leave-active-class="transition ease-in duration-150"
                        leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
                        <PopoverPanel
                            class="absolute -left-16 top-full z-10 mt-3 w-auto overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-900/5">
                            <div class="w-40 p-3 flex flex-col gap-2">
                                <div>
                                    <Avatar size="small" style="background-color: #87d068" alt="C"></Avatar>

                                    慈溪市公安局
                                </div>
                                <button @click="Logout" class="text-center hover:bg-sky-100">
                                    退出登录
                                </button>
                            </div>
                        </PopoverPanel>
                    </transition>
                </Popover>
            </PopoverGroup>


        </nav>
        <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
            <div class="fixed inset-0 z-10" />
            <DialogPanel
                class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div class="flex items-center justify-between">
                    <a href="#" class="-m-1.5 p-1.5">
                        <span class="sr-only">Your Company</span>
                        <img class="h-8 w-auto" src="/public/下载.png" alt="" />
                    </a>
                    <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
                        <span class="sr-only">Close menu</span>
                        <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div class="mt-6 flow-root">
                    <div class="-my-6 divide-y divide-gray-500/10">
                        <div class="space-y-2 py-6">

                            <router-link v-for="item in menu" :key="item.href" :to="item.href"
                                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">{{
                                    item.name }}</router-link>
                            <Disclosure as="div" class="-mx-3" v-slot="{ open }">
                                <DisclosureButton
                                    class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                    系统管理
                                    <ChevronDownIcon :class="[open ? 'rotate-180' : '', 'h-5 w-5 flex-none']"
                                        aria-hidden="true" />
                                </DisclosureButton>
                                <DisclosurePanel class="mt-2 space-y-2">
                                    <router-link v-for="item in management" :key="item.name" as="a" :to="item.href"
                                        class="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                        {{ item.name }}</router-link>
                                </DisclosurePanel>
                            </Disclosure>
                        </div>
                        <div class="py-6">
                            <a href="#"
                                class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log
                                in</a>
                        </div>
                    </div>
                </div>
            </DialogPanel>
        </Dialog>
    </header>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import Avatar from '@/components/Avatar/index.vue'
import ls from '@/utils/Storage'
import SvgIcon from '@/components/SvgIcon/index.vue'
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
} from '@headlessui/vue'
import { useUserMenuList } from '@/stores/userMenu'
const UserMenuList = useUserMenuList()
import {
    Bars3Icon,
    ChartPieIcon,
    XMarkIcon,
} from '@heroicons/vue/24/outline'
import { useRoute } from 'vue-router';
const route = useRoute();
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
const management = reactive(JSON.parse(ls.get('menuItems')))
const menu = [
    { name: '首页', href: '/large-model/homeLayout' },
    { name: '案件研判', href: '/large-model/case-analysis' },
    { name: '价值实体库', href: '/large-model/entity-library' },
    { name: '笔录助手', href: '/large-model/a' },
    { name: '执法监督', href: '/large-model/a' },
    { name: '情报知识库', href: '/large-model/a' }
]

const mobileMenuOpen = ref(false)
const Logout = () => {
    localStorage.clear()
    window.location.reload()
}

const checkManagementRoute = (href) => {
    console.log(href)
    // 点击子菜单时，强制更新激活状态
    if (route.path.startsWith(href)) {
        isManagementActive.value = true;
    }
};
const isManagementActive = computed(() => {
    // 判断当前路径是否与子菜单的路径匹配
    return management.some(item => route.path.startsWith(item.href));
});
const isActive = (item) => {
    console.log(route.path.startsWith(item.href))
    // Check if the current route path starts with the item's href
    return route.path.startsWith(item.href) && item.href !== '/'
        || route.path === item.href;
}
</script>