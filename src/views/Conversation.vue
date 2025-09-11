<template>
  <div class="w-[80%] mx-auto h-[85%] overflow-y-auto pt-2">
    <MessageList :messages="messages" />
  </div>
  <div class="w-[80%] mx-auto h-[15%] flex items-center">
    <MessageInput />
  </div>
</template>

<script setup lang="ts">
import { MessageProps } from '../types'
import MessageInput from '../components/Messagelnput.vue'
import MessageList from '../components/MessageList.vue'

const messages: MessageProps[] = [
  {
    id: 1,
    content: '什么是光合作用',
    type: 'question',
    conversationId: 1,
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
  },
  {
    id: 2,
    content: '光合作用是植物通过吸收光能将二氧化碳和水转化为葡萄糖的过程',
    type: 'answer',
    conversationId: 1,
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
  },
  {
    id: 3,
    content: '光合作用应用场景有哪些',
    type: 'question',
    conversationId: 1,
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
  },
  {
    id: 4,
    content: '光合作用应用场景有农业、工业、医疗等',
    type: 'answer',
    conversationId: 1,
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
  },
  {
    id: 5,
    content: '具体说说农业的需求',
    type: 'question',
    conversationId: 1,
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
  },
  {
    id: 6,
    content: '',
    type: 'answer',
    status: 'loading',
    conversationId: 1,
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
  },
]
</script>

<style scoped></style>
