## Al助手 Cursor 辅助 Vue3.5+Electron+大模型 跨平台实战

> 最新前端技术栈：Vue3.5 、 Electron、TS、 Vite、Pinia、Radix Vue、IndexedDB、 Dexie.js ，与多种知名AI大模型（文心一言/通义千问/Claude／Deepseek），手把手带你开发一个跨平台的 AI 桌面聊天应用，同时教你用 Cursor 辅助开发倍速提升开发效率。

## 📝 项目代码提交规范

    feat：    新功能
    fix：     修复问题
    docs：    文档变更
    style：   代码样式调整（不影响功能）
    refactor：代码重构
    test：    测试相关
    chore：   构建工具或辅助脚本变更

### 🎯 项目操作指南

```bash
# 1.使用 Electron Forge 安装初始化模版
npx create-electron-app@latest my-new-app --template=vite-typescript

# 2. 添加 Vue 依赖项
npm install vue
npm install --save-dev @vitejs/plugin-vue

# 3. 添加 tailwindcss 样式依赖
# 在 src/index.css 文件中引入
#   @tailwind base;
#   @tailwind components;
#   @tailwind utilities;
npm install -D tailwindcss@3.4.17 postcss@8.4.35 autoprefixer@10.4.17
npx tailwindcss init -p

# 4. 使用 Iconify 作为图标
npm install --save-dev @iconify/vue

# 5. 使用 Radix Vue 作为组件库
npm add radix-vue

# 6. 安装 vue-router
# Hash 模式
#   描述：在 URL 中使用带有＃的 hash，路由信息被保存在 URL 的 hash 部分。
#   优点：部署简单，不需要服务器特殊配置。
#   缺点：URL 中带有 ＃，看起来不太美观；可能会影响 SEO。
# HTML5 History 模式
#   描述：使用 HTML5 History API，不带＃的 URL，假如部署在服务器上的时候，那么就需要后端服务器支持。
#   优点：URL 更美观，更符合传统网站的 URL 结构。
#   缺点：需要服务器端配置，避免 404 错误。
# Memory 模式
#   描述：路由不会同步到 URL，仅在内存中管理路由状态，通常用于 SSR。
#   优点：不会影响 URL，适用于不需要改变地址栏 URL 的场景。
#   缺点：不能直接在地址栏中访问路由。
npm install vue-router@4

# 7. 使用文心一言调用 SDK 模型库：https://console.bce.baidu.com/qianfan/overview
# 7-1. 安装 Node.js SDK
npm install @baiducloud/qianfan
# 7-2. 完成鉴权：https://console.bce.baidu.com/iam/#/iam/accesslist 查看ACCESS_KEY和SECRET_KEY
# 7-3. 初始化
# (1)通过配置文件，在.env文件中，设置一下内容：
#   QIANFAN_ACCESS_KEY=your_access_key
#   QIANFAN_SECRET_KEY=your_secret_key
# (2)通过环境变量：
#   import {setEnvVariable} from "@baiducloud/qianfan";
#   setEnvVariable ( 'QIANFAN_ACCESS_KEY', 'your_access_key');
#   setEnvVariable( 'QIANFAN_SECRET_KEY', 'your_secret_key');
# (3)通过参数：
#   import {ChatCompletion} from "@baiducloud/qianfan";
#   const client = new ChatCompletion ({ QIANFAN_ACCESS_KFY: '',QIANFAN_SECRET_KEY: ''})
# 7-4. 使用SDK
# import { ChatCompletion } from '@baiducloud/qianfan'
# const client = new ChatCompletion()
# const resp = await client.chat({
#   messages: [
#     {
#       role: 'user',
#       content: '你好，我是小度'
#     }
#   ]
# }, 'ERNIE-Speed-128K')

# 8. 实现流式输出 -> stream: true
# const stream = await client.chat({
#   messages: [
#     {
#       role: 'user',
#       content: '什么是光合作用？',
#     },
#   ],
#   stream: true,
#  }, 'ERNIE-Speed-128K')
# https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Asynclterator
# for await (const chunk of stream as AsyncIterable<any>) {
#   console.log(chunk, 'chunk===>')
# }

# 9. 三种不同的 Role
# System 用于提供设置信息或上下文，以指导模型的行为。这可能包括对话应该如何进行的说明或指导方针。
# User 该角色代表对话中的人类用户。用户的输入引导对话并促使助手做出回应。
# Assistant 这是模型本身的角色，根据系统设定的上下文回应用户的输入。

# 10. 多轮对话采取（奇数）方式
# messages: [{
#   role: 'user',
#   content: '你好',
# },{
#   role: 'assistant',
#   content: '如果您有任何问题，请随时向我提问。',
# },{
#   role: 'user',
#   content: '我在上海，周末可以去哪里玩？',
# }],

# 11. 使用阿里通义千问：https://bailian.console.aliyun.com
# 11-1. 安装 OpenAI Node.js SDK
npm install openai
# 11-2. API Key: https://bailian.console.aliyun.com/?tab=globalset#/efm/api_key
# 11-3. 初始化 OpenAI 类
npm install dotenv --save
# import 'dotenv/config'
# import OpenAI from 'openai'
# const client = new OpenAI({
#   apiKey: process.env['ALI_API_KEY'],
#   baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
# })
# const resp = await client.chat.completions.create({
#   messages: [{ role: 'user', content: '你好' }],
#   model: 'qwen-turbo',
# })
# 11-4. 流式输出同 -> 8
# 11-5. 多轮对话同 -> 10 不过使用 openai 它的 role 可以使用 System 用于提供设置信息或上下文，以指导模型的行为。

# 12. 使用 qwen-vl-plus 完成读图功能
# import fs from 'fs/promises'
# const imageBuffer = await fs.readFile('/Users/orgin/Pictures/xxx/xxx.png')
# const base64Image = imageBuffer.toString('base64')
# const resp = await client.chat.completions.create({
#   messages: [{
#     role: 'user',
#     content: [{
#       type: 'text',
#       text: '它是一张什么风格的图片'
#     },{
#       type: 'image_url',
#       image_url: {
#         url: `data:image/png;base64,${base64Image}`, // 注意 data:image/imageBuffer中引入的图片格式
#       },
#     }]
#   }],
#   model: 'qwen-vl-plus',
# })

# 13. 使用 qwen-long 完后文件上传及文本处理
# import fs from 'fs'
# const fileObj = await client.files.create({
#   file: fs.createReadStream('/Users/orgin/Downloads/xxx/xxx.xlsx'),
#   purpose: 'file-extract' as any,
# })
# const resp = await client.chat.completions.create({
#   messages: [{
#     role: 'system',
#     content: '你是一个乐于助人的助手。',
#   },{
#     role: 'system',
#     content: `fileid://${fileObj.id}`,
#   },{
#     role: 'user',
#     content: '请总结出文件中的内容',
#   }],
#   model: 'qwen-long',
# })

# 14. 选择 IndexedDB 作为存储方案
# 性能：适合存储大量结构化数据，具有良好的性能表现。
# 标准化：作为浏览器标准，与 Electron 集成较为简单。
# 功能：支持索引、事务等功能，可满足复杂需求。
# 异步操作：适合 Electron 中的异步编程模型。
# 14-1. 使用 Dexie.js 封装 IndexedDB https://dexie.org/docs/Tutorial/Vue
npm install dexie
# 简化 IndexedDB 的 API
# 提供更好的异步支持
# 简化数据模型
# 性能优化
# 14-2. Dexie.js 基本用法
# （1）创建 src/db.ts 文件
# （2）引入 import { db } from './db'
# (3) await db.providers.add()添加；
#     await db.providers.toArray()查询;
#     await db.providers.update()修改；
#     await db.providers.delete()删除；

# 15. 解决 Date 的格式问题 https://day.js.org/docs/en/installation/installation
npm install dayjs --save

# 16. 选择 Pinia 作为状态存储 https://pinia.vuejs.org/zh/getting-started.html
npm install pinia
# 16-1. 功能对比
# ref() => state
# computed() => getters
# function() => actions

# 17. 渲染 Markdown 文本，推荐 markdown-it 库 https://github.com/markdown-it/markdown-it
# 遵循 CommonMark 规范，同时添加语法扩展和增强功能（自动链接URL，排版美化）
# 易于扩展：由于模块化的设计，用户可以方便地编写自定义插件或者使用社区提供的插件来扩展 markdown-it 的功能。
# 快速且高效：markdown-it 被设计为快速和高效的解析器，能够处理大量的 Markdown 文本并将其转换为 HTML。
# 插件列表 https://www.npmjs.com/search?q=keywords:markdown-it-plugin
npm install vue-markdown-render --save
# import VueMarkdown from 'vue-markdown-render'
# <VueMarkdown :source="message.content" />
```
