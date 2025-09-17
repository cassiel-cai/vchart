import { CreateChatProps, onUpdatedCallback } from './types' // 导入 CreateChatProps 类型、onUpdatedCallback 类型

export interface IElectronAPI {
  startChat: (data: CreateChatProps) => void // 声明 startChat 方法
  onUpdateMessage: (callback: onUpdatedCallback) => any // 壁ᧉ onUpdateMessage 方法
  selectImage: () => Promise<{
    path: string
    name: string
    format: string
    size: number
    dataURL: string
  } | null>
  copyImageToUserDir: (sourcePath: string) => Promise<string | null>
} // 声明 ElectronAPI 类型

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
} // 声明全局变量
