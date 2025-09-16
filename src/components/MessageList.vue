<template>
  <div class="message-list">
    <div v-for="message in messages" :key="message.id" class="message-item mb-3">
      <div class="flex" :class="{ 'justify-end': message.type === 'question' }">
        <div>
          <div class="text-sm text-gray-500" :class="{ 'text-right': message.type === 'question' }">
            {{ dayjs(message.createdAt).format('YYYY-MM-DD') }}
          </div>
          <div v-if="message.type === 'question'" class="message-question bg-green-700 text-white p-2 rounded-md">
            {{ message.content }}
          </div>
          <div v-else class="message-answer bg-gray-200 text-gray-700 p-2 rounded-md">
            <template v-if="message.status === 'loading'">
              <Icon icon="eos-icons:three-dots-loading" />
            </template>
            <div v-else class="prose prose-slate prose-headings:my-2 prose-p:my-1 prose-ul: my-1 prose-li:my-0">
              <VueMarkdown :source="message.content" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import VueMarkdown from 'vue-markdown-render'
import { MessageProps } from '../types'
import dayjs from 'dayjs'

defineProps<{
  messages: MessageProps[]
}>()
</script>

<style scoped></style>
