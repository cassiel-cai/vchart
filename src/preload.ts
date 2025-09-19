/*预加载脚本文件*/
// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { ipcRenderer, contextBridge } from 'electron' // 导入 ipcRenderer 和 contextBridge
import { CreateChatProps, onUpdatedCallback, AppConfig } from './types' // 导入 CreateChatProps 类型、onUpdatedCallback 类型、AppConfig 类型

contextBridge.exposeInMainWorld('electronAPI', {
  startChat: (data: CreateChatProps) => ipcRenderer.send('start-chat', data), // 暴露 startChat 方法到渲染进程
  onUpdateMessage: (callback: onUpdatedCallback) => ipcRenderer.on('update-message', (_event, data) => callback(data)), // 暴露 onUpdateMessage 方法到渲染进程
  selectImage: () => ipcRenderer.invoke('select-image'), // 暴露 selectImage 方法到渲染进程
  copyImageToUserDir: (sourcePath: string) => ipcRenderer.invoke('copy-image-to-user-dir', sourcePath), // 暴露 copyImageToUserDir 方法到渲染进程
  getConfig: () => ipcRenderer.invoke('get-config'), // 暴露 getConfig 方法到渲染进程
  updateConfig: (config: Partial<AppConfig>) => ipcRenderer.invoke('update-config', config), // 暴露 updateConfig 方法到渲染进程

  // 菜单事件
  onMenuNewConversation: (callback: () => void) => ipcRenderer.on('menu:new-conversation', () => callback()),
  onMenuOpenSettings: (callback: () => void) => ipcRenderer.on('menu:open-settings', () => callback()),

  // 右键菜单：会话列表
  showConversationContextMenu: (conversationId?: number) => ipcRenderer.invoke('show-conversation-context-menu', conversationId),

  // 会话删除事件
  onConversationDelete: (callback: (conversationId?: number) => void) => ipcRenderer.on('conversation:delete', (_e, id?: number) => callback(id)),
})
