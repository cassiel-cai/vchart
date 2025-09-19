<template>
  <div class="flex items-center justify-between h-screen">
    <div class="w-[300px] bg-gray-200 h-full border-r border-gray-300">
      <div class="h-[90%] overflow-y-auto bg-white">
        <ConversationList :conversations="items" />
      </div>
      <div class="h-[10%] flex justify-center items-center space-x-4 border-t-2 border-gray-300 bg-white">
        <router-link to="/">
          <VkButton color="green" iconName="radix-icons:chat-bubble">{{ t('app.newChat') }}</VkButton>
        </router-link>
        <router-link to="/settings">
          <VkButton color="green" plain iconName="radix-icons:gear">{{ t('app.settings') }}</VkButton>
        </router-link>
      </div>
    </div>
    <div class="h-full flex-1">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { initProviders } from './db'
import { useConversationStore } from './stores/conversation'
import ConversationList from './components/ConversationList.vue'
import VkButton from './components/Button.vue'

let { t } = useI18n()
let conversationStore = useConversationStore()
const router = useRouter()

const items = computed(() => conversationStore.items)

onMounted(async () => {
  await initProviders()

  conversationStore.fetchConversations()

  // 菜单：新建对话
  window.electronAPI.onMenuNewConversation(async () => {
    router.push(`/`)
  })

  // 菜单：打开设置
  window.electronAPI.onMenuOpenSettings(() => {
    router.push('/settings')
  })
})
</script>

<style scoped></style>
