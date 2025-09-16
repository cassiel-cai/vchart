import { defineStore } from 'pinia'
import { db } from '../db'
import { ConversationProps } from '../types'

export interface ConversationStore {
  items: ConversationProps[]
}

export const useConversationStore = defineStore('conversation', {
  state: (): ConversationStore => {
    return {
      items: [],
    }
  },
  actions: {
    async fetchConversations() {
      const items = await db.conversations.toArray()
      this.items = items
    },

    async createCoversation(createdData: Omit<ConversationProps, 'id'>) {
      const newCid = await db.conversations.add(createdData)
      this.items.push({
        id: newCid,
        ...createdData,
      })
      return newCid
    },
  },

  getters: {
    tolalNumber: state => state.items.length,
    getConversationById: state => (id: number) => {
      return state.items.find(item => item.id === id)
    },
  },
})
