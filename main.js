const {
    app,
    Menu,
    Tray
} = require('electron')

let tray = null
app.whenReady().then(() => {
    tray = new Tray('icon.png')
    const contextMenu = Menu.buildFromTemplate([{
            label: "均衡",
            type: "radio",
            click: () => {
                b = run("ls")
                console.log(b)
            }
        },
        {
            label: "性能",
            type: "radio",
            click: function () {}
        },
        {
            label: "省电",
            type: "radio",
            click: function () {}
        },
        {
            type: "separator"
        },
        {
            label: "快速充电",
            type: 'checkbox',
            click: () => {
                if (contextMenu.items[4].checked) contextMenu.items[5].checked = false
                tray.setContextMenu(contextMenu)
            }
        },
        {
            label: "电池保护",
            type: 'checkbox',
            click: function () {
                if (contextMenu.items[5].checked) contextMenu.items[4].checked = false
                tray.setContextMenu(contextMenu)
            }
        },
        {
            type: "separator"
        },
        {
            label: "退出",
            click: () => {
                app.quit()
            }
        }
    ])
    tray.setToolTip('This is my application.')
    tray.setTitle('hi')
    tray.setContextMenu(contextMenu)
})

const {
    spawn
} = require('child_process');

function run(c) {
    const ls = spawn(c, {
        encoding: 'utf8',
        cwd: process.cwd(), // 执行命令路径
        shell: true, // 使用shell命令
    })

    // 监听标准输出
    ls.stdout.on('data', (data) => {
        return data;
    });

    // 监听标准错误
    ls.stderr.on('data', (data) => {
        show('失败')
    });

    // 子进程关闭事件
    ls.on('close', (code) => {
        console.log(`子进程退出，退出码 ${code}`);
    });
}

// const sudo = require('sudo-prompt');
// const options = {
//   name: 'Electron'
// };
// sudo.exec("echo '\_SB.PCI0.LPC0.EC0.VPC0.DYTC 0x000FB001' > /proc/acpi/call", options,
//   function(error, stdout, stderr) {
//     if (error) throw error;
//     console.log('stdout: ' + stdout);
//   }
// );

function show(t) {
    console.log(t)
}