const { app, BrowserWindow } = require("electron");

const path = require("path");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.loadFile(path.join(__dirname, "index.html"));
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// Each section contains a ipc communication module
const { ipcMain } = require("electron");

// ----------------------------------------------------------------------------
// Show directory window and return selection
const { dialog } = require("electron");

ipcMain.handle("select-directory", (event, arg) => {
  return dialog.showOpenDialog({ properties: ["openDirectory"] });
});

// ----------------------------------------------------------------------------
// Storage save/load 'various', NOTE: seperate 'various'
// JSON in config file on app.getPath("userData")
const Store = require("electron-store");

const store = new Store({
  schema: {
    mediaFrameWidth: {
      type: "number",
      default: 1536,
    },

    mediaFrameHeight: {
      type: "number",
      default: 864,
    },
  },
});

ipcMain.handle("get-frame-size", (event, arg) => {
  return {
    mediaFrameWidth: store.get("mediaFrameWidth"),
    mediaFrameHeight: store.get("mediaFrameHeight"),
  };
});
