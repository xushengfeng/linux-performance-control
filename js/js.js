const ipc = require('electron').ipcRenderer

const trayBtn = document.getElementById('put-in-tray')
ipc.on('tray-removed', function (e) {
  let myNotification = new Notification("测试标题", {
    body: e,
});
})
