<template>
  <div class="flex items-center justify-between h-screen">
    <div class="w-[300px] bg-gray-200 h-full border-r border-gray-300">
      <div class="h-[90%] overflow-y-auto">
        <ConversationList :conversations="conversations" />
      </div>
      <div class="h-[10%] grid grid-cols-2 gap-2 p-2">
        <button class="shadow-sm inline-flex items-center justify-center bg-green-700 text-white hover:bg-green-700/90 border border-green-700 h-[32px] py-[8px] px-[15px] text-sm rounded-[4px]">
          <Icon icon="radix-icons:chat-bubble" class="mr-2" />
          新建聊天
        </button>
        <button
          class="shadow-sm inline-flex items-center justify-center bg-green-50 text-green-700 hover:bg-green-700 border border-green-700 hover:text-white h-[32px] py-[8px] px-[15px] text-sm rounded-[4px]"
        >
          <Icon icon="radix-icons:gear" class="mr-2" />
          应用设置
        </button>
      </div>
    </div>
    <div class="h-full flex-1 flex items-center">
      <div class="w-[80%] mx-auto h-full">
        <div class="flex items-center h-[85%]">
          <ProviderSelect :providers="providers" v-model="selectedModel" />
        </div>
        <div class="flex items-center h-[15%]">
          <MessageInput v-model="message" @create="onCreate" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { ConversationProps, ProviderProps } from './types'
import ConversationList from './components/ConversationList.vue'
import ProviderSelect from './components/ProviderSelect.vue'
import MessageInput from './components/Messagelnput.vue'

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

const providers: ProviderProps[] = [
  {
    id: 1,
    name: '文心一言',
    desc: '文心一言是百度推出的智能助手，拥有强大的语言理解和生成能力。',
    models: ['ERNIE-4.0-8K', 'ERNIE-3.5-8K', 'ERNIE-Speed-8K'],
    avatar:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthvnext.bing.com%2Fth%2Fid%2FOIP.WZEsF8Yzchv1bEJgr7AiZAHaHa%3Fcb%3Ducfimgc2%26pid%3DApi&f=1&ipt=faedd4207db5610e08ce727948a7610ac03740bc72bb0cd029a3baf9fa5304a4&ipo=images',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: 2,
    name: '通义千问',
    desc: '通义千问是阿里巴巴推出的智能助手，拥有强大的语言理解和生成能力。',
    models: ['Qwen-2.5-32B', 'Qwen-2.5-72B', 'Qwen-2.5-14B'],
    avatar:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.KgYRABrOrO5Fi-DIkSGFhgHaHa%3Fpid%3DApi&f=1&ipt=9e4e41655f5e05c65c17d0548f367af30df492f76ed8a66227cb99fdb49428b5&ipo=images',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
]

const selectedModel = ref<string>('')
const message = ref<string>('')

const onCreate = (value: string) => {
  console.log(value, 'value')
}
</script>

<style scoped></style>
