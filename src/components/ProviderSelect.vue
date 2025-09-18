<template>
  <div class="provider-select w-full">
    <SelectRoot v-model="currentModel">
      <SelectTrigger class="flex w-full items-center justify-between rounded-md py-1.5 px-3 shadow-sm border outline-none data-[placeholder]:text-gray-400">
        <SelectValue placeholder="Select a provider..." />
        <Icon icon="radix-icons:chevron-down" class="h-5 w-5" />
      </SelectTrigger>

      <SelectPortal>
        <SelectContent class="bg-white rounded-md shadow-sm z-[1000] border">
          <SelectViewport class="p-2">
            <div v-for="(item, index) in providers" :key="index">
              <SelectLabel class="flex items-center px-6 h-7 text-gray-500">
                <img :src="item.avatar" :alt="item.title" class="w-5 h-5 mr-2 rounded" />
                {{ item.title }}
              </SelectLabel>
              <SelectGroup>
                <SelectItem
                  v-for="(model, index) in item.models"
                  :key="index"
                  :value="`${item.id}/${model}`"
                  class="outline-none rounded flex items-center h-7 px-6 relative text-green-700 cursor-pointer data-[highlighted]:bg-green-700 data-[highlighted]:text-white"
                >
                  <SelectItemIndicator class="absolute left-1 w-6">
                    <Icon icon="radix-icons:check" class="h-5 w-5" />
                  </SelectItemIndicator>
                  <SelectItemText>{{ model }}</SelectItemText>
                </SelectItem>
              </SelectGroup>
              <SelectSeparator v-if="index !== providers.length - 1" class="h-[1px] my-2 bg-gray-300" />
            </div>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  </div>
</template>

<script setup lang="ts">
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPortal,
  SelectRoot,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'radix-vue'
import { Icon } from '@iconify/vue'
import { ProviderProps } from '../types'

defineProps<{
  providers: ProviderProps[]
}>()

let currentModel = defineModel<string>()
</script>

<style scoped></style>
