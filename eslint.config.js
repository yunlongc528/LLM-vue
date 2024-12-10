import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'

export default [
    { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs['flat/essential'],
    {
        files: ['**/*.vue'],
        languageOptions: { parserOptions: { parser: tseslint.parser } },
    },
    {
        ignores: [
            '**/node_modules/**',
            '**/dist/**',
            // 其他你想要忽略的路径
        ],
    },
    {
        rules: {
            'vue/multi-word-component-names': [
                'error',
                {
                    ignores: [Notification],
                },
            ],
        },
    },
]
