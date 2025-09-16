import { defineStore } from 'pinia'

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
})
