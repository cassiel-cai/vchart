/*渲染进程文件*/
import { createApp } from 'vue' // 导入 createApp
import { createRouter, createMemoryHistory } from 'vue-router' // 导入 createRouter 和 createMemoryHistory
import { createPinia } from 'pinia' // 导入 createPinia
import App from './App.vue' // 导入 App.vue
import Home from './views/Home.vue' // 导入 Home.vue
import Conversation from './views/Conversation.vue' // 导入 Conversation.vue
import Settings from './views/Settings.vue' // 导入 Settings.vue
import './index.css' // 导入 index.css

const routers = [
  { path: '/', component: Home },
  { path: '/conversation/:id', component: Conversation },
  { path: '/settings', component: Settings },
]

const router = createRouter({
  history: createMemoryHistory(), // 使用 Memory 模式
  routes: routers, // 使用 routers
}) // 创建 router

const pinia = createPinia() // 创建 pinia
createApp(App).use(router).use(pinia).mount('#app') // 挂载 App.vue 到 #app 并使用 router 和 pinia
