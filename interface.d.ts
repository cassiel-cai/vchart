import { CreateChatProps, onUpdatedCallback, AppConfig } from './types' // 导入 CreateChatProps 类型、onUpdatedCallback 类型、AppConfig 类型

export interface IElectronAPI {
  startChat: (data: CreateChatProps) => void // 声明 startChat 方法
  onUpdateMessage: (callback: onUpdatedCallback) => any // 壁ᧉ onUpdateMessage 方法
  selectImage: () => Promise<{
    path: string
    name: string
    format: string
    size: number
    dataURL: string
  } | null> // 声明 selectImage 方法
  copyImageToUserDir: (sourcePath: string) => Promise<string | null> // 声明 copyImageToUserDir 方法
  getConfig: () => Promise<AppConfig> // 声明 getConfig 方法
  updateConfig: (config: Partial<AppConfig>) => Promise<AppConfig> // 声明 updateConfig 方法

  // 菜单事件监听
  onMenuNewConversation: (callback: () => void) => any
  onMenuOpenSettings: (callback: () => void) => any
} // 声明 ElectronAPI 类型

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
} // 声明全局变量
