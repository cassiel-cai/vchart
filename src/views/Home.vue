<template>
  <div class="w-[80%] mx-auto h-full">
    <div class="flex items-center h-[85%]">
      <ProviderSelect :providers="providers" v-model="currentProvider" />
    </div>
    <div class="flex items-center h-[15%]">
      <MessageInput @create="createConversation" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ProviderProps } from '../types'
import { db } from '../db'
import ProviderSelect from '../components/ProviderSelect.vue'
import MessageInput from '../components/Messagelnput.vue'

let router = useRouter()
let currentProvider = ref<string>('')
let providers = ref<ProviderProps[]>([])

onMounted(async () => {
  providers.value = await db.providers.toArray()
})

const modelInfo = computed(() => {
  const [providerId, selectedModel] = currentProvider.value.split('/')
  return {
    providerId: parseInt(providerId),
    selectedModel,
  }
})

const createConversation = async (question: string) => {
  const { providerId, selectedModel } = modelInfo.value // 获取 providerId 和 selectedModel
  const currentDate = new Date().toISOString() // 获取当前日期
  const conversationId = await db.conversations.add({
    providerId,
    selectedModel,
    title: question,
    createdAt: currentDate,
    updatedAt: currentDate,
  }) // 添加 conversation
  const newMessageId = await db.messages.add({
    conversationId,
    type: 'question',
    content: question,
    createdAt: currentDate,
    updatedAt: currentDate,
  }) // 添加 message

  router.push(`/conversation/${conversationId}?init=${newMessageId}`)
}
</script>

<style scoped></style>
