<template>
    <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8 bg-indigo-600">
        <div class="hidden border-t border-white border-opacity-20 py-5 lg:block">
            <div class="grid grid-cols-3 items-center gap-8">
                <div class="col-span-2">
                    <nav class="flex space-x-4">
                        <router-link :to="item.path" v-for="item in navigation" :key="item.name"
                            active-class="bg-indigo-700 text-white"
                            :class="['text-white hover:bg-indigo-500 hover:bg-opacity-75', 'rounded-md px-3 py-2 text-sm font-medium']">{{
                                item.name }}</router-link>
                    </nav>
                </div>

            </div>
        </div>
    </div>

</template>
<script setup lang="ts">

interface MenuItem {
    name: string;
    path: string;
    current: boolean;
}
defineProps<{
    navigation: MenuItem[];
}>();
</script>
