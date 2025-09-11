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
import { providers } from '../testData'
import ProviderSelect from '../components/ProviderSelect.vue'
import MessageInput from '../components/Messagelnput.vue'

const selectedModel = ref<string>('')
const message = ref<string>('')

const onCreate = (value: string) => {
  console.log(value, 'value')
}
</script>

<style scoped></style>
