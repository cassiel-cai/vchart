<template>
  <div class="message-input w-full shadow-sm border rounded-lg py-1 px-2 border-gray-300 focus-within:border-green-700">
    <div v-if="imagePreview" class="mb-2 relative flex items-center">
      <img :src="imagePreview" alt="Preview" class="w-24 h-24 object-cover rounded" />
    </div>
    <div class="flex items-center">
      <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleImageUpload" />
      <Icon
        icon="radix-icons:image"
        width="24"
        height="24"
        :class="['mr-2', disabled ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 cursor-pointer hover:text-gray-600']"
        @click="triggerFileInput"
      />
      <input v-model="model" type="text" class="outline-none border-0 flex-1 bg-white focus:ring-0" :disabled="disabled" />
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
  create: [value: string]
}>()
let model = defineModel<string>()
let fileInput = ref<HTMLInputElement | null>(null)
let imagePreview = ref<string | null>(null)

const triggerFileInput = () => {
  if (!props.disabled) {
    fileInput.value?.click()
  }
}

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement // 获取事件目标
  if (target.files && target.files.length > 0) { // 判断是否选择了文件
    const selectedImage = target.files[0] // 获取选择的文件
    const reader = new FileReader() // 创建 FileReader 对象
    reader.onload = e => {
      imagePreview.value = e.target?.result as string // 设置图片预览
    }
    reader.readAsDataURL(selectedImage) // 读取文件
  }
}

const onCreate = () => {
  if (model.value && model.value.trim() !== '') {
    emit('create', model.value!)
  }
}
</script>

<style scoped></style>
