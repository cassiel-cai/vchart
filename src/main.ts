/*主进程文件*/
import { app, BrowserWindow, protocol, net } from 'electron'
import started from 'electron-squirrel-startup'
import path from 'node:path'
import url from 'url'
import 'dotenv/config'
import { configManager } from './config'
import { setupMenu } from './menu'
import { registerIpcHandlers } from './ipc'

// 设置应用名称
app.setName('VChat')

// 处理Windows上的快捷方式创建/删除
if (started) {
  app.quit()
}

// 创建浏览器窗口
const createWindow = async () => {
  await configManager.load()

  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 1024, // 窗口宽度
    height: 768, // 窗口高度
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // 预加载脚本
    },
  })

  // 设置应用菜单（基于当前语言）
  const currentConfig = configManager.get()
  setupMenu(mainWindow, currentConfig.language)

  // 注册所有 IPC 事件
  registerIpcHandlers(mainWindow)

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

  // 其余非 IPC 逻辑保留在主进程（例如自定义协议）

  // 加载应用的index.html
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL) // 加载开发服务器URL
  } else {
    // 加载应用的index.html
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`) // 加载应用的index.html
    )
  }

  // 仅在开发环境打开开发者工具
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools()
  }
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
