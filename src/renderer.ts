/*渲染进程文件*/
import { createApp } from 'vue' // 导入 createApp
import { createRouter, createMemoryHistory } from 'vue-router' // 导入 createRouter 和 createMemoryHistory
import App from './App.vue' // 导入 App.vue
import Home from './views/Home.vue' // 导入 Home.vue
import Conversation from './views/Conversation.vue' // 导入 Conversation.vue
import Settings from './views/Settings.vue' // 导入 Settings.vue
import './index.css' // 导入 index.css

const routers = [
  { path: '/', component: Home },
  { path: '/conversation', component: Conversation },
  { path: '/settings', component: Settings },
]

// 创建 router
const router = createRouter({
  history: createMemoryHistory(), // 使用 Memory 模式
  routes: routers, // 使用 routers
})

createApp(App).use(router).mount('#app') // 挂载 App.vue 到 #app 并使用 router
