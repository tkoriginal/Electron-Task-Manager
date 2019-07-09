const electron = require('electron')
const { app, BrowserWindow } = electron;

let mainWindow
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        nodeIntegration: true
    })
    mainWindow.loadURL(`file://${__dirname}/src/index.html`)
})