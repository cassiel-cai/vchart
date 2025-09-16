import { defineStore } from 'pinia'
import { db } from '../db'
import { MessageProps, UpdatgedStreamData, MessageStatus } from '../types'

export interface MessageStore {
  items: MessageProps[]
}

export const useMessageStore = defineStore('message', {
  state: (): MessageStore => {
    return {
      items: [],
    }
  },

  actions: {
    async fetchMessagesByCoverseation(conversationId: number) {
      const items = await db.messages.where({ conversationId }).toArray()
      this.items = items
    },
    async createMessage(createdData: Omit<MessageProps, 'id'>) {
      const newMessageId = await db.messages.add(createdData)
      this.items.push({
        id: newMessageId,
        ...createdData,
      })
      return newMessageId
    },
    async updateMessage(streamData: UpdatgedStreamData) {
      const { messageId, data } = streamData
      const currentMessage = this.items.find(item => item.id === messageId)

      if (currentMessage) {
        const updatedDate = {
          content: currentMessage.content + data.result,
          status: data.in_end ? ('finished' as MessageStatus) : ('streaming' as MessageStatus),
          updatedAt: new Date().toISOString(),
        }

        await db.messages.update(messageId, updatedDate)

        const index = this.items.findIndex(item => item.id === messageId)

        if (index !== -1) {
          this.items[index] = {
            ...this.items[index],
            ...updatedDate,
          }
        }
      }
    },
  },

  getters: {
    getLastQuestion: state => (conversationId: number) => {
      return state.items.findLast(item => item.conversationId === conversationId && item.type === 'question')
    },
    isMessageLoading: state => {
      return state.items.some(item => item.status === 'loading' || item.status === 'streaming')
    },
  },
})
