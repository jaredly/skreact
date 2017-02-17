'use strict';

const electron = require('electron');
const {ipcMain} = electron;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;

const {session} = require('electron')

app.on('window-all-closed', function() {
  app.quit();
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 1200,
    // skipTaskBar: true,
    // alwaysOnTop: true,
    // frame: false,
    title: 'ProtoReact',
    height: 800,
  });

  // TODO enable for prod
  // mainWindow.loadURL('file://' + __dirname + '/../public/static/index.html');
  mainWindow.loadURL('http://localhost:6089');
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

