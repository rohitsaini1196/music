var app = require("electron").app;
var Window = require("electron").BrowserWindow; // jshint ignore:line
var Tray = require("electron").Tray; // jshint ignore:line
var Menu = require("electron").Menu; // jshint ignore:line
var fs = require("fs");

var server = require("./app.js");

var mainWindow = null;

var publicPath = path.resolve(__dirname, "/views");
// point for static assets
app.use(express.static(publicPath));
//view engine setup
app.set("views", path.join(__dirname, "/views/"));

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.on("ready", function() {
  "use strict";

  var path = require("path");
  //   var iconPath = path.resolve(__dirname, "./dist/myicon.ico");
  //   const appIcon = new Tray(iconPath);
  mainWindow = new Window({
    width: 1280,
    height: 1024,
    autoHideMenuBar: false,
    useContentSize: true,
    resizable: true
    //  'node-integration': false // otherwise various client-side things may break
  });
  appIcon.setToolTip("My Cool App");
  mainWindow.loadURL("http://localhost:3000/");

  // remove this for production
  var template = [
    {
      label: "View",
      submenu: [
        {
          label: "Reload",
          accelerator: "CmdOrCtrl+R",
          click: function(item, focusedWindow) {
            if (focusedWindow) {
              focusedWindow.reload();
            }
          }
        },
        {
          label: "Toggle Full Screen",
          accelerator: (function() {
            if (process.platform === "darwin") {
              return "Ctrl+Command+F";
            } else {
              return "F11";
            }
          })(),
          click: function(item, focusedWindow) {
            if (focusedWindow) {
              focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
            }
          }
        },
        {
          label: "Toggle Developer Tools",
          accelerator: (function() {
            if (process.platform === "darwin") {
              return "Alt+Command+I";
            } else {
              return "Ctrl+Shift+I";
            }
          })(),
          click: function(item, focusedWindow) {
            if (focusedWindow) {
              focusedWindow.toggleDevTools();
            }
          }
        }
      ]
    }
  ];

  var menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  mainWindow.focus();
});

// shut down all parts to app after windows all closed.
app.on("window-all-closed", function() {
  "use strict";
  app.quit();
});
