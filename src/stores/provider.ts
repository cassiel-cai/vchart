import { defineStore } from 'pinia'
import { db } from '../db'
import { ProviderProps } from '../types'

export interface ProviderStore {
  items: ProviderProps[]
}

export const useProviderStore = defineStore('provider', {
  state: (): ProviderStore => {
    return {
      items: [],
    }
  },
  actions: {
    async fetchProviders() {
      const items = await db.providers.toArray()
      this.items = items
    },
  }
})
