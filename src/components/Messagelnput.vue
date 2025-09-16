<template>
  <div class="message-input w-full shadow-sm border rounded-lg flex items-center py-1 px-2 border-gray-300 focus-within:border-green-700">
    <input v-model="model" type="text" placeholder="Message..." class="outline-none border-0 flex-1 bg-white focus:ring-0" :disabled="disabled" />
    <VkButton color="green" iconName="radix-icons:paper-plane" @click="onCreate" :disabled="disabled">发送</VkButton>
  </div>
</template>

<script setup lang="ts">
import VkButton from '../components/Button.vue'

defineProps<{
  disabled?: boolean
}>()

const emit = defineEmits<{
  create: [value: string]
}>()
const model = defineModel<string>()

const onCreate = () => {
  if (model.value && model.value.trim() !== '') {
    emit('create', model.value!)
  }
}
</script>

<style scoped></style>
