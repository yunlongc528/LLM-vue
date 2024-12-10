<template>
    <svg :style="{ width, height }">
        <use :xlink:href='prefix + name' fill="red"></use>
    </svg>
</template>
<script setup lang="ts">
defineProps({
    prefix: {
        type: String,
        default: "#icon-"
    },
    name: String,
    color: {
        type: String,
        default: "black"
    },
    width: {
        type: String,
        default: "1rem"
    },
    height: {
        type: String,
        default: "1rem"
    }

})
</script>
<style></style>