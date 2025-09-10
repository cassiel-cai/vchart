<template>
  <div class="flex items-center justify-between h-screen">
    <div class="w-[300px] bg-gray-200 h-full border-r border-gray-300">
      <ConversationList :conversations="conversations" />
    </div>
    <div class="h-full flex-1">
      content
    </div>
  </div>
</template>

<script setup lang="ts">
import { ConversationProps } from './types'
import ConversationList from './components/ConversationList.vue'

const conversations: ConversationProps[] = [
  {
    id: 1,
    title: '什么是光合作用 1',
    selectedModel: 'GPT-4o',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    providerId: 1,
  },
  {
    id: 2,
    title: '什么是光合作用 2',
    selectedModel: 'GPT-4o',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    providerId: 1,
  },
  {
    id: 3,
    title: '什么是光合作用 3',
    selectedModel: 'GPT-4o',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    providerId: 1,
  },
  {
    id: 4,
    title: '什么是光合作用 4',
    selectedModel: 'GPT-4o',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    providerId: 1,
  },
]
</script>

<style scoped></style>
