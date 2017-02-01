
let fs = require('fs');
var exec = require('child_process').exec;

class Command {
    constructor() {
        this.rootDir = __dirname;
        console.log(this.rootDir);
        this.args = process.argv;
        this.args.splice(0, 1);
        this.args.splice(0, 1);
    }
}

(function () {
    let cmd = new Command();
    switch (cmd.args[0]) {
        case 'newmodule':
            let dir = `${cmd.rootDir}/${cmd.args[1]}`;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
                fs.closeSync(fs.openSync(dir + '/urls.js', 'w'));
                fs.closeSync(fs.openSync(dir + '/view.js', 'w'));
            } else {
                console.error("Module already exists");
            }
            break;
    }

})();