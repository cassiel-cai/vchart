<template>
  <div class="w-[80%] mx-auto h-full">
    <div class="flex items-center h-[85%]">
      <ProviderSelect :providers="providers" v-model="currentProvider" />
    </div>
    <div class="flex items-center h-[15%]">
      <MessageInput :disabled="currentProvider === ''" @create="createConversation" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProviderStore } from '../stores/provider'
import { useMessageStore } from '../stores/message'
import { useConversationStore } from '../stores/conversation'
import { ProviderProps } from '../types'
import ProviderSelect from '../components/ProviderSelect.vue'
import MessageInput from '../components/Messagelnput.vue'

let router = useRouter()
let providerStore = useProviderStore()
let conversationStore = useConversationStore()
let messageStore = useMessageStore()
let currentProvider = ref<string>('')
let providers = ref<ProviderProps[]>([])

onMounted(async () => {
  providers.value = await providerStore.fetchProviders().then(() => providerStore.items)
})

const modelInfo = computed(() => {
  const [providerId, selectedModel] = currentProvider.value.split('/')
  return {
    providerId: parseInt(providerId),
    selectedModel,
  }
})

const createConversation = async (question: string, imagePath?: string | null) => {
  const { providerId, selectedModel } = modelInfo.value // 获取 providerId 和 selectedModel
  const currentDate = new Date().toISOString() // 获取当前日期
  let copiedImagePath: string | null = null

  if (imagePath) {
    try {
      copiedImagePath = await window.electronAPI.copyImageToUserDir(imagePath) // 复制图片路径
    } catch (error) {
      console.error(`Failed to copy image to user dir: ${error}`)
    }
  }

  const conversationId = await conversationStore.createCoversation({
    providerId,
    selectedModel,
    title: question,
    createdAt: currentDate,
    updatedAt: currentDate,
  }) // 添加 conversation

  const newMessageId = await messageStore.createMessage({
    conversationId,
    type: 'question',
    content: question,
    createdAt: currentDate,
    updatedAt: currentDate,
    ...(copiedImagePath && { imagePath: copiedImagePath }),
  }) // 添加 message

  router.push(`/conversation/${conversationId}?init=${newMessageId}`)
}
</script>

<style scoped></style>
