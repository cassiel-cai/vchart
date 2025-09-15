import Dexie, { type EntityTable } from 'dexie' // 导入 Dexie
import { ProviderProps } from './types' // 导入 ProviderProps

export const db = new Dexie('vChartDatabse') as Dexie & {
  providers: EntityTable<ProviderProps, 'id'>
} // 定义数据库

db.version(1).stores({
  providers: '++id, name',
}) // 定义表
