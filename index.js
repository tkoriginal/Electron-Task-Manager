const electron = require('electron')
const path = require('path')
const { app, BrowserWindow, Tray } = electron;

let mainWindow
let tray
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        nodeIntegration: true,
        height:510,
        width:300,
        frame:false,
        resizable: false,
        show: false
    })
    mainWindow.loadURL(`file://${__dirname}/src/index.html`)

    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png'
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`)
    tray = new Tray(iconPath)
    tray.on('click', (event, bounds) => {
        // click event bounds
        const { x, y } = bounds
        // Window height and width
        const { height, width } = mainWindow.getBounds()
        const darwinX = x - width / 2
        const darwinY = y
        const win32X = x - width / 2
        const win32Y = y - height
        if (mainWindow.isVisible()) {
            mainWindow.hide()
        } else {
            mainWindow.setBounds({
                x: process.platform === 'win32' ? win32X : darwinX,
                y: process.platform === 'win32' ? win32Y : darwinY,
                height,
                width 
            })
            mainWindow.show()
        }
    })
})