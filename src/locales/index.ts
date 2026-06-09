// src/locales/index.ts
import { createI18n } from 'vue-i18n'

// 同目录下的 JSON 文件，用 ./ 开头
const localeModules = import.meta.glob('./*.json', { eager: false })

// 构建映射
const localeMap: Record<string, string> = {}
for (const path in localeModules) {
  const match = path.match(/\.\/(.+)\.json$/)
  if (match) {
    localeMap[match[1]] = path
  }
}

console.log('Available locales:', Object.keys(localeMap))

const i18n = createI18n({
  legacy: false,
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages: {},
})

export async function loadLocale(locale: string) {
  if (i18n.global.availableLocales.includes(locale)) return
  
  const path = localeMap[locale]
  if (!path) {
    console.error(`Locale "${locale}" not found. Available:`, Object.keys(localeMap))
    return
  }
  
  const module = await localeModules[path]()
  i18n.global.setLocaleMessage(locale, module.default)
}

export async function switchLocale(locale: string) {
  await loadLocale(locale)
  i18n.global.locale.value = locale
  localStorage.setItem('locale', locale)
}

export async function getSupportedLocales() {
  return Object.keys(localeMap).map(code => ({
    code,
    // 这里需要异步获取 display，暂时先返回 code
    display: code,
  }))
}

export async function initI18n(preferred?: string) {
  const available = Object.keys(localeMap)
  if (available.length === 0) {
    console.error('No locale files found! Check the glob path.')
    return
  }
  
  // 优先使用传入的、本地存储的，否则用第一个
  const savedLocale = localStorage.getItem('locale')
  let defaultLocale = preferred || savedLocale || available[0]
  
  if (!available.includes(defaultLocale)) {
    defaultLocale = available[0]
  }
  
  await loadLocale(defaultLocale)
  i18n.global.locale.value = defaultLocale
}

// 导出 i18n 实例和所有函数
export default i18n