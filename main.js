const { app, Menu, Tray } = require("electron");

let tray = null;
app.whenReady().then(() => {
    tray = new Tray("icon.png");
    const contextMenu = Menu.buildFromTemplate([
        {
            label: "均衡",
            type: "radio",
            click: () => {
                b = run("sudo ./run.sh 00");
                check(0,b);
            },
        },
        {
            label: "性能",
            type: "radio",
            click: function () {
                b = run("sudo ./run.sh 01");
                check(0,b);
            },
        },
        {
            label: "省电",
            type: "radio",
            click: function () {
                b = run("sudo ./run.sh 02");
                check(0,b);
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
                    b = run("sudo ./run.sh 10");
                    check(1,b);
                } else {
                    b = run("sudo ./run.sh 11");
                    check(1,b);
                }
            },
        },
        {
            label: "电池保护",
            type: "checkbox",
            click: function () {
                if (contextMenu.items[5].checked) {
                    b = run("sudo ./run.sh 20");
                    check(2,b);
                } else {
                    b = run("sudo ./run.sh 21");
                    check(2,b);
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

    function check(n,x){
        switch(n){
            case 0:
                switch(x){
                    case '0x0':
                        contextMenu.items[0].checked = true
                        show('均衡模式开启')
                        break
                    case '0x1':
                        contextMenu.items[1].checked = true
                        show('性能模式开启')
                        break
                    case '0x2':
                        contextMenu.items[2].checked = true
                        show('省电模式开启')
                        break
                }
                break
            case 1:
                if(x=='0x0'){
                    contextMenu.items[4].checked = false
                }else{
                    contextMenu.items[4].checked =true
                    contextMenu.items[5].checked = false
                }
                break
            case 2:
                if(x=='0x0'){
                    contextMenu.items[5].checked = false
                }else{
                    contextMenu.items[5].checked =true
                    contextMenu.items[4].checked = false
                }
                break
        }
        tray.setContextMenu(contextMenu);
    }
    
});

const { spawn } = require("child_process");

function run(c) {
    const ls = spawn(c, {
        encoding: "utf8",
        cwd: process.cwd(), // 执行命令路径
        shell: true, // 使用shell命令
    });

    // 监听标准输出
    ls.stdout.on("data", (data) => {
        return data;
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

function show(t) {
    console.log(t);
}
