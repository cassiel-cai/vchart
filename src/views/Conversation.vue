<template>
  <div class="h-[10%] bg-gray-200 border-b border-gray-300 flex items-center px-3 justify-between">
    <h3 class="font-semibold to-gray-900">{{ conversation?.title }}</h3>
    <span class="text-sm text-gray-500">{{ dayjs(conversation?.updatedAt).format('YYYY-MM-DD') }}</span>
  </div>
  <div class="w-[80%] mx-auto h-[75%] overflow-y-auto pt-2">
    <MessageList :messages="filteredMessages" />
  </div>
  <div class="w-[80%] mx-auto h-[15%] flex items-center">
    <MessageInput />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { db } from '../db'
import { messages, conversations } from '../testData'
import { MessageProps, ConversationProps } from '../types'
import MessageInput from '../components/Messagelnput.vue'
import MessageList from '../components/MessageList.vue'
import dayjs from 'dayjs'

let route = useRoute()
let filteredMessages = ref<MessageProps[]>([])
let conversation = ref<ConversationProps>()
let conversationId = parseInt(route.params.id as string)
let initMessageId = parseInt(route.query.init as string)

const creatingInitialMessage = async () => {
  const currentDate: Omit<MessageProps, 'id'> = {
    content: '',
    conversationId,
    type: 'answer',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'loading',
  }

  const newMessageId = await db.messages.add(currentDate)
  filteredMessages.value.push({
    id: newMessageId,
    ...currentDate,
  })
}

watch(
  () => route.params.id,
  async (newId: string) => {
    conversationId = parseInt(newId)
    conversation.value = await db.conversations.where({ id: conversationId }).first()
    filteredMessages.value = await db.messages.where({ conversationId }).toArray()
  }
)

onMounted(async () => {
  conversation.value = await db.conversations.where({ id: conversationId }).first()
  filteredMessages.value = await db.messages.where({ conversationId }).toArray()

  if (initMessageId) {
    creatingInitialMessage()
  }
})
</script>

<style scoped></style>
