<template>
  <div class="w-[80%] mx-auto h-full">
    <div class="flex items-center h-[85%]">
      <ProviderSelect :providers="providers" v-model="selectedModel" />
    </div>
    <div class="flex items-center h-[15%]">
      <MessageInput v-model="message" @create="onCreate" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ProviderProps } from '../types'
import ProviderSelect from '../components/ProviderSelect.vue'
import MessageInput from '../components/Messagelnput.vue'

const providers: ProviderProps[] = [
  {
    id: 1,
    name: '文心一言',
    desc: '文心一言是百度推出的智能助手，拥有强大的语言理解和生成能力。',
    models: ['ERNIE-4.0-8K', 'ERNIE-3.5-8K', 'ERNIE-Speed-8K'],
    avatar:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthvnext.bing.com%2Fth%2Fid%2FOIP.WZEsF8Yzchv1bEJgr7AiZAHaHa%3Fcb%3Ducfimgc2%26pid%3DApi&f=1&ipt=faedd4207db5610e08ce727948a7610ac03740bc72bb0cd029a3baf9fa5304a4&ipo=images',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: 2,
    name: '通义千问',
    desc: '通义千问是阿里巴巴推出的智能助手，拥有强大的语言理解和生成能力。',
    models: ['Qwen-2.5-32B', 'Qwen-2.5-72B', 'Qwen-2.5-14B'],
    avatar:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.KgYRABrOrO5Fi-DIkSGFhgHaHa%3Fpid%3DApi&f=1&ipt=9e4e41655f5e05c65c17d0548f367af30df492f76ed8a66227cb99fdb49428b5&ipo=images',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
]
const selectedModel = ref<string>('')
const message = ref<string>('')

const onCreate = (value: string) => {
  console.log(value, 'value')
}
</script>

<style scoped></style>
