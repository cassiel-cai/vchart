/*渲染进程文件*/
import { createApp } from 'vue' // 导入 createApp
import { createRouter, createMemoryHistory } from 'vue-router' // 导入 createRouter 和 createMemoryHistory
import { createPinia } from 'pinia' // 导入 createPinia
import { useConversationStore } from './stores/conversation' // 导入 useConversationStore
import App from './App.vue' // 导入 App.vue
import Home from './views/Home.vue' // 导入 Home.vue
import Conversation from './views/Conversation.vue' // 导入 Conversation.vue
import Settings from './views/Settings.vue' // 导入 Settings.vue
import './index.css' // 导入 index.css
import 'highlight.js/styles/github-dark.css' // 导入 highlight.js 的 github-dark 样式

const routers = [
  { path: '/', component: Home },
  { path: '/conversation/:id', component: Conversation },
  { path: '/settings', component: Settings },
]

const router = createRouter({
  history: createMemoryHistory(), // 使用 Memory 模式
  routes: routers, // 使用 routers
}) // 创建 router

router.beforeEach(to => {
  let conversationStore = useConversationStore() // 获取 conversationStore
  if (!to.path.startsWith('/conversation/')) {
    conversationStore.selectedId = -1
    conversationStore.selectedModel = ''
  } // 如果路由不是 /conversation/ 开头，则设置 selectedId 为 -1
}) // 在路由跳转前设置 selectedId

const pinia = createPinia() // 创建 pinia
createApp(App).use(router).use(pinia).mount('#app') // 挂载 App.vue 到 #app 并使用 router 和 pinia
