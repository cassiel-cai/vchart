<template>
  <div class="conversation-list">
    <div
      v-for="item in conversations"
      :key="item.id"
      :class="{
        'bg-gray-100 hover:bg-gray-300': conversationStore.selectedId === item.id,
        'bg-white hover:bg-gray-200': conversationStore.selectedId !== item.id,
      }"
      class="item border-gray-300 border-t cursor-pointer p-2"
    >
      <a @click.prevent="goToConversation(item.id)">
        <div class="flex justify-between items-center text-sm leading-5 text-gray-500">
          <span>{{ dayjs(item.selectedModel).format('YYYY-MM-DD') }}</span>
          <span>{{ dayjs(item.updatedAt).format('YYYY-MM-DD') }}</span>
        </div>
        <h2 class="font-semibold leading-6 text-gray-900 truncate">{{ item.title }}</h2>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useConversationStore } from '../stores/conversation'
import { ConversationProps } from '../types'
import dayjs from 'dayjs'

let router = useRouter()
let conversationStore = useConversationStore()

defineProps<{
  conversations: ConversationProps[]
}>()

const goToConversation = (id: number) => {
  router.push({
    path: `/conversation/${id}`,
  })
  conversationStore.selectedId = id
}
</script>

<style scoped></style>
