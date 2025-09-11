## Al助手 Cursor 辅助 Vue3.5+Electron+大模型 跨平台实战

> 最新前端技术栈：Vue3.5 、 Electron、TS、 Vite、Pinia、Radix Vue、IndexedDB、 Dexie.js ，与多种知名AI大模型（文心一言/通义千问/Claude／Deepseek），手把手带你开发一个跨平台的 AI 桌面聊天应用，同时教你用 Cursor 辅助开发倍速提升开发效率。

## 项目代码提交规范

    feat：    新功能
    fix：     修复问题
    docs：    文档变更
    style：   代码样式调整（不影响功能）
    refactor：代码重构
    test：    测试相关
    chore：   构建工具或辅助脚本变更

### 1、初始化

```bash
# 1.使用 Electron Forge 安装初始化模版
npx create-electron-app@latest my-new-app --template=vite-typescript

# 2. 添加 Vue 依赖项
npm install vue
npm install --save-dev @vitejs/plugin-vue

# 3. 添加 tailwindcss 样式依赖，安装后：在 src/index.css 文件中引入
#  @tailwind base;
#  @tailwind components;
#  @tailwind utilities;
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
```
