/*主进程文件*/
import { app, BrowserWindow } from 'electron' // 导入app和BrowserWindow
// import { ChatCompletion } from '@baiducloud/qianfan'

import path from 'node:path' // 导入path
import started from 'electron-squirrel-startup' // 导入electron-squirrel-startup
import 'dotenv/config'
import OpenAI from 'openai'

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

  const client = new OpenAI({
    apiKey: process.env['ALI_API_KEY'],
    baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
  })
  const resp = await client.chat.completions.create({
    messages: [
      { role: 'system', content: '你现在是一个六岁的小孩，请模仿儿童可爱的口吻进行回答' },
      { role: 'user', content: '什么是万有引力' },
    ],
    model: 'qwen-turbo',
  })

  console.log(resp.choices[0].message)
  /*  const client = new ChatCompletion() // 创建千帆大模型客户端
  // 调用千帆大模型API
  const stream = await client.chat(
    {
      messages: [
        {
          role: 'user',
          content: '你好',
        },
        {
          role: 'assistant',
          content: '如果您有任何问题，请随时向我提问。',
        },
        {
          role: 'user',
          content: '我在上海，周末可以去哪里玩？',
        },
      ], // 消息
      stream: true, // 流式输出
    },
    'ERNIE-Speed-128K'
  ) // 使用ERNIE-Speed-128K模型
  for await (const chunk of stream as AsyncIterable<any>) {
    console.log(chunk, 'chunk===>')
  } */
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
