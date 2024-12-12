<template>

    <div class="h-full">
        <headLayout />
        <main style="background-color: #e9f3ff;">
            <div class="mx-auto w-full  pb-12 pt-2 lg:px-8 ">
                <div class="rounded-lg shadow ">
                    <router-view>

                    </router-view>
                </div>
            </div>
        </main>

    </div>
</template>

<script setup lang="ts">

import headLayout from './headLayout.vue';


// import { mapActions } from 'pinia';
// import * as api from '@/api/user/index'

</script>