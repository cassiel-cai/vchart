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
#   const client = new ChatCompletion ({ QIANFAN_ACCESS_KFY: '',QIANFAN_SECRET_KEY: '', ENABLE_OAUTH: true})
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

# 18. 使用 Tailwind CSS Typography 插件 https://github.com/tailwindlabs/tailwindcss-typography
# 为什么要有这个插件：
#   Tailwvind CSS 默认对所有 HTML元素应用了一个非常激进的 reset 移除了几乎所有的默认样式。
#   这种 reset 使得所有元素都从一个“干净的 slate “开始，有利于构建自定义设计。
# 造成的问题：
#   当处理富文本内容（如 Markdown 渲染的 HTML）时，这种 reset 会导致内容失去基本的排版样式。
#   标题、段落、列表等元素会失去它们的默认外观，看起来都一样。
# Typography 插件的作用：
#   插件力这些被 reset 的元素重新引入了合理的默认样式。
#   它在保持 Tailwind 灵活性的同时，为富文本内容提供了美观的基础样式。
# Typography 的特点：
#   默认样式：它为标题、段落、列表、引用等常见 HTML 元素提供了合理的默认样式。
#   响应式设计：样式会根据屏幕大小自动调整，确保在各种设备上都能保持良好的可读性。
#   主题定制：可以轻松地根据你的设计需求自定义样式。
#   暗模式支持：提供了暗模式下的样式变体，使得内容在暗色主题下也能保持良好的可读性。
#   易于使用：只需要在包含富文本内容的容器上添加 prose 类，就可以应用这些样式。
npm install -D @tailwindcss/typography

# 19. 使用 Highlight.js 完成语法高亮 https://highlightjs.org/
# 支持多种编程语言：highlight.js 支持超过192 种编程语言和格式，包括常见的编程语言（如 JavaScript、Python、Java 等）和数据格式 （如JSON、XML等），使其适用于各种技术文章和博客。
# 轻量级且易于集成：highight.js 是一个轻量级的库，文件体积小易于集成到网页项目中。只需简单引入相应的 JavaScript 和 css 文件，即可开始在页面中使用语法高亮功能。
# 自动检测语言：highlight.js 可以自动检测代码块中的语言类型，无需手动指定，从而简化了使用过程，提高了开发效率。
# 丰富的样式主题：highlight.js 提供了多种 498 样式主题可供选择，用户可以根据需求轻松切换不同的代码高亮风格，使代码块更加美观和易读。
npm install markdown-it-highlightjs --save

# 20. 使用 scrollIntoView 函数让页面自动滚动到信息的最下方
# await nextTick()
# if (messageListRef.value) {
#   messageListRef.value.refl.scrollIntoView({ block: 'end', behavior: 'smooth' })
# }

# 21. 添加图片上传功能和预览显示
# src/preload.ts
# selectImage: () => ipcRenderer.invoke('select-image'),◊
# src/components/Messagelnput.vue
# const triggerFileInput = async () => {
#   if (props.disabled) return
#   const res = await window.electronAPI.selectImage()
#   if (res) {
#     selectedImagePath.value = res.path
#     imagePreview.value = res.dataURL || ''
#   } else {
#     selectedImagePath.value = null
#     imagePreview.value = null
#   }
# }
# src/main.ts
# ipcMain.handle('select-image', async () => {
#   const result = await dialog.showOpenDialog(mainWindow, {
#     properties: ['openFile'],
#     filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'] }],
#   })
#   if (result.canceled || result.filePaths.length === 0) return null
#   const filePath = result.filePaths[0]
#   const fileName = path.basename(filePath)
#   const format = path.extname(filePath).slice(1).toLowerCase()
#   const size = (await fs.stat(filePath)).size
#   const image = nativeImage.createFromPath(filePath)
#   const dataURL = image.isEmpty() ? '' : image.toDataURL()
#   return { path: filePath, name: fileName, format, size, dataURL }
# })
# interface.d.ts
# selectImage: () => Promise<{ path: string name: string format: string size: number dataURL: string } | null>

# 22. 可迭代对象 https://zh.javascript.info/iterable
# 可迭代（Iterable）对象是数组的泛化。这个概念是说任何对象都可以被定制为可在 for..of 循环中使用的对象。
# 数组是可迭代的。但不仅仅是数组。很多其他内建对象也都是可迭代的。例如字符串也是可迭代的。
# 文件 generator.js 测试
# const range = {
#   from: 1,
#   to: 5,
#   [Symbol.iterator]() {
#     let current = this.from
#     return {
#       next: () => {
#         if (current <= this.to) {
#           return { done: false, value: current++ }
#         } else {
#           return { done: true }
#         }
#       },
#     }
#   },
# }
# const run = () => {
#   for (const item of range) {
#     console.log('item', item)
#   }
# }
# run()

# 23. 生成器函数（Generator） https://zh.javascript.info/generators
# generator（生成器）特点简述
# - 可暂停和恢复：`yield` 语句让函数执行可中断、恢复。
# - 惰性求值：每次 `next()` 只生成一个值，节省内存。
# - 可双向通信：`next(value)` 可向生成器内部传值。
# - 原生可迭代：生成器对象可直接用于 `for...of`。
# - 适合异步流程控制：可配合 Promise 实现同步风格的异步代码。
# const range = {
#   from: 1,
#   to: 5,
#   *[Symbol.iterator]() {
#     for (let current = this.from; current <= this.to; current++) {
#       yield current
#     }
#   },
# }
# const run = () => {
#   for (const item of range) {
#     console.log('item', item)
#   }
# }
# run()

# 24. 学习异步可迭代对象 Async Iterable
# 异步可迭代对象（Async Iterable）特点简述
# - 支持异步数据流：可用于处理需要等待的异步数据（如网络、文件流）。
# - 通过 `for await...of` 遍历：可直接在异步循环中消费数据。
# - 实现 Symbol.asyncIterator 方法：返回一个带有 async next() 的对象或 async 生成器。
# - 按需拉取数据：每次迭代时可异步获取下一个值，适合大数据量或流式场景。
# - 便于与 Promise 结合：每次迭代可等待 Promise 结果，流程更自然。
# const asyncRange = {
#   from: 1,
#   to: 5,
#   async *[Symbol.asyncIterator]() {
#     for (let current = this.from; current <= this.to; current++) {
#       await new Promise((resolve) => setTimeout(resolve, 500))
#       yield current
#     }
#   },
# }
# const run = async() => {
#   for await (const item of asyncRange) {
#     console.log('item', item)
#   }
# }
# run()

# 25. 应用打包 Markers 简介 https://www.electronforge.io/config/makers
# 1．package 命令: npm run package
# 结果：生成可执行程序，但还不是安装包，直接双击就可以使用
# 2．make 命令: npm run make
# 结果：生成完整的安装包，需要安装完毕以后使用
# 25-1. 可执行程序 vs 安装包的系统关系：
# 可执行程序：
# - 只是一个文件夹，不与系统发生关系
# 安装包：
# - 添加到程序列表
# - 创建快捷方式
# - 注册文件关联
# - 添加卸载信息
# 25-2. 适用场景对比
# 可执行程序适合：
# - 测试版本
# - 便携版
# - 不需要安装的场景
# 安装包适合：
# - 正式发布
# - 面向普通用户
# - 需要系统集成的场景
# 25-3. 命名规则:［应用名］-［平台］-［架构］
# 25-4. app 文件结构
# Contents/
# - Frameworks 应用依赖的框
# - Info.plist 应用的配置信息
# - MacOS 可执行文件目录
# - Pkglnfo 应用类型和创建者代码
# - Resources 资源文件目录(最重要的)
# - CodeSignature 代码签名相关文件
# Resources/
# - app.asar 打包后的应用代码
# - electron.icns 应用图标
# - /proj/ 各种语言资源
# 25-5. windows 的基本文件结构
# - vchat.exe 主程序
# - resources/ 资源文件夹
# - app.asar 打包后的源代码
# - locales/ 语言文件
# - LICENSE 许可证文件

# 26. 探究生成的 asar 文件格式
# 26-1. 安装
npm install --engine-strict @electron/asar
# 26-2．解压 asar 文件
asar extract app.asar 目标文件夹
# 26-3.查看 asar內容（不解压）
asar list app-asar
# 26-4．解压单个文件
asar extract-file app.asar package.json
```
