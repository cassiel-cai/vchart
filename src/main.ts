/*主进程文件*/
import { app, BrowserWindow } from 'electron' // 导入app和BrowserWindow
import { ChatCompletion } from '@baiducloud/qianfan'
import path from 'node:path' // 导入path
import started from 'electron-squirrel-startup' // 导入electron-squirrel-startup

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

  const client = new ChatCompletion()
  const resp = await client.chat({
    messages: [
      {
        role: 'user',
        content: '你好，我是小度'
      }
    ]
  }, 'ERNIE-Speed-128K')

  console.log(resp, 'resp===>')
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
