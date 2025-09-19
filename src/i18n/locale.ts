import i18n from './index'

function setGlobalLocale(language: 'zh' | 'en') {
  const current = (i18n as any).global.locale
  if (typeof current === 'string') {
    ;(i18n as any).global.locale = language
  } else {
    ;((i18n as any).global.locale as { value: string }).value = language
  }
}

// 读取并应用持久化语言
export async function initAppLocale(): Promise<void> {
  try {
    const config = await window.electronAPI.getConfig()
    if (config?.language) {
      setGlobalLocale(config.language)
    }
  } catch {
    // 忽略读取失败，使用默认语言
  }
}

// 更新应用语言并持久化
export async function updateAppLocale(language: 'zh' | 'en'): Promise<void> {
  setGlobalLocale(language)
  try {
    await window.electronAPI.updateConfig({ language })
  } catch {
    // 忽略持久化失败
  }
}
