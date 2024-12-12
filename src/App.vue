<template>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { computed, ref, onErrorCaptured, h } from 'vue'

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