<template>
  <div class="h-[10%] bg-gray-200 border-b border-gray-300 flex items-center px-3 justify-between">
    <h3 class="font-semibold to-gray-900">{{ conversation?.title }}</h3>
    <span class="text-sm text-gray-500">{{ conversation?.updatedAt }}</span>
  </div>
  <div class="w-[80%] mx-auto h-[75%] overflow-y-auto pt-2">
    <MessageList :messages="filteredMessages" />
  </div>
  <div class="w-[80%] mx-auto h-[15%] flex items-center">
    <MessageInput />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { messages, conversations } from '../testData'
import { MessageProps, ConversationProps } from '../types'
import MessageInput from '../components/Messagelnput.vue'
import MessageList from '../components/MessageList.vue'

let route = useRoute()
let filteredMessages = ref<MessageProps[]>([])
let conversation = ref<ConversationProps>()
let conversationId = parseInt(route.params.id as string)
filteredMessages.value = messages.filter(message => message.conversationId === conversationId)
conversation.value = conversations.find(conversation => conversation.id === conversationId)

watch(
  () => route.params.id,
  (newId: string) => {
    conversationId = parseInt(newId)
    filteredMessages.value = messages.filter(message => message.conversationId === conversationId)
    conversation.value = conversations.find(conversation => conversation.id === conversationId)
  }
)
</script>

<style scoped></style>
