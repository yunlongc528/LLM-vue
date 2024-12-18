// src/i18n/index.js
import { createI18n } from 'vue-i18n'

// 导入语言文件

// 创建 i18n 实例
const i18n = createI18n({
    locale: 'en', // 默认语言
    fallbackLocale: 'en', // 回退语言
    messages: {
 
    },
})

export default i18n
