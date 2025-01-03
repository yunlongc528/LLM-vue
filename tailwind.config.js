/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms'
import aspectRatio from '@tailwindcss/aspect-ratio'
export default {
    mode: 'jit', // 启用 JIT 模式
    content: ['./src/**/*.{html,js,ts,vue}'],
    theme: {},
    // plugins: [forms, aspectRatio],
}
