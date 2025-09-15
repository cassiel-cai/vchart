/*预加载脚本文件*/
// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { ipcRenderer, contextBridge } from 'electron' // 导入 ipcRenderer 和 contextBridge
import { CreateChatProps } from './types' // 导入 CreateChatProps 类型

contextBridge.exposeInMainWorld('electronAPI', {
  startChat: (data: CreateChatProps) => ipcRenderer.send('start-chat', data), // 暴露 startChat 方法到渲染进程
})
