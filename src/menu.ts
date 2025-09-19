import { app, Menu, BrowserWindow } from 'electron'
import type { AppConfig } from './types'

export function setupMenu(mainWindow: BrowserWindow, language: AppConfig['language'] = 'zh') {
  const isMac = process.platform === 'darwin'

  const appTitle = 'VChat'

  const L =
    language === 'zh'
      ? {
          appMenu: appTitle,
          newChat: '新聊天',
          settings: '设置',
          edit: '编辑',
          undo: '撤销',
          redo: '重做',
          cut: '剪切',
          copy: '复制',
          paste: '粘贴',
          selectAll: '全选',
          view: '视图',
          reload: '重新加载',
          forceReload: '强制重新加载',
          toggleDevTools: '切换开发者工具',
          actualSize: '实际大小',
          zoomIn: '放大',
          zoomOut: '缩小',
          toggleFullScreen: '切换全屏',
          window: '窗口',
          minimize: '最小化',
          zoomWindow: '缩放',
          close: '关闭窗口',
          bringAllToFront: '前置所有窗口',
        }
      : {
          appMenu: appTitle,
          newChat: 'New Chat',
          settings: 'Settings',
          edit: 'Edit',
          undo: 'Undo',
          redo: 'Redo',
          cut: 'Cut',
          copy: 'Copy',
          paste: 'Paste',
          selectAll: 'Select All',
          view: 'View',
          reload: 'Reload',
          forceReload: 'Force Reload',
          toggleDevTools: 'Toggle Developer Tools',
          actualSize: 'Actual Size',
          zoomIn: 'Zoom In',
          zoomOut: 'Zoom Out',
          toggleFullScreen: 'Toggle Full Screen',
          window: 'Window',
          minimize: 'Minimize',
          zoomWindow: 'Zoom',
          close: 'Close Window',
          bringAllToFront: 'Bring All to Front',
        }

  const appMenuForMac: Electron.MenuItemConstructorOptions | null = isMac
    ? {
        label: L.appMenu,
        submenu: [
          { role: 'about' },
          { type: 'separator' },
          {
            label: L.newChat,
            accelerator: 'CmdOrCtrl+N',
            click: () => {
              if (!mainWindow || mainWindow.isDestroyed()) return
              mainWindow.webContents.send('menu:new-conversation')
            },
          },
          {
            label: L.settings,
            accelerator: 'CmdOrCtrl+,',
            click: () => {
              if (!mainWindow || mainWindow.isDestroyed()) return
              mainWindow.webContents.send('menu:open-settings')
            },
          },
          { type: 'separator' },
          { role: 'services' },
          { type: 'separator' },
          { role: 'hide' },
          { role: 'hideOthers' },
          { role: 'unhide' },
          { type: 'separator' },
          { role: 'quit' },
        ],
      }
    : null

  const appMenuForWinLinux: Electron.MenuItemConstructorOptions | null = !isMac
    ? {
        label: L.appMenu,
        submenu: [
          {
            label: L.newChat,
            accelerator: 'CmdOrCtrl+N',
            click: () => {
              if (!mainWindow || mainWindow.isDestroyed()) return
              mainWindow.webContents.send('menu:new-conversation')
            },
          },
          {
            label: L.settings,
            accelerator: 'CmdOrCtrl+,',
            click: () => {
              if (!mainWindow || mainWindow.isDestroyed()) return
              mainWindow.webContents.send('menu:open-settings')
            },
          },
        ],
      }
    : null

  const editMenu: Electron.MenuItemConstructorOptions = {
    label: L.edit,
    submenu: [
      {
        label: L.undo,
        accelerator: 'CmdOrCtrl+Z',
        click: () => mainWindow.webContents.undo(),
      },
      {
        label: L.redo,
        accelerator: isMac ? 'Shift+CmdOrCtrl+Z' : 'Ctrl+Y',
        click: () => mainWindow.webContents.redo(),
      },
      { type: 'separator' },
      { label: L.cut, accelerator: 'CmdOrCtrl+X', click: () => mainWindow.webContents.cut() },
      { label: L.copy, accelerator: 'CmdOrCtrl+C', click: () => mainWindow.webContents.copy() },
      { label: L.paste, accelerator: 'CmdOrCtrl+V', click: () => mainWindow.webContents.paste() },
      { label: L.selectAll, accelerator: 'CmdOrCtrl+A', click: () => mainWindow.webContents.selectAll() },
    ],
  }

  const viewMenu: Electron.MenuItemConstructorOptions = {
    label: L.view,
    submenu: [
      { label: L.reload, accelerator: 'CmdOrCtrl+R', click: () => mainWindow.webContents.reload() },
      {
        label: L.forceReload,
        accelerator: isMac ? 'CmdOrCtrl+Shift+R' : 'Ctrl+Shift+R',
        click: () => mainWindow.webContents.reloadIgnoringCache(),
      },
      { type: 'separator' },
      { label: L.toggleDevTools, accelerator: isMac ? 'Alt+Cmd+I' : 'Ctrl+Shift+I', click: () => mainWindow.webContents.toggleDevTools() },
      { type: 'separator' },
      {
        label: L.actualSize,
        accelerator: 'CmdOrCtrl+0',
        click: () => mainWindow.webContents.setZoomFactor(1),
      },
      {
        label: L.zoomIn,
        accelerator: 'CmdOrCtrl+Plus',
        click: () => {
          const current = mainWindow.webContents.getZoomFactor()
          mainWindow.webContents.setZoomFactor(Math.min(current + 0.1, 3))
        },
      },
      {
        label: L.zoomOut,
        accelerator: 'CmdOrCtrl+-',
        click: () => {
          const current = mainWindow.webContents.getZoomFactor()
          mainWindow.webContents.setZoomFactor(Math.max(current - 0.1, 0.3))
        },
      },
      { type: 'separator' },
      {
        label: L.toggleFullScreen,
        accelerator: isMac ? 'Ctrl+Cmd+F' : 'F11',
        click: () => mainWindow.setFullScreen(!mainWindow.isFullScreen()),
      },
    ],
  }

  const windowMenu: Electron.MenuItemConstructorOptions = {
    label: L.window,
    submenu: [
      { label: L.minimize, accelerator: isMac ? 'Cmd+M' : 'Alt+Space, N', click: () => mainWindow.minimize() },
      ...(isMac ? ([{ label: L.zoomWindow, click: () => mainWindow.setFullScreen(!mainWindow.isFullScreen()) }] as const) : []),
      { type: 'separator' },
      ...(isMac ? ([{ label: L.bringAllToFront, click: () => BrowserWindow.getAllWindows().forEach(w => w.moveTop()) }] as const) : []),
      { label: L.close, accelerator: 'CmdOrCtrl+W', click: () => mainWindow.close() },
    ],
  }

  const template: Electron.MenuItemConstructorOptions[] = [...(appMenuForMac ? [appMenuForMac] : []), ...(appMenuForWinLinux ? [appMenuForWinLinux] : []), editMenu, viewMenu, windowMenu]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}
