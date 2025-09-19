# Vue I18n 使用指南

## 基本用法

### 在模板中使用

```vue
<template>
  <div>
    <h1>{{ $t('app.title') }}</h1>
    <p>{{ $t('common.loading') }}</p>
  </div>
</template>
```

### 在脚本中使用

```vue
<script setup>
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

// 获取翻译文本
const title = t('app.title')

// 切换语言
locale.value = 'en'
</script>
```

### 带参数的翻译

```json
{
  "welcome": "欢迎 {name}，您有 {count} 条新消息"
}
```

```vue
<template>
  <p>{{ $t('welcome', { name: '张三', count: 5 }) }}</p>
</template>
```

## 语言包结构

```
src/i18n/
├── index.ts          # i18n 配置
├── locales/
│   ├── zh.json       # 中文语言包
│   └── en.json       # 英文语言包
└── README.md         # 使用说明
```

## 添加新语言

1. 在 `locales/` 目录下创建新的语言包文件
2. 在 `index.ts` 中导入并添加到 `messages` 对象
3. 更新 `AppConfig` 类型定义

## 最佳实践

1. **键名规范**：使用点分隔的层级结构，如 `settings.language.title`
2. **命名空间**：按功能模块组织翻译键
3. **一致性**：保持所有语言包的结构一致
4. **占位符**：使用 `{variable}` 格式定义可替换内容
5. **复数处理**：使用 Vue I18n 的复数规则处理不同数量的文本
