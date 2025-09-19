import { defineStore } from 'pinia'
import { db } from '../db'
import { ConversationProps } from '../types'

export interface ConversationStore {
  items: ConversationProps[]
  selectedId: number
  selectedModel: string
}

export const useConversationStore = defineStore('conversation', {
  state: (): ConversationStore => {
    return {
      items: [],
      selectedId: -1,
      selectedModel: '',
    }
  },
  actions: {
    async setSelectedModel(model: string) {
      this.selectedModel = model
    },

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

    async deleteConversation(conversationId: number) {
      // 删除会话及其消息
      await db.messages.where({ conversationId }).delete()
      await db.conversations.delete(conversationId)
      this.items = this.items.filter(item => item.id !== conversationId)
      if (this.selectedId === conversationId) {
        this.selectedId = -1
        this.selectedModel = ''
      }
    },
  },

  getters: {
    tolalNumber: state => state.items.length,
    getConversationById: state => (id: number) => {
      return state.items.find(item => item.id === id)
    },
  },
})
