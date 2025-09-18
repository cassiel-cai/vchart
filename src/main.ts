/*主进程文件*/
import { app, BrowserWindow, ipcMain, dialog, nativeImage, protocol, net } from 'electron' // 导入app和BrowserWindow
import started from 'electron-squirrel-startup' // 导入electron-squirrel-startup
import { ChatCompletion } from '@baiducloud/qianfan' // 导入 ChatCompletion
import OpenAI from 'openai' // 导入 OpenAI
import path from 'node:path' // 导入path
import fs from 'fs/promises' // 导入fs
import url from 'url' // 导入url
import 'dotenv/config' // 导入dotenv
import { CreateChatProps } from './types' // 导入 CreateChatProps 类型
import { convertMessages } from './helper' // 导入 converMessages

import { lookup } from 'mime-types' // 导入 lookup

// 处理Windows上的快捷方式创建/删除
if (started) {
  app.quit()
}

// 创建浏览器窗口
const createWindow = async () => {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 1024, // 窗口宽度
    height: 768, // 窗口高度
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // 预加载脚本
    },
  })

  protocol.handle('safe-file', async request => {
    const filePath = decodeURIComponent(request.url.slice('safe-file://'.length)) // decodeURIComponent 解码URL中的特殊字符

    /*  const data = await fs.readFile(filePath) // 读取文件
    return new Response(data as any, {
      status: 200,
      headers: {
        'Content-Type': lookup(filePath) as string,
      },
    }) */

    const newFilePath = url.pathToFileURL(filePath).toString() // 将文件路径转换为URL
    return net.fetch(newFilePath) // 返回文件数据
  }) // 处理 safe-file 协议

  ipcMain.handle('select-image', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openFile'], // 打开文件对话框
      filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'] }], // 过滤图片文件
    }) // 显示打开文件对话框

    if (result.canceled || result.filePaths.length === 0) return null // 判断是否取消或没有选择图片

    const filePath = result.filePaths[0] // 获取图片路径
    const fileName = path.basename(filePath) // 文件名
    const format = path.extname(filePath).slice(1).toLowerCase() // 扩展名(不带点)
    const size = (await fs.stat(filePath)).size // 文件大小(字节)
    const image = nativeImage.createFromPath(filePath) // 创建图片
    const dataURL = image.isEmpty() ? '' : image.toDataURL() // 获取图片数据URL

    return { path: filePath, name: fileName, format, size, dataURL } // 返回图片详细信息
  })

  ipcMain.handle('copy-image-to-user-dir', async (event, sourcePath: string) => {
    const userDataPath = app.getPath('userData') // 获取用户数据目录
    const imageDir = path.join(userDataPath, 'images') // 获取图片目录

    await fs.mkdir(imageDir, { recursive: true }) // 创建图片目录

    const fileName = path.basename(sourcePath)
    const destPath = path.join(imageDir, fileName)

    await fs.copyFile(sourcePath, destPath)

    return destPath
  })

  ipcMain.on('start-chat', async (event, data: CreateChatProps) => {
    const { providerName, selectedModel, messages, messageId } = data
    const convertedMessages = await convertMessages(messages)
    if (providerName === 'qianfan') {
      const client = new ChatCompletion()
      const stream = await client.chat(
        {
          messages: convertedMessages as any,
          stream: true,
        },
        selectedModel
      )

      for await (const chunk of stream as AsyncIterable<any>) {
        const { is_end, result } = chunk
        const content = {
          messageId,
          data: {
            is_end,
            result,
          },
        }
        mainWindow.webContents.send('update-message', content)
      }
    } else if (providerName === 'dashscope') {
      const client = new OpenAI({
        apiKey: process.env['ALI_API_KEY'],
        baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
      })
      const stream = await client.chat.completions.create({
        messages: convertedMessages as any,
        model: selectedModel,
        stream: true,
      })
      for await (const chunk of stream as AsyncIterable<any>) {
        const choice = chunk.choices[0]
        const content = {
          messageId,
          data: {
            is_end: choice.finish_reason === 'stop',
            result: choice.delta.content || '',
          },
        }
        mainWindow.webContents.send('update-message', content)
      }
    }
  })

  // 加载应用的index.html
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL) // 加载开发服务器URL
  } else {
    // 加载应用的index.html
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`) // 加载应用的index.html
    )
  }

  // 打开开发者工具
  mainWindow.webContents.openDevTools()
}

// 初始化并准备好创建浏览器窗口时，将调用此方法。
// 当Electron完成初始化并准备好创建浏览器窗口时，将调用此方法。
// 某些API只能在事件发生后使用
app.on('ready', createWindow)

// 当所有窗口关闭时，除了macOS
// 应用程序和它们的菜单栏通常会保持活动状态，直到用户明确退出
// 通过Cmd + Q
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit() // 退出应用程序
  }
})

// macOS的Dock图标被点击且没有其他窗口打开时，重新创建一个窗口。
// 当Dock图标被点击且没有其他窗口打开时，重新创建一个窗口。
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow() // 创建窗口
  }
})

// 在此文件中，您可以包含应用程序的特定主进程代码。您也可以将它们放在单独的文件中，并导入它们。
// 代码。您也可以将它们放在单独的文件中，并导入它们。
