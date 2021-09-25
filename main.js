// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

const path = require('path')
const {ipcMain, app, Menu, Tray} = require('electron')

let appIcon = null

ipcMain.on('put-in-tray', (event) => {
  const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png'
  const iconPath = path.join(__dirname, iconName)
  appIcon = new Tray(iconPath)

  const contextMenu = Menu.buildFromTemplate([{
    label: '移除',
    click: () => {
      event.sender.send('tray-removed')
    }
  }])

  appIcon.setToolTip('在托盘中的 Electron 示例.')
  appIcon.setContextMenu(contextMenu)
})

ipcMain.on('remove-tray', () => {
  appIcon.destroy()
})

app.on('window-all-closed', () => {
  if (appIcon) appIcon.destroy()
})