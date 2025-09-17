<template>
  <div class="message-input w-full shadow-sm border rounded-lg py-1 px-2 border-gray-300 focus-within:border-green-700">
    <div v-if="imagePreview" class="mb-2 relative flex items-center">
      <img :src="imagePreview" alt="Preview" class="w-24 h-24 object-cover rounded" />
    </div>
    <div class="flex items-center">
      <Icon
        icon="radix-icons:image"
        width="24"
        height="24"
        :class="['mr-2', disabled ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 cursor-pointer hover:text-gray-600']"
        @click="triggerFileInput"
      />
      <input v-model="model" type="text" placeholder="询问任何问题"  class="outline-none border-0 flex-1 bg-white focus:ring-0" :disabled="disabled" />
      <VkButton color="green" iconName="radix-icons:paper-plane" @click="onCreate" :disabled="disabled">发送</VkButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import VkButton from '../components/Button.vue'

let props = defineProps<{
  disabled?: boolean
}>()

let emit = defineEmits<{
  create: [value: string, imagePath?: string | null]
}>()
let model = defineModel<string>()
let imagePreview = ref<string | null>(null)
let selectedImagePath = ref<string | null>(null)

const triggerFileInput = async () => {
  if (props.disabled) return
  const res = await window.electronAPI.selectImage()
  if (res) {
    selectedImagePath.value = res.path
    imagePreview.value = res.dataURL || ''
  } else {
    selectedImagePath.value = null
    imagePreview.value = null
  }
}

const onCreate = () => {
  if (model.value && model.value.trim() !== '') {
    emit('create', model.value!, selectedImagePath.value || null)
  }
}
</script>

<style scoped></style>
