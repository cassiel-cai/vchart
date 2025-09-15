<template>
  <div class="conversation-list">
    <div v-for="item in conversations" :key="item.id" class="item border-gray-300 border-t cursor-pointer bg-white hover:bg-gray-200 p-2">
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
import { ConversationProps } from '../types'
import dayjs from 'dayjs'

const router = useRouter()

defineProps<{
  conversations: ConversationProps[]
}>()

const goToConversation = (id: number) => {
  router.push({
    path: `/conversation/${id}`,
    query: {
      name: 'CGS',
      hash: '#foo',
    },
  })
}
</script>

<style scoped></style>
