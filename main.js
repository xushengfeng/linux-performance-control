const { app, Menu, Tray, BrowserWindow, Notification } = require("electron");
const path = require("path");

let tray = null;
app.whenReady().then(() => {
    tray = new Tray("assets/icon.png");
    const contextMenu = Menu.buildFromTemplate([
        {
            label: "均衡",
            type: "radio",
            click: () => {
                run(0, "sudo ./run.sh 00");
            },
        },
        {
            label: "性能",
            type: "radio",
            click: function () {
                run(0, "sudo ./run.sh 01");
            },
        },
        {
            label: "省电",
            type: "radio",
            click: function () {
                run(0, "sudo ./run.sh 02");
            },
        },
        {
            type: "separator",
        },
        {
            label: "快速充电",
            type: "checkbox",
            click: () => {
                if (contextMenu.items[4].checked) {
                    run(1, "sudo ./run.sh 11");
                } else {
                    run(1, "sudo ./run.sh 10");
                }
            },
        },
        {
            label: "电池保护",
            type: "checkbox",
            click: function () {
                if (contextMenu.items[5].checked) {
                    run(2, "sudo ./run.sh 21");
                } else {
                    run(2, "sudo ./run.sh 20");
                }
            },
        },
        {
            type: "separator",
        },
        {
            label: "退出",
            click: () => {
                app.quit();
            },
        },
    ]);
    tray.setToolTip("This is my application.");
    tray.setTitle("hi");
    tray.setContextMenu(contextMenu);

    const { spawn } = require("child_process");

    function run(n, c) {
        const ls = spawn(c, {
            encoding: "utf8",
            cwd: process.cwd(), // 执行命令路径
            shell: true, // 使用shell命令
        });

        // 监听标准输出
        ls.stdout.on("data", (data) => {
            console.log(`${data}`);
            check(n, `${data}`);
            return `${data}`;
        });

        // 监听标准错误
        ls.stderr.on("data", (data) => {
            show("失败");
        });

        // 子进程关闭事件
        ls.on("close", (code) => {
            console.log(`子进程退出，退出码 ${code}`);
        });
    }

    function check(n, x) {
        x = x.match(/[0-9]x[0-9]/)?.[0];
        switch (n) {
            case 0:
                switch (x) {
                    case "0x0":
                        contextMenu.items[0].checked = true;
                        show("均衡模式开启", "00");
                        break;
                    case "0x1":
                        contextMenu.items[1].checked = true;
                        show("性能模式开启", "01");
                        break;
                    case "0x2":
                        contextMenu.items[2].checked = true;
                        show("省电模式开启", "02");
                        break;
                }
                break;
            case 1:
                if (x == "0x0") {
                    contextMenu.items[4].checked = false;
                    show("快速充电关闭", "10");
                }
                if (x == "0x1") {
                    contextMenu.items[4].checked = true;
                    show("快速充电开启", "11");
                    contextMenu.items[5].checked = false;
                }
                break;
            case 2:
                if (x == "0x0") {
                    contextMenu.items[5].checked = false;
                    show("电池保护关闭", "20");
                }
                if (x == "0x1") {
                    contextMenu.items[5].checked = true;
                    show("电池保护开启", "21");
                    contextMenu.items[4].checked = false;
                }
                break;
        }
        tray.setContextMenu(contextMenu);
    }
});

function show(t, icon = null) {
    new Notification({ title: t, icon: `assets/${icon}.png` }).show();
    console.log(t);
}
