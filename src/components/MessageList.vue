<template>
  <div ref="_ref" class="message-list">
    <div v-for="message in messages" :key="message.id" class="message-item mb-3">
      <div class="flex" :class="{ 'justify-end': message.type === 'question' }">
        <div>
          <div class="text-sm text-gray-500" :class="{ 'text-right': message.type === 'question' }">
            {{ dayjs(message.createdAt).format('YYYY-MM-DD') }}
          </div>
          <div v-if="message.type === 'question'" class="message-question bg-green-700 text-white p-2 rounded-md">
            <img v-if="message.imagePath" :src="`safe-file://${message.imagePath}`" alt="Message Image" class="w-24 h-24 object-cover rounded block mb-1" />
            {{ message.content }}
          </div>
          <div v-else class="message-answer bg-gray-200 text-gray-700 p-2 rounded-md">
            <template v-if="message.status === 'loading'">
              <Icon icon="eos-icons:three-dots-loading" />
            </template>
            <div v-else class="prose prose-slate prose-headings:my-2 prose-p:my-1 prose-ol:my-0 prose-ul:my-1 prose-li:my-0 prose-hr:my-0 prose-pre:mb-0 prose-pre:p-0 prose-blockquote:m-0">
              <VueMarkdown :source="message.content" :plugins="plugins" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import VueMarkdown from 'vue-markdown-render'
import markdownItHighlightjs from 'markdown-it-highlightjs'
import { MessageProps } from '../types'
import dayjs from '../utils/dayjs'

let _ref = ref<HTMLDivElement>()
let plugins = [markdownItHighlightjs]

defineProps<{
  messages: MessageProps[]
}>() // 接收 messages 属性

defineExpose({
  refl: _ref,
}) // 暴露 ref 给父组件
</script>

<style scoped></style>
