const { app, BrowserWindow, Menu, dialog, ipcMain, nativeTheme } = require('electron');
const fs = require('fs');
const path = require('path');

let mainWindow;

app.whenReady().then(() => {
    function createWindow() {
        mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            backgroundColor: nativeTheme.shouldUseDarkColors ? '#1e1e1e' : '#e0e0e0',
            title: 'Editor',
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        });

        mainWindow.loadFile('index.html');

        const openFile = async () => {
            const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
                properties: ['openFile'],
                filters: [{ name: 'Текстові файли', extensions: ['txt', 'html', 'js', 'css'] }]
            });

            if (!canceled && filePaths.length > 0) {
                const content = fs.readFileSync(filePaths[0], 'utf-8');
                mainWindow.webContents.send('file-opened', { content, filePath: filePaths[0] });
            }
        };

        const template = [
            {
                label: 'Файл',
                submenu: [
                    {
                        label: 'Новий',
                        accelerator: 'CmdOrCtrl+N',
                        click: () => mainWindow.webContents.send('new-file-request')
                    },
                    {
                        label: 'Відкрити',
                        accelerator: 'CmdOrCtrl+O',
                        click: () => { openFile(); }
                    },
                    {
                        label: 'Зберегти',
                        accelerator: 'CmdOrCtrl+S',
                        click: () => mainWindow.webContents.send('save-file-request')
                    },
                    {
                        label: 'Зберегти як...',
                        accelerator: 'CmdOrCtrl+Shift+S',
                        click: () => mainWindow.webContents.send('save-as-file-request')
                    },
                    { type: 'separator' },
                    { label: 'Вихід', role: 'quit' }
                ]
            }
        ];

        const menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);

        mainWindow.on('close', (e) => {
            e.preventDefault();
            mainWindow.webContents.send('window-close-request');
        });
    }

    createWindow();

    ipcMain.on('save-content', async (event, text) => {
        const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
            title: 'Зберегти файл',
            defaultPath: path.join(app.getPath('documents'), 'document.txt'),
            filters: [{ name: 'Text Files', extensions: ['txt'] }]
        });

        if (!canceled && filePath) {
            fs.writeFileSync(filePath, text);
            event.sender.send('file-saved', filePath);
        }
    });

    ipcMain.on('save-as-content', async (event, text) => {
        const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
            title: 'Зберегти файл як...',
            defaultPath: path.join(app.getPath('documents'), 'document.txt'),
            filters: [{ name: 'Text Files', extensions: ['txt'] }]
        });

        if (!canceled && filePath) {
            fs.writeFileSync(filePath, text);
            event.sender.send('file-saved', filePath);
        }
    });

    ipcMain.on('save-content-to-path', (event, { path, content }) => {
        fs.writeFileSync(path, content);
        event.sender.send('file-saved', path);
    });

    ipcMain.handle('show-save-dialog', async () => {
        const result = await dialog.showMessageBox(mainWindow, {
            type: 'question',
            buttons: ['Зберегти', 'Не зберігати', 'Скасувати'],
            title: 'Незбережені зміни',
            message: 'У вас є незбережені зміни. Бажаєте їх зберегти?',
            defaultId: 0,
            cancelId: 2
        });
        return result.response;
    });

    ipcMain.on('force-close', () => {
        mainWindow.destroy();
    });

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});



