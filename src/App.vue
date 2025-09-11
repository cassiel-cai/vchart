<template>
  <div class="flex items-center justify-between h-screen">
    <div class="w-[300px] bg-gray-200 h-full border-r border-gray-300">
      <div class="h-[90%] overflow-y-auto">
        <ConversationList :conversations="conversations" />
      </div>
      <div class="h-[10%] grid grid-cols-2 gap-2 p-2">
        <router-link to="/">
          <button class="shadow-sm inline-flex items-center justify-center bg-green-700 text-white hover:bg-green-700/90 border border-green-700 h-[32px] py-[8px] px-[15px] text-sm rounded-[4px]">
            <Icon icon="radix-icons:chat-bubble" class="mr-2" />
            新建聊天
          </button>
        </router-link>
        <router-link to="/settings">
          <button
            class="shadow-sm inline-flex items-center justify-center bg-green-50 text-green-700 hover:bg-green-700 border border-green-700 hover:text-white h-[32px] py-[8px] px-[15px] text-sm rounded-[4px]"
          >
            <Icon icon="radix-icons:gear" class="mr-2" />
            应用设置
          </button>
        </router-link>
      </div>
    </div>
    <div class="h-full flex-1">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
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
  {
    id: 5,
    title: '什么是光合作用 1',
    selectedModel: 'GPT-4o',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    providerId: 1,
  },
  {
    id: 6,
    title: '什么是光合作用 2',
    selectedModel: 'GPT-4o',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    providerId: 1,
  },
  {
    id: 7,
    title: '什么是光合作用 3',
    selectedModel: 'GPT-4o',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    providerId: 1,
  },
  {
    id: 8,
    title: '什么是光合作用 4',
    selectedModel: 'GPT-4o',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    providerId: 1,
  },
  {
    id: 9,
    title: '什么是光合作用 5',
    selectedModel: 'GPT-4o',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    providerId: 1,
  },
  {
    id: 10,
    title: '什么是光合作用 6',
    selectedModel: 'GPT-4o',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    providerId: 1,
  },
  {
    id: 11,
    title: '什么是光合作用 7',
    selectedModel: 'GPT-4o',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    providerId: 1,
  },
  {
    id: 12,
    title: '什么是光合作用 8',
    selectedModel: 'GPT-4o',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    providerId: 1,
  },
  {
    id: 13,
    title: '什么是光合作用 9',
    selectedModel: 'GPT-4o',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    providerId: 1,
  },
  {
    id: 14,
    title: '什么是光合作用 10',
    selectedModel: 'GPT-4o',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
    providerId: 1,
  },
]
</script>

<style scoped></style>
