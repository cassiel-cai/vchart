<template>
  <div class="p-4 max-w-1xl mx-auto">
    <TabsRoot v-model="activeTab" class="flex-1 flex flex-col" activation-mode="automatic">
      <TabsList class="flex gap-4 border-b border-gray-200 dark:border-gray-700 mb-3">
        <TabsTrigger value="general" class="px-3 py-2 text-sm data-[state=active]:border-b-2 data-[state=active]:border-blue-500">{{ $t('settings.tabs.universal') }}</TabsTrigger>
        <TabsTrigger value="models" class="px-3 py-2 text-sm data-[state=active]:border-b-2 data-[state=active]:border-blue-500">{{ $t('settings.tabs.models') }}</TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <!-- 语言设置 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-2 mb-4">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{{ $t('settings.language.title') }}</h2>
          <SelectRoot v-model="currentConfig.language">
            <SelectTrigger
              class="inline-flex items-center justify-between rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm ring-offset-white dark:ring-offset-gray-900 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[176px]"
            >
              <SelectValue :placeholder="$t('settings.language.title')" />
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
                    <SelectItemText>{{ $t('settings.language.chinese') }}</SelectItemText>
                  </SelectItem>

                  <SelectItem
                    value="en"
                    class="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-gray-100 dark:focus:bg-gray-700 focus:text-gray-900 dark:focus:text-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  >
                    <SelectItemText>{{ $t('settings.language.english') }}</SelectItemText>
                  </SelectItem>
                </SelectViewport>
              </SelectContent>
            </SelectPortal>
          </SelectRoot>
        </div>

        <!-- 文字大小设置 -->
        <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-2 mb-4">
          <div class="flex items-center mb-2">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">{{ $t('settings.fontSize.title') }}</h2>
            <p class="text-xs text-gray-500 dark:text-gray-400">（{{ $t('settings.fontSize.subtitle') }}）</p>
          </div>

          <div class="flex items-center">
            <NumberFieldRoot v-model="currentConfig.fongSize" :min="14" :max="24" class="flex items-center">
              <label class="sr-only">{{ $t('settings.fontSize.title') }}</label>

              <NumberFieldDecrement
                class="flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </NumberFieldDecrement>

              <NumberFieldInput
                class="flex h-10 w-20 text-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm ring-offset-white dark:ring-offset-gray-900 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed dis2bled:opacity-50 mx-2"
              />

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
      </TabsContent>

      <TabsContent value="models">
        <AccordionRoot type="single" v-model="openedProvider" collapsible class="space-y-2">
          <template v-for="provider in providers" :key="provider.id">
            <AccordionItem :value="String(provider.id)" class="border rounded-md">
              <AccordionHeader>
                <AccordionTrigger class="w-full flex items-center justify-between px-3 py-2">
                  <div class="flex items-center gap-2">
                    <img :src="provider.avatar" :alt="provider.title || provider.name" class="w-5 h-5 rounded" />
                    <span class="font-medium">{{ provider.title || provider.name }}</span>
                  </div>
                  <svg class="w-4 h-4 opacity-60">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                      <path
                        d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </svg>
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent class="px-4 py-3 space-y-3 border-t">
                <div class="grid grid-cols-1 gap-3">
                  <template v-for="item in providerConfigs[provider.name] || []" :key="item.key">
                    <div class="flex flex-col gap-1">
                      <label class="text-xs text-gray-500">{{ item.label }}</label>
                      <input
                        :type="item.type === 'password' ? 'password' : item.type === 'number' ? 'number' : 'text'"
                        class="h-9 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 text-sm"
                        v-model="currentConfig.providerSettings![String(provider.id)][item.key]"
                        @blur="saveProviderSettings(String(provider.id))"
                        :placeholder="item.placeholder || ''"
                      />
                    </div>
                  </template>
                </div>

                <div class="pt-2">
                  <div class="text-xs text-gray-500 mb-1">{{ $t('provider.AMTitle') }}</div>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="model in provider.models" :key="model" class="inline-flex items-center rounded-md border border-gray-300 dark:border-gray-600 px-2 py-1 text-xs">{{ model }}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </template>
        </AccordionRoot>
      </TabsContent>
    </TabsRoot>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, toRaw, watch, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { updateAppLocale } from '../i18n/locale'
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  AccordionRoot,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
  SelectContent,
  SelectItem,
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
import { useProviderStore } from '../stores/provider'
import { providerConfigs } from '../config/providerConfig'

let { locale } = useI18n()
let activeTab = ref<'general' | 'models'>('models')
let currentConfig = reactive<AppConfig>({
  language: 'zh',
  fongSize: 14,
})
let openedProvider = ref<string | undefined>(undefined)
let providerStore = useProviderStore()

onMounted(async () => {
  const config = await window.electronAPI.getConfig()
  Object.assign(currentConfig, config)
  providerStore.fetchProviders()
  // 初始化容器
  if (!currentConfig.providerSettings) currentConfig.providerSettings = {}
  setTimeout(() => initProviderFormValues(), 0)
})

watch(
  currentConfig,
  async newVal => {
    // 同步更新i18n语言并持久化
    if (newVal.language !== locale.value) {
      await updateAppLocale(newVal.language)
    }
    await window.electronAPI.updateConfig(toRaw(newVal))
  },
  { deep: true }
)

const providers = computed(() => providerStore.items)

const initProviderFormValues = () => {
  providers.value.forEach(p => {
    const pid = String(p.id)
    if (!currentConfig.providerSettings![pid]) currentConfig.providerSettings![pid] = {}
    const items = providerConfigs[p.name] || []
    items.forEach(it => {
      if (currentConfig.providerSettings![pid][it.key] === undefined) {
        currentConfig.providerSettings![pid][it.key] = (it.value as string) || ''
      }
    })
  })
}

const saveProviderSettings = async (providerId: string) => {
  // 将响应式对象转换为可序列化的纯对象，避免 IPC 克隆失败
  const plain = JSON.parse(JSON.stringify(toRaw(currentConfig.providerSettings)))
  await window.electronAPI.updateConfig({ providerSettings: plain })
}
</script>

<style scoped></style>
