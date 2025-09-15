import { CreateChatProps } from './types' // 导入 CreateChatProps 类型

export interface IElectronAPI {
  startChat: (data: CreateChatProps) => void // 声明 startChat 方法
} // 声明 ElectronAPI 类型

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
} // 声明全局变量
