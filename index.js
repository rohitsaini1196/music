const electron = require("electron");
const express = require("express");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu, ipcMain } = electron;

const apple = express();

//process.env.NODE_ENV = "production";

let mainWindow;
let AddWindow;

apple.post("/addMusic", (req, res) => {
  res.write("I got you");
  res.end();
});

app.on("ready", function() {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  mainWindow.on("closed", function() {
    app.quit();
  });

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

function createAddWindow() {
  AddWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: "Add music"
  });
  AddWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "addMusic.html"),
      protocol: "file:",
      slashes: true
    })
  );
}

const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Add Music",
        click() {
          createAddWindow();
        }
      },
      {
        label: "Delete Music",
        click() {
          mainWindow.webContents.send("item:clear");
        }
      },
      {
        label: "Quit",
        accelerator: "Ctrl+Q",
        click() {
          app.quit();
        }
      }
    ]
  }
];

if (process.platform == "darwin") {
  mainMenuTemplate.unshift({});
}

if (process.env.NODE_ENV !== "production") {
  mainMenuTemplate.push({
    label: "Developer tools",
    submenu: [
      {
        label: "Toggle DevTools",
        accelerator: "Ctrl+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: "reload"
      }
    ]
  });
}
