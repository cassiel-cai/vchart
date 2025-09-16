<template>
  <div class="h-[10%] bg-gray-200 border-b border-gray-300 flex items-center px-3 justify-between">
    <h3 class="font-semibold to-gray-900">{{ conversation?.title }}</h3>
    <span class="text-sm text-gray-500">{{ dayjs(conversation?.updatedAt).format('YYYY-MM-DD') }}</span>
  </div>
  <div class="w-[80%] mx-auto h-[75%] overflow-y-auto pt-2">
    <MessageList :messages="filteredMessages" />
  </div>
  <div class="w-[80%] mx-auto h-[15%] flex items-center">
    <MessageInput v-model="inputValue" @create="sendNewMessage" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useConversationStore } from '../stores/conversation'
import { useMessageStore } from '../stores/message'
import { db } from '../db'
import { MessageProps, UpdatgedStreamData } from '../types'
import MessageInput from '../components/Messagelnput.vue'
import MessageList from '../components/MessageList.vue'
import dayjs from 'dayjs'

let route = useRoute()
let conversationStore = useConversationStore()
let messageStore = useMessageStore()
let conversationId = ref(parseInt(route.params.id as string))
let initMessageId = parseInt(route.query.init as string)
let inputValue = ref<string>('')

const conversation = computed(() => conversationStore.getConversationById(conversationId.value))
const filteredMessages = computed(() => messageStore.items)
const sendedMessages = computed(() =>
  filteredMessages.value
    .filter(message => message.status !== 'loading')
    .map(message => {
      return {
        role: message.type === 'question' ? 'user' : 'assistant',
        content: message.content,
      }
    })
)

const sendNewMessage = async (question: string) => {
  if (question) {
    const date = new Date().toISOString()

    await messageStore.createMessage({
      content: question,
      conversationId: conversationId.value,
      createdAt: date,
      updatedAt: date,
      type: 'question',
    })

    inputValue.value = ''
    creatingInitialMessage()
  }
}

const creatingInitialMessage = async () => {
  const currentDate: Omit<MessageProps, 'id'> = {
    content: '',
    conversationId: conversationId.value,
    type: 'answer',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'loading',
  }

  const newMessageId = await messageStore.createMessage(currentDate)

  if (conversation.value) {
    const provider = await db.providers.where({ id: conversation.value.providerId }).first()
    if (provider) {
      await window.electronAPI.startChat({
        messageId: newMessageId,
        providerName: provider.name,
        selectedModel: conversation.value.selectedModel,
        messages: sendedMessages.value,
      })
    }
  }
}

watch(
  () => route.params.id,
  async (newId: string) => {
    conversationId.value = parseInt(newId)
    await messageStore.fetchMessagesByCoverseation(conversationId.value)
  }
)

onMounted(async () => {
  await messageStore.fetchMessagesByCoverseation(conversationId.value)

  if (initMessageId) {
    await creatingInitialMessage()
  }

  window.electronAPI.onUpdateMessage(async (streamData: UpdatgedStreamData) => {
    await messageStore.updateMessage(streamData)
  })
})
</script>

<style scoped></style>
