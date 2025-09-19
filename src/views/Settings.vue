<template>
  <div class="p-6 max-w-1xl mx-auto">
    <div class="mb-4 flex items-center">
      <h1 class="text-xl font-bold text-gray-900 dark:text-gray-100">应用设置</h1>
      <p class="text-sm text-gray-600 dark:text-gray-400">（自定义您的应用偏好设置）</p>
    </div>

    <div class="flex-1 flex flex-col">
      <!-- 语言设置 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-2 mb-4">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">语言设置</h2>
        <SelectRoot v-model="currentConfig.language">
          <SelectTrigger
            class="inline-flex items-center justify-between rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm ring-offset-white dark:ring-offset-gray-900 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[176px]"
          >
            <SelectValue placeholder="选择语言" />
            <svg class="h-4 w-4 opacity-50">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path
                  d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                />
              </svg>
            </svg>
          </SelectTrigger>
          <SelectPortal>
            <SelectContent
              class="relative z-50 min-w-[160px] overflow-hidden rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-950 dark:text-gray-50 shadow-md"
            >
              <SelectViewport class="p-1">
                <SelectItem
                  value="zh"
                  class="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-gray-100 dark:focus:bg-gray-700 focus:text-gray-900 dark:focus:text-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                >
                  <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    <SelectItemIndicator>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <path
                          d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                          fill="currentColor"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </SelectItemIndicator>
                  </span>
                  <SelectItemText>简体中文</SelectItemText>
                </SelectItem>

                <SelectItem
                  value="en"
                  class="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-gray-100 dark:focus:bg-gray-700 focus:text-gray-900 dark:focus:text-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                >
                  <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    <SelectItemIndicator>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <path
                          d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                          fill="currentColor"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </SelectItemIndicator>
                  </span>
                  <SelectItemText>English</SelectItemText>
                </SelectItem>
              </SelectViewport>
            </SelectContent>
          </SelectPortal>
        </SelectRoot>
      </div>

      <!-- 文字大小设置 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-2 mb-4">
        <div class="flex items-center mb-2">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">文字大小</h2>
          <p class="text-xs text-gray-500 dark:text-gray-400">（范围：14～24 像素/单位）</p>
        </div>

        <div class="flex items-center">
          <NumberFieldRoot v-model="currentConfig.fongSize" :min="14" :max="24" class="flex items-center">
            <label class="sr-only">文字大小</label>

            <!-- 减少按钮 -->
            <NumberFieldDecrement
              class="flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </NumberFieldDecrement>

            <!-- 输入框 -->
            <NumberFieldInput
              class="flex h-10 w-20 text-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm ring-offset-white dark:ring-offset-gray-900 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed dis2bled:opacity-50 mx-2"
            />

            <!-- 增加按钮 -->
            <NumberFieldIncrement
              class="flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </NumberFieldIncrement>
          </NumberFieldRoot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, toRaw, watch } from 'vue'
import {
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
  NumberFieldRoot,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from 'radix-vue'
import type { AppConfig } from '../types'

let currentConfig = reactive<AppConfig>({
  language: 'zh',
  fongSize: 14,
})

onMounted(async () => {
  const config = await window.electronAPI.getConfig()
  Object.assign(currentConfig, config)
})

watch(
  currentConfig,
  async newVal => {
    await window.electronAPI.updateConfig(toRaw(newVal))
  },
  { deep: true }
)
</script>

<style scoped></style>
