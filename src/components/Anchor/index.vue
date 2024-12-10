<template>
    <nav class="anchor" :style="{ '--offset': `${offset}px` }">
        <slot></slot>
    </nav>
</template>

<script setup>
import { provide, ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    offset: {
        type: Number,
        default: 0
    },
    container: {
        type: String,
        default: ''
    }
});

const activeLink = ref(null);
const containerElement = ref(null);

provide('activeLink', activeLink);
provide('setActiveLink', (link) => {
    activeLink.value = link;
});
provide('containerElement', containerElement);

const handleScroll = () => {
    if (!containerElement.value) return;

    const links = containerElement.value.querySelectorAll('.anchor-link');
    const scrollTop = containerElement.value.scrollTop;

    for (const link of links) {
        const href = link.getAttribute('href');
        const target = containerElement.value.querySelector(href);
        if (target) {
            const { top } = target.getBoundingClientRect();
            const containerTop = containerElement.value.getBoundingClientRect().top;
            if (top - containerTop <= props.offset + 5) {
                activeLink.value = href;
            }
        }
    }
};

onMounted(() => {
    if (props.container) {
        containerElement.value = document.querySelector(props.container);
        if (containerElement.value) {
            containerElement.value.addEventListener('scroll', handleScroll);
            handleScroll();
        }
    }
});

onUnmounted(() => {
    if (containerElement.value) {
        containerElement.value.removeEventListener('scroll', handleScroll);
    }
});
</script>

<style scoped>
.anchor {
    position: sticky;
    top: var(--offset);
    align-self: flex-start;
}
</style>