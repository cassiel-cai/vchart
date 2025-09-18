<template>
  <div class="h-[10%] bg-gray-200 border-b border-gray-300 flex items-center px-3 justify-between">
    <h3 class="font-semibold to-gray-900">{{ conversation?.title }}</h3>
    <span class="text-sm text-gray-500">{{ dayjs(conversation?.updatedAt).format('YYYY-MM-DD') }}</span>
  </div>
  <div class="w-[80%] mx-auto h-[75%] overflow-y-auto pt-2">
    <MessageList ref="messageListRef" :messages="filteredMessages" />
  </div>
  <div class="w-[80%] mx-auto h-[15%] flex items-center">
    <MessageInput v-model="inputValue" :disabled="messageStore.isMessageLoading" @create="sendNewMessage" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useConversationStore } from '../stores/conversation'
import { useMessageStore } from '../stores/message'
import { useProviderStore } from '../stores/provider'
import { MessageProps, UpdatgedStreamData, MessageListInstance, MessageStatus } from '../types'
import MessageInput from '../components/Messagelnput.vue'
import MessageList from '../components/MessageList.vue'
import dayjs from '../utils/dayjs'

let route = useRoute()
let conversationStore = useConversationStore()
let messageStore = useMessageStore()
let providerStore = useProviderStore()
let messageListRef = ref<MessageListInstance>()
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
        ...(message.imagePath && { imagePath: message.imagePath }),
      }
    })
)

const sendNewMessage = async (question: string, imagePath?: string | null) => {
  if (question) {
    let date = new Date().toISOString()
    let copiedImagePath: string | null = null

    if (imagePath) {
      try {
        copiedImagePath = await window.electronAPI.copyImageToUserDir(imagePath)
      } catch (error) {
        console.error(`Failed to copy image to user dir: ${error}`)
      }
    }

    await messageStore.createMessage({
      content: question,
      conversationId: conversationId.value,
      createdAt: date,
      updatedAt: date,
      type: 'question',
      ...(copiedImagePath && { imagePath: copiedImagePath }),
    })

    inputValue.value = ''
    creatingInitialMessage()
  }
}

const messageListScrollToBottom = async () => {
  await nextTick()

  if (messageListRef.value) {
    messageListRef.value.refl.scrollIntoView({ block: 'end', behavior: 'smooth' })
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

  await messageListScrollToBottom()

  if (conversation.value) {
    const provider = providerStore.getProviderById(conversation.value.providerId)

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
    await messageListScrollToBottom()
  }
)

onMounted(async () => {
  await messageStore.fetchMessagesByCoverseation(conversationId.value)

  await messageListScrollToBottom()

  if (initMessageId) {
    await creatingInitialMessage()
  }

  let currentMessageListHeight = 0
  let streamContent = ''

  const checkAndScrollToBottom = async () => {
    if (messageListRef.value) {
      const newHeight = messageListRef.value.refl.clientHeight
      if (newHeight > currentMessageListHeight) {
        currentMessageListHeight = newHeight
        await messageListScrollToBottom()
      }
    }
  }

  window.electronAPI.onUpdateMessage(async (streamData: UpdatgedStreamData) => {
    const { messageId, data } = streamData
    streamContent += data.result
    const updatedDate = {
      content: streamContent,
      status: data.is_end ? ('finished' as MessageStatus) : ('streaming' as MessageStatus),
      updatedAt: new Date().toISOString(),
    }

    await messageStore.updateMessage(messageId, updatedDate)
    await nextTick()
    await checkAndScrollToBottom()

    if (data.is_end) {
      streamContent = ''
    }
  })
})
</script>

<style scoped></style>
