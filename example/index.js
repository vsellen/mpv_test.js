"use strict";

const path = require("path");
const {BrowserWindow, app} = require("electron");
const {getPluginEntry} = require("../index");
require("electron-debug")({showDevTools: true});

const pdir = path.join(__dirname, "..", "build", "Release");
console.log('PATH TO PLUGIN: ' + pdir);
if (process.platform !== "linux") {process.chdir(pdir);}
app.commandLine.appendSwitch("ignore-gpu-blacklist");
app.commandLine.appendSwitch("register-pepper-plugins", getPluginEntry(pdir));

app.on("ready", () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 574,
    autoHideMenuBar: true,
    useContentSize: process.platform !== "linux",
    title: "mpv.js example player",
    webPreferences: {plugins: true},
  });
  win.setMenu(null);
  setTimeout(() => {
    win.loadURL(`file://${__dirname}/index.html`);
  }, 1000);
  win.loadURL(`about:blank`);
});

app.on("window-all-closed", () => {
  app.quit();
});
