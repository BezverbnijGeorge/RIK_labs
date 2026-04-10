const { ipcRenderer } = require('electron');
const editor = document.getElementById('editor');

let isEdited = false;
let currentFilePath = null;

editor.addEventListener('input', () => {
    isEdited = true;
});

ipcRenderer.on('new-file-request', async () => {
    if (isEdited) {
        const response = await ipcRenderer.invoke('show-save-dialog');
        if (response === 0) {
            const saveChannel = currentFilePath ? 'save-content-to-path' : 'save-content';
            const payload = currentFilePath ? { path: currentFilePath, content: editor.value } : editor.value;
            ipcRenderer.send(saveChannel, payload);
            ipcRenderer.once('file-saved', () => {
                editor.value = '';
                isEdited = false;
                currentFilePath = null;
            });
        } else if (response === 1) {
            editor.value = '';
            isEdited = false;
            currentFilePath = null;
        }
    } else {
        editor.value = '';
        isEdited = false;
        currentFilePath = null;
    }
});

ipcRenderer.on('file-opened', (event, { content, filePath }) => {
    editor.value = content;
    currentFilePath = filePath;
    isEdited = false;
});

ipcRenderer.on('save-file-request', () => {
    if (currentFilePath) {
        ipcRenderer.send('save-content-to-path', { path: currentFilePath, content: editor.value });
    } else {
        ipcRenderer.send('save-content', editor.value);
    }
});

ipcRenderer.on('save-as-file-request', () => {
    ipcRenderer.send('save-as-content', editor.value);
});

ipcRenderer.on('file-saved', (event, filePath) => {
    currentFilePath = filePath;
    isEdited = false;
});

ipcRenderer.on('window-close-request', async () => {
    if (isEdited) {
        const response = await ipcRenderer.invoke('show-save-dialog');
        if (response === 0) { // Save
            if (currentFilePath) {
                ipcRenderer.send('save-content-to-path', { path: currentFilePath, content: editor.value });
                ipcRenderer.once('file-saved', () => {
                    ipcRenderer.send('force-close');
                });
            } else {
                ipcRenderer.send('save-content', editor.value);
                ipcRenderer.once('file-saved', () => {
                    ipcRenderer.send('force-close');
                });
            }
        } else if (response === 1) { // Don't save
            ipcRenderer.send('force-close');
        }
    } else {
        ipcRenderer.send('force-close');
    }
});