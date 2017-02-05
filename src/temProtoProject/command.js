
let fs = require('fs');
let exec = require('child_process').exec;
let child_process = require('child_process');

class Command {
    constructor() {
        this.rootDir = __dirname;
        this.args = process.argv;
    }
}




(function () {
    let cmd = new Command();
    for (let i = 0; i < cmd.args.length; i++) {
        let command = cmd.args[i];
        switch (command) {
            case 'newmodule':
                let dir = `${cmd.rootDir}/${cmd.args[i + 1]}`;
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                    fs.closeSync(fs.openSync(dir + '/urls.js', 'w'));
                    fs.closeSync(fs.openSync(dir + '/view.js', 'w'));
                } else {
                    console.error("Module already exists");
                }
                break;
            case 'startserver':
            console.log(123);
                let c = `nodeus startserver ${__dirname}`;
                child_process.exec(c, (error, stdout, stderr) => {
                    console.log(error);
                    //console.log(stdout);
                    //console.log(stderr);
                })
                break;
        }
    }
})();