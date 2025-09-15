import Dexie, { type EntityTable } from 'dexie' // 导入 Dexie
import { providers } from './testData' // 导入 providers
import { ProviderProps, ConversationProps, MessageProps } from './types' // 导入 types

export const db = new Dexie('vChartDatabse') as Dexie & {
  providers: EntityTable<ProviderProps, 'id'>
  conversations: EntityTable<ConversationProps, 'id'>
  messages: EntityTable<MessageProps, 'id'>
} // 定义数据库

db.version(1).stores({
  providers: '++id, name', // 定义 providers 表  name 为外键
  conversations: '++id,providerId', // 定义 conversations 表  providerId 为外键
  messages: '++id, conversationId', // 定义 messages 表  conversationId 为外键
}) // 定义表

export const initProviders = async () => {
  const count = await db.providers.count() // 获取 providers 数量
  if (count === 0) {
    db.providers.bulkAdd(providers) // 添加 providers
  }
} // 初始化 providers
