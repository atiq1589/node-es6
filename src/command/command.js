#! /usr/bin/env node
import fs from 'fs';

class Command {
    constructor() {
        this.rootDir = __dirname + '/..';
        this.temProtoProject = 'temProtoProject';
        this.args = process.argv;
        this.args.splice(0, 1);
        this.args.splice(0, 1);
    }
}

let cmd = new Command();
switch (cmd.args[0]) {
    case 'newproject':
        var dir = cmd.args[1];
        console.log(`${cmd.rootDir}/${cmd.temProtoProject}`);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
            fs.mkdirSync(dir +'/'+ dir);
            fs.createReadStream(`${cmd.rootDir}/${cmd.temProtoProject}/command.js`).pipe(fs.createWriteStream(`${dir}/command.js`));
            fs.createReadStream(`${cmd.rootDir}/${cmd.temProtoProject}/config.js`).pipe(fs.createWriteStream(`${dir}/${dir}/config.js`));
        }
        break;
}

