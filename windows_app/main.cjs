const { app, BrowserWindow, shell } = require("electron");
const path = require("node:path");

const appUrl = "https://santeetnaturel-mumkntwvjtjz7hwesunylc.streamlit.app/";
const appOrigin = new URL(appUrl).origin;
const appTitle = "Sante et Naturel";
const iconPath = app.isPackaged
  ? path.join(process.resourcesPath, "logo_sante_naturel.ico")
  : path.join(__dirname, "..", "facebook_naturel", "logo_sante_naturel.ico");

function openExternalUrl(url) {
  if (new URL(url).origin !== appOrigin) {
    shell.openExternal(url);
    return true;
  }

  return false;
}

function createWindow() {
  const window = new BrowserWindow({
    width: 1280,
    height: 850,
    minWidth: 900,
    minHeight: 650,
    title: appTitle,
    icon: iconPath,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  window.webContents.on("page-title-updated", (event) => {
    event.preventDefault();
    window.setTitle(appTitle);
  });

  window.webContents.on("will-navigate", (event, url) => {
    if (openExternalUrl(url)) {
      event.preventDefault();
    }
  });

  window.webContents.setWindowOpenHandler(({ url }) => {
    openExternalUrl(url);
    return { action: "deny" };
  });

  window.loadURL(appUrl);
}

app.setName(appTitle);
app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  app.quit();
});