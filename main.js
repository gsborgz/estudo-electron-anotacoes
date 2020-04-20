const { app, BrowserWindow, Menu, Tray } = require('electron');

app.setAppUserModelId('estudo-electron-anotacoes');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + '/icon-3.png',
  });

  mainWindow.loadFile(__dirname + "/src/index.html");

  mainWindow.setMenu(null);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Mostrar',
      click: function () {
        mainWindow.show();
      }
    },
    {
      label: 'Fechar',
      click: function () {
        app.isQuitting = true;
        app.quit();
      }
    }
  ]);

  const tray = new Tray(__dirname + "/icon-2.png")

  tray.setContextMenu(contextMenu);

  mainWindow.on('exit', function () {
    mainWindow = null;
  });

  mainWindow.on('close', function (e) {
    if (!app.isQuitting) {
      e.preventDefault();
      mainWindow.hide();
    }
  });
}

app.whenReady().then(createWindow);