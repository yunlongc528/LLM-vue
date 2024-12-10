<template>
    <div class="anchor-link-wrapper">
        <a :href="href" :class="['anchor-link', { 'anchor-link-active': isActive }]" @click.prevent="scrollToTarget">
            {{ title }}
        </a>
        <div v-if="$slots['sub-link']" class="pl-4">
            <slot name="sub-link"></slot>
        </div>
    </div>
</template>

<script setup>
import { computed, inject } from 'vue';

const props = defineProps({
    href: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
});

const activeLink = inject('activeLink');
const setActiveLink = inject('setActiveLink');
const containerElement = inject('containerElement');

const isActive = computed(() => activeLink.value === props.href);

const scrollToTarget = () => {
    if (!containerElement.value) return;

    const target = containerElement.value.querySelector(props.href);
    if (target) {
        const offset = parseInt(getComputedStyle(document.querySelector('.anchor')).getPropertyValue('--offset'));
        const containerRect = containerElement.value.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const scrollTop = containerElement.value.scrollTop + targetRect.top - containerRect.top - offset;

        containerElement.value.scrollTo({
            top: scrollTop,
            behavior: 'smooth'
        });
        setActiveLink(props.href);
    }
};
</script>

<style scoped>
.anchor-link-wrapper {
    margin-bottom: 8px;
}

.anchor-link {
    display: block;
    padding: 4px 0;
    color: #606266;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s;
}

.anchor-link:hover {
    color: #409EFF;
}

.anchor-link-active {
    color: #409EFF;
    font-weight: 600;
}
</style>