<template>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { computed, ref, onErrorCaptured, h } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
const language = ref('zh-cn')
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))
import { notify } from '@/plugins/notificate/notification-plugin'

onErrorCaptured((err, instance, info) => {
  if (window.env !== 'localhost') {
    // debugger
    notify({
      type: 'error',
      title: err,
      message: info,
      duration: 2000,
    })
  }
})
</script>
<style lang="scss"></style>