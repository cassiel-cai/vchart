<template>
  <div class="flex items-center justify-between h-screen">
    <div class="w-[300px] bg-gray-200 h-full border-r border-gray-300">
      <div class="h-[90%] overflow-y-auto">
        <ConversationList :conversations="conversations" />
      </div>
      <div class="h-[10%] grid grid-cols-2 gap-2 p-2">
        <router-link to="/">
          <VkButton color="green" iconName="radix-icons:chat-bubble">新建聊天</VkButton>
        </router-link>
        <router-link to="/settings">
          <VkButton color="green" plain iconName="radix-icons:gear">应用设置</VkButton>
        </router-link>
      </div>
    </div>
    <div class="h-full flex-1">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { conversations } from './testData'
import ConversationList from './components/ConversationList.vue'
import VkButton from './components/Button.vue'

let loading = ref(false)
</script>

<style scoped></style>
