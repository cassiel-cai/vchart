import { app, BrowserWindow, dialog, ipcMain, Menu, nativeImage } from 'electron'
import path from 'node:path'
import fs from 'fs/promises'

import { CreateChatProps } from './types'
import { createProvider } from './providers/createProvider'
import { configManager } from './config'
import { setupMenu } from './menu'

export function registerIpcHandlers(mainWindow: BrowserWindow) {
  // 会话列表右键菜单：仅显示“删除对话”，支持国际化，并在点击后弹出确认
  ipcMain.handle('show-conversation-context-menu', async (event, conversationId?: number) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (!win) return
    const lang = configManager.get().language
    const label = lang === 'zh' ? '删除对话' : 'Delete Conversation'
    const confirmTitle = lang === 'zh' ? '确认删除' : 'Confirm Deletion'
    const message = lang === 'zh' ? '确定要删除该对话及其所有消息吗？' : 'Are you sure you want to delete this conversation and all its messages?'
    const detail = lang === 'zh' ? '此操作不可撤销。' : 'This action cannot be undone.'
    const btnDelete = lang === 'zh' ? '删除' : 'Delete'
    const btnCancel = lang === 'zh' ? '取消' : 'Cancel'

    const menu = Menu.buildFromTemplate([
      {
        label,
        click: async () => {
          const res = await dialog.showMessageBox(win, {
            type: 'none',
            title: confirmTitle,
            message,
            detail,
            buttons: [btnDelete, btnCancel],
            defaultId: 1,
            cancelId: 1,
            noLink: true,
          })
          if (res.response === 0) {
            win.webContents.send('conversation:delete', conversationId)
          }
        },
      },
    ])
    menu.popup({ window: win })
  })

  ipcMain.handle('select-image', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openFile'],
      filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'] }],
    })

    if (result.canceled || result.filePaths.length === 0) return null

    const filePath = result.filePaths[0]
    const fileName = path.basename(filePath)
    const format = path.extname(filePath).slice(1).toLowerCase()
    const size = (await fs.stat(filePath)).size
    const image = nativeImage.createFromPath(filePath)
    const dataURL = image.isEmpty() ? '' : image.toDataURL()

    return { path: filePath, name: fileName, format, size, dataURL }
  })

  ipcMain.handle('copy-image-to-user-dir', async (_event, sourcePath: string) => {
    const userDataPath = app.getPath('userData')
    const imageDir = path.join(userDataPath, 'images')

    await fs.mkdir(imageDir, { recursive: true })

    const fileName = path.basename(sourcePath)
    const destPath = path.join(imageDir, fileName)

    await fs.copyFile(sourcePath, destPath)

    return destPath
  })

  ipcMain.on('start-chat', async (_event, data: CreateChatProps) => {
    const { providerName, selectedModel, messages, messageId } = data

    try {
      const provider = createProvider(providerName)
      const stream = await provider.chat(messages, selectedModel)

      for await (const chunk of stream) {
        const content = {
          messageId,
          data: chunk,
        }
        mainWindow.webContents.send('update-message', content)
      }
    } catch (error) {
      const errorContent = {
        messageId,
        data: {
          is_end: true,
          is_error: true,
          result: error instanceof Error ? error.message : '与 AI 服务通信时发生错误',
        },
      }
      mainWindow.webContents.send('update-message', errorContent)
    }
  })

  ipcMain.handle('get-config', async () => {
    const config = configManager.get()
    return config
  })

  ipcMain.handle('update-config', async (_event, newConfig) => {
    const updated = await configManager.update(newConfig)
    // 配置更新后，依据语言重建菜单
    setupMenu(mainWindow, updated.language)
    return updated
  })
}
