<template>
  <div class="conversation-list">
    <div
      v-for="item in conversations"
      :key="item.id"
      :class="{
        'bg-gray-100 hover:bg-gray-300': conversationStore.selectedId === item.id,
        'bg-white hover:bg-gray-200': conversationStore.selectedId !== item.id,
      }"
      class="item border-gray-300 border-b cursor-pointer p-2"
      @contextmenu.prevent="onRightClick(item.id)"
    >
      <a @click.prevent="goToConversation(item.id)">
        <div class="flex justify-between items-center text-sm leading-5 text-gray-500">
          <span>{{ dayjs(item.createdAt).format('YYYY-MM-DD') }}</span>
          <span>{{ dayjs(item.updatedAt).format('YYYY-MM-DD') }}</span>
        </div>
        <h2 class="font-semibold leading-6 text-gray-900 truncate">{{ item.title }}</h2>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useConversationStore } from '../stores/conversation'
import { ConversationProps } from '../types'
import dayjs from '../utils/dayjs'

let router = useRouter()
let conversationStore = useConversationStore()

let lastMenuCid: number | undefined

defineProps<{
  conversations: ConversationProps[]
}>()

const goToConversation = (id: number) => {
  router.push({
    path: `/conversation/${id}`,
  })
  conversationStore.selectedId = id
  conversationStore.setSelectedModel(conversationStore.getConversationById(id)?.selectedModel || '')
}

const onRightClick = async (id: number) => {
  lastMenuCid = id
  await window.electronAPI.showConversationContextMenu(id)
}

const onDelete = async (cid?: number) => {
  if (!cid) cid = lastMenuCid
  if (cid == null) return
  await conversationStore.deleteConversation(cid)
  router.push('/')
}

onMounted(() => {
  window.electronAPI.onConversationDelete(onDelete)
})

onBeforeUnmount(() => {
  // IPC 监听移除可选，这里省略移除逻辑（当前 API 未暴露 off）
})
</script>

<style scoped></style>
